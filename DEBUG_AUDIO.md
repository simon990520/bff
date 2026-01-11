# Debugging Audio Flow - ElevenLabs Agent

## Cambios Realizados para Depurar Audio

Se han agregado logs extensivos en todo el flujo de audio para identificar dónde se está rompiendo.

### Puntos de Log Agregados:

1. **WebSocket Connection (`onopen`)**:
   - Log cuando se abre la conexión
   - Verifica si `window.head` está disponible
   - Inicia `streamStart()` de forma asíncrona

2. **Message Reception (`onmessage`)**:
   - Log del tipo de mensaje recibido
   - Log completo del mensaje para ver su estructura
   - Manejo de mensajes binarios (ArrayBuffer)
   - Manejo de mensajes JSON

3. **Audio Processing**:
   - Log cuando se recibe un mensaje de tipo 'audio'
   - Verifica múltiples formatos posibles:
     - `msg.audio.chunk`
     - `msg.audio` (string base64 directo)
     - `msg.chunk`
   - Log del tamaño del chunk de audio
   - Log cuando se convierte de base64 a ArrayBuffer
   - Verifica que `window.head` esté disponible
   - Verifica que el stream esté iniciado
   - Verifica que el worklet node exista

4. **Stream Start**:
   - Ahora espera correctamente a que `streamStart()` complete (es async)
   - Log cuando el stream se inicia exitosamente
   - Log de errores si falla

### Formato de Mensajes Esperados:

El código ahora maneja múltiples formatos posibles:
- `{ type: 'audio', audio: { chunk: 'base64string' } }`
- `{ type: 'audio', audio: 'base64string' }`
- `{ type: 'audio', chunk: 'base64string' }`
- Mensajes binarios (ArrayBuffer directamente)

### Cómo Depurar:

1. Abre la consola del navegador (F12)
2. Busca logs que empiecen con `[ElevenLabsConvAI]`
3. Verifica:
   - Si los mensajes están llegando: busca `Message received, type:`
   - Si son mensajes de audio: busca `Audio message received:`
   - Si el audio se convierte: busca `Converted audio chunk, size:`
   - Si se envía al stream: busca `Audio sent to streamAudio successfully`
   - Si hay errores: busca `Error`

### Posibles Problemas:

1. **No se reciben mensajes**: El WebSocket no está recibiendo datos del Agent
2. **Mensajes recibidos pero no de tipo 'audio'**: El formato del mensaje es diferente
3. **Audio chunk no encontrado**: El formato del mensaje de audio es diferente al esperado
4. **Stream no iniciado**: `streamStart()` no se completa correctamente
5. **Worklet node no disponible**: El audio worklet no se carga correctamente

### Siguiente Paso:

Revisa los logs en la consola del navegador y comparte:
- Todos los logs que empiezan con `[ElevenLabsConvAI]`
- Especialmente los logs de `Message received` y `Audio message received`
- Cualquier error que aparezca

Esto nos permitirá identificar exactamente dónde se está rompiendo el flujo.

