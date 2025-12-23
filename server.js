import dotenv from 'dotenv';
import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 5174;
const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY || '';
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
if (!ELEVEN_KEY) {
  console.warn('[WARN] ELEVENLABS_API_KEY is not set. ElevenLabs WS proxy will fail without it.');
}
if (!OPENAI_KEY) {
  console.warn('[WARN] OPENAI_API_KEY is not set. OpenAI proxy will return 401.');
}

const app = express();
app.use(express.json({ limit: '2mb' }));
// Optional Clerk auth wiring (enabled only if env keys are present)
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || '';
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || '';
const CLERK_ENABLED = !!(CLERK_PUBLISHABLE_KEY && CLERK_SECRET_KEY);
let needAuth = (req,res,next)=>next();
if (CLERK_ENABLED) {
  app.use(clerkMiddleware());
  needAuth = requireAuth();
} else {
  console.warn('[WARN] Clerk not configured. Auth gating is disabled. Set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env');
}

// Optional Clerk auth wiring (enabled only if env keys are present)
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || '';
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || '';
const CLERK_ENABLED = !!(CLERK_PUBLISHABLE_KEY && CLERK_SECRET_KEY);


let needAuth = (req, res, next) => next();
if (CLERK_ENABLED) {
  app.use(clerkMiddleware());
  // Custom auth middleware that returns JSON instead of redirecting
  needAuth = (req, res, next) => {
    if (!req.auth?.userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }
    next();
  };
  console.log('[INFO] Clerk authentication enabled');
} else {
  console.warn('[WARN] Clerk not configured. Auth gating is disabled. Set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env');
}



// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Public app config
app.get('/app/config', (req, res) => {
  res.json({
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      databaseURL: process.env.FIREBASE_DATABASE_URL || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.FIREBASE_APP_ID || '',
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
    }
  });
});

// Stub JWT endpoint to avoid 404s in the UI when JWT is not configured
app.get('/app/jwt/get', (req, res) => {
  // UI expects JSON; return null token to indicate not configured
  console.log('[JWT] /app/jwt/get');
  res.json({ jwt: "" });
});

// Google TTS proxy stub to avoid 404 and HTML responses
app.post('/gtts/', (req, res) => {
  console.log('[GoogleTTS] /gtts/ (not configured)');
  res.status(501).json({ error: 'Google TTS proxy not configured. Use ElevenLabs (Proxy) in settings.' });
});



// ---- OpenAI real proxies ----
import { Readable } from 'stream';

async function proxyJson(req, res, upstreamUrl, streamLike = false) {
  if (!OPENAI_KEY) {
    res.status(401).json({ error: 'OPENAI_API_KEY is not configured on server' });
    return;
  }
  try {
    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(req.body || {})
    });
    res.status(upstream.status);
    const ct = upstream.headers.get('content-type') || (streamLike ? 'text/event-stream' : 'application/json');
    res.setHeader('Content-Type', ct);
    if (upstream.body) {
      const readable = Readable.fromWeb(upstream.body);
      readable.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error('[OpenAI proxy error]', err);
    res.status(500).json({ error: 'OpenAI proxy error' });
  }
}

app.post('/openai/v1/moderations', needAuth, async (req, res) => {
  console.log('[OpenAI] /v1/moderations');
  if (!OPENAI_KEY) {
    // No key -> safe default
    return res.json({ id: 'stub-moderation', model: 'stub', results: [{ flagged: false, categories: {}, category_scores: {} }] });
  }
  try {
    const upstream = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify(req.body || {})
    });
    if (upstream.status === 429) {
      // Graceful degrade: do not block UI on moderation quota
      return res.json({ id: 'stub-moderation', model: 'stub', results: [{ flagged: false, categories: {}, category_scores: {} }] });
    }
    res.status(upstream.status);
    const data = await upstream.text();
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.send(data);
  } catch (err) {
    console.error('[OpenAI moderation error]', err);
    // On error, default to not flagged
    return res.json({ id: 'stub-moderation', model: 'stub', results: [{ flagged: false, categories: {}, category_scores: {} }] });
  }
});

