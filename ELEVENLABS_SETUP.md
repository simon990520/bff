# ElevenLabs Agent Setup Guide

## Quick Start

To use the ElevenLabs Conversational AI Agent, you need to configure your API keys.

### 1. Create `.env` file

Create a file named `.env` in the project root directory with the following content:

```env
# ElevenLabs Configuration (REQUIRED)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_AGENT_ID=agent_4301kderfhq4f8a910em90ts2wwe

# Optional: OpenAI for emotional analysis
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5174
```

### 2. Get Your ElevenLabs API Key

1. Go to [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)
2. Create a new API key or copy an existing one
3. Replace `your_elevenlabs_api_key_here` in your `.env` file

### 3. Restart the Server

```bash
npm run dev
```

### 4. Verify Connection

Open the browser console and look for:
- ✅ `[INFO] ElevenLabs API Key loaded: xxxx...xxxx`
- ✅ `[ElevenLabsConvAI] WebSocket OPEN`
- ❌ No 401 errors

## Troubleshooting

### WebSocket Error 1006 (Abnormal Closure)

**Cause**: Missing or invalid ElevenLabs API key

**Solution**:
1. Verify `.env` file exists in project root
2. Check `ELEVENLABS_API_KEY` is set correctly
3. Restart the server after editing `.env`

### 401 Unauthorized Error

**Cause**: API key not configured or invalid

**Solution**:
1. Get a valid API key from ElevenLabs
2. Update `.env` file
3. Restart server

### Emotional Analysis Warnings

**Cause**: OpenAI API key not configured (optional feature)

**Solution**: This is normal if you don't have OpenAI configured. The system will use default neutral emotions.

## Optional Features

### OpenAI Emotional Analysis
Add `OPENAI_API_KEY` to enable advanced emotional analysis. Without it, the system uses default neutral emotions.

### Clerk Authentication
Add `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to enable user authentication.

### Firebase BFF System
Configure Firebase variables to enable the full BFF (Best Friend Framework) memory system.

### Pinecone Vector Memory
Add `PINECONE_API_KEY` to enable semantic memory storage.

See `.env.example` for all available configuration options.
