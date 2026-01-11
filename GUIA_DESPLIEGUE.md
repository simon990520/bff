# 🚀 Guía de Despliegue: Talking Head

Este proyecto utiliza **WebSockets** para la integración con **ElevenLabs Conversational AI**, lo cual es un factor crítico al elegir donde desplegar.

## ⚠️ Vercel: Importante
**Vercel no soporta WebSockets nativamente** en sus funciones "Serverless". Si despliegas en Vercel:
- La interfaz cargará correctamente.
- Las APIs de Gemini/OpenAI (si se habilitan) podrían funcionar.
- **❌ El chat del Avatar (ElevenLabs Agent) NO funcionará** porque utiliza WebSockets para el audio en tiempo real a través del proxy del servidor.

---

## 🏗️ Opción Recomendada: Railway o Render
Para que el avatar funcione al 100%, necesitas un servidor persistente que soporte WebSockets.

### 1. Railway.app (Súper sencillo)
Es la opción más sencilla para aplicaciones Node.js con WebSockets.
1. Crea una cuenta en [Railway.app](https://railway.app/).
2. Conecta tu repositorio de GitHub.
3. Railway detectará automáticamente el archivo `package.json`.
4. **Configura las Variables de Env** en la pestaña "Variables":
   - `ELEVENLABS_API_KEY`
   - `ELEVENLABS_AGENT_ID`
   - `GOOGLE_API_KEY`
   - `PORT=5174`

### 2. Render.com
1. Crea un "Web Service" en [Render](https://render.com/).
2. Conecta tu repositorio.
3. Comando de inicio: `node server.js`
4. Agrega las variables en la sección "Environment".

---

## 📦 Opción Vercel (Solo si aceptas no usar WebSockets)
Si decides usar Vercel a pesar de la limitación, necesitas un archivo `vercel.json` (que puedo crearte) y tendrías que cambiar la lógica para conectar directamente al API de ElevenLabs desde el frontend (arriesgando tu API Key).

---

## 🛠️ Mejoras sugeridas antes de subir
He visto que tu `package.json` usa `start:proxy`. Para la mayoría de nubes, es mejor tener un comando `start` estándar.

¿Quieres que actualice tu `package.json` y cree el archivo de configuración para alguna de estas plataformas?