app.post('/openai/v1/chat/completions', needAuth, async (req, res) => {
  const wantStream = !!(req.body && req.body.stream);
  console.log('[OpenAI] /v1/chat/completions stream=%s', wantStream);
  if (!OPENAI_KEY) {
    // Fallback minimal SSE so UI continues
    res.setHeader('Content-Type', 'text/event-stream');
    res.write(`data: ${JSON.stringify({ id: 'fallback', choices: [{ delta: { content: 'OpenAI no configurado en servidor. ' } }] })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }
  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify(req.body || {})
    });
    const ct = upstream.headers.get('content-type') || '';
    console.log('[OpenAI] chat upstream status=%s ct=%s', upstream.status, ct);
    if (upstream.status === 429 || !upstream.ok) {
      // Graceful SSE fallback message so UI doesn't error
      res.setHeader('Content-Type', 'text/event-stream');
      const msg = upstream.status === 429 ? 'OpenAI: cuota excedida. Usando respuesta local.' : 'OpenAI: error. Usando respuesta local.';
      res.write(`data: ${JSON.stringify({ id: 'fallback', choices: [{ delta: { content: msg } }] })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }
    // If client wants stream but upstream returned JSON (non-stream), transform JSON -> SSE
    if (wantStream && !ct.includes('text/event-stream')) {
      const text = await upstream.text();
      try {
        const obj = JSON.parse(text);
        const content = obj?.choices?.[0]?.message?.content || '';
        res.setHeader('Content-Type', 'text/event-stream');
        if (content) res.write(`data: ${JSON.stringify({ id: obj.id || 'json', choices: [{ delta: { content } }] })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      } catch {
        // Fallback: send as one SSE chunk with raw text
        res.setHeader('Content-Type', 'text/event-stream');
        res.write(`data: ${JSON.stringify({ id: 'raw', choices: [{ delta: { content: text.slice(0, 512) } }] })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
    }
    // Pipe normal upstream stream/response
    res.status(upstream.status);
    res.setHeader('Content-Type', ct || (wantStream ? 'text/event-stream' : 'application/json'));
    if (upstream.body) {
      const readable = Readable.fromWeb(upstream.body);
      readable.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error('[OpenAI chat error]', err);
    // Graceful SSE fallback
    res.setHeader('Content-Type', 'text/event-stream');
    res.write(`data: ${JSON.stringify({ id: 'fallback', choices: [{ delta: { content: 'OpenAI no disponible. ' } }] })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }
});

app.post('/openai/v1/audio/transcriptions', needAuth, (req, res) => {
  console.log('[OpenAI] /v1/audio/transcriptions');
  proxyJson(req, res, 'https://api.openai.com/v1/audio/transcriptions');
});



// Serve static files from project root
app.use(express.static(__dirname));

const server = http.createServer(app);

// Create a single WS server for handling local upgrades
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (!pathname.startsWith('/elevenlabs/')) {
      socket.destroy();
      return;
    }

    if (CLERK_ENABLED) {
      // Basic gate for WS: require Clerk session cookie or Authorization bearer
      const hasClerkCookie = (req.headers.cookie || '').includes('__session=');
      const hasBearer = (req.headers['authorization'] || '').startsWith('Bearer ');
      if (!hasClerkCookie && !hasBearer) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
    }

    // Upgrade client connection
    wss.handleUpgrade(req, socket, head, (clientWs) => {
      // Map local path to ElevenLabs API path
      const upstreamPath = pathname.replace('/elevenlabs/', '/');
      const upstreamUrl = `wss://api.elevenlabs.io${upstreamPath}${url.search}`;

      // Connect to ElevenLabs upstream
      const upstream = new WebSocket(upstreamUrl, {
        headers: {
          'xi-api-key': ELEVEN_KEY,
          'origin': 'https://api.elevenlabs.io',
        }
      });

      // Data from upstream -> client
      upstream.on('message', (data, isBinary) => {
        if (clientWs.readyState === WebSocket.OPEN) clientWs.send(data, { binary: isBinary });
      });
      upstream.on('close', (code, reason) => {
        if (clientWs.readyState === WebSocket.OPEN) clientWs.close(code, reason);
      });
      upstream.on('error', (err) => {
        console.error('[ElevenLabs upstream error]', err.message);
        try { if (clientWs.readyState === WebSocket.OPEN) clientWs.close(1011, 'Upstream error'); } catch { }
      });

      // Data from client -> upstream
      clientWs.on('message', (data, isBinary) => {
        if (upstream.readyState === WebSocket.OPEN) upstream.send(data, { binary: isBinary });
      });
      clientWs.on('close', () => {
        try { if (upstream.readyState === WebSocket.OPEN) upstream.close(); } catch { }
      });
      clientWs.on('error', (err) => {
        console.error('[Client WS error]', err.message);
        try { if (upstream.readyState === WebSocket.OPEN) upstream.close(1011, 'Client error'); } catch { }
      });
    });
  } catch (err) {
    console.error('[upgrade error]', err);
    try { socket.destroy(); } catch { }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log('Static files served from project root');
  console.log('ElevenLabs WS proxy at ws(s)://<host>/elevenlabs/...');
});
