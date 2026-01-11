# Configuración para usar solo ElevenLabs Agent

Este proyecto ha sido configurado para usar **únicamente** el ElevenLabs Conversational AI Agent.

## Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# REQUERIDO: API Key de ElevenLabs
# Obtén tu API key desde: https://elevenlabs.io/app/settings/api-keys
ELEVENLABS_API_KEY=tu_api_key_aqui

# REQUERIDO: Agent ID de ElevenLabs
# Crea un Agent en: https://elevenlabs.io/app/conversational-ai
# Luego copia el ID del Agent desde la URL o configuración
ELEVENLABS_AGENT_ID=tu_agent_id_aqui

# Opcional: Puerto del servidor (default: 5174)
PORT=5174

# Opcional: Clerk Authentication (para autenticación)
# CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
```

## Cómo obtener el Agent ID

1. Ve a https://elevenlabs.io/app/conversational-ai
2. Crea un nuevo Agent o selecciona uno existente
3. El Agent ID puede encontrarse en:
   - La URL de la página del Agent
   - La configuración del Agent
   - Ejemplo de URL: `https://elevenlabs.io/app/conversational-ai/agent/AGENT_ID_HERE`

## Cambios Realizados

1. ✅ **Bug corregido**: `head.b64ToArrayBuffer` → `window.head.b64ToArrayBuffer` en el handler de mensajes del Agent
2. ✅ **Servidor actualizado**: El endpoint `/app/config` ahora incluye `elevenLabsAgentId` desde variables de entorno
3. ✅ **Cliente actualizado**: Lee el Agent ID desde el servidor primero, luego hace fallback a configuración del sitio
4. ✅ **Funciones speak modificadas**: `speakText()` y `speak()` ahora usan el Agent
5. ✅ **Función helper creada**: `speakViaAgent()` para centralizar el uso del Agent

## Notas Importantes

- El Agent de ElevenLabs está diseñado para **conversaciones interactivas bidireccionales**
- El Agent responderá a cualquier texto enviado como input del usuario
- Para conversaciones interactivas, usa el UI de chat moderno que ya está configurado
- Las funciones programáticas de `speak()` enviarán texto al Agent, que generará su propia respuesta

## Ejecutar el Proyecto

1. Asegúrate de tener las variables de entorno configuradas en `.env`
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `npm run start:proxy`
4. Abre el navegador en `http://localhost:5174`

## Solución de Problemas

### Error: "No Agent ID configured"
- Verifica que `ELEVENLABS_AGENT_ID` esté configurado en tu archivo `.env`
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor después de cambiar las variables de entorno

### Error: "ElevenLabs API key not configured"
- Verifica que `ELEVENLABS_API_KEY` esté configurado en tu archivo `.env`
- Asegúrate de que la API key sea válida y no tenga espacios adicionales

### El Agent no responde
- Verifica que el Agent ID sea correcto
- Asegúrate de que el Agent esté activo en tu cuenta de ElevenLabs
- Revisa la consola del navegador para ver errores de conexión

## Estructura del Código

- `server.js`: Servidor Express con proxy WebSocket para ElevenLabs
- `index.html`: Cliente principal con integración del Agent
- `modules/talkinghead.mjs`: Clase TalkingHead para renderizado 3D
- La clase `ElevenLabsConvAI` maneja la conexión y comunicación con el Agent

