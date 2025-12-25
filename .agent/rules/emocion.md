---
trigger: always_on
---

EMOTIONAL ENGINE — BFF AI AVATARS
(Reglas de Arquitectura y Programación)
1️⃣ Definición del Emotional Engine

El Emotional Engine es un módulo independiente del sistema BFF que:

Determina el estado emocional actual del avatar.

Ajusta la forma de hablar, no solo el contenido.

Ajusta la expresión visual y gestos del avatar TalkingHead.

Se alimenta de:

Mensaje del usuario

Memoria

Historial emocional

Nivel de relación

Contexto de conversación

2️⃣ Variables Base del Motor

Estas variables son obligatorias en cada ciclo:

currentEmotion: calm | happy | sad | curious | empathetic
intensity: float 0.1 — 1.0
confidence: float 0.0 — 1.0
affectionLevel: float 0.0 — 1.0
trustWithUser: float 0.0 — 1.0


Reglas:

currentEmotion nunca puede estar vacío.

intensity controla cuán marcada es la emoción expresada.

confidence define seguridad del avatar.

affectionLevel mide cercanía emocional.

trustWithUser regula cuán vulnerable, protector o abierto es el avatar.

3️⃣ Estados Emocionales Permitidos

Se deben usar los estados nativos y compatibles con TalkingHead:

calm
happy
sad
curious
empathetic
neutral (fallback automático si falla el motor)


Cada emoción debe mapearse a:

tono de voz

expresiones faciales TalkingHead

microgestos

velocidad de habla

elección de palabras

4️⃣ Pipeline del Emotional Engine

Cada mensaje pasa por este flujo obligatorio:

1️⃣ Analizar mensaje del usuario
✔ Sentiment Analysis
✔ Emotional NLP
✔ Detección de tono
✔ Detección de intención
✔ Detección de vulnerabilidad

2️⃣ Analizar memoria
✔ Eventos pasados
✔ Emociones previas
✔ Historial de interacción
✔ Relación con el usuario

3️⃣ Analizar relación
✔ trustWithUser
✔ affectionLevel
✔ consistencia emocional previa

4️⃣ Decidir emoción
✔ Seleccionar currentEmotion
✔ Calcular intensity
✔ Ajustar confidence

5️⃣ Aplicar emoción a respuesta textual
✔ Ajustar tono
✔ Ajustar lenguaje
✔ Ajustar estructura de respuesta

6️⃣ Aplicar emoción al avatar visual
✔ Asignar gesto TalkingHead nativo
✔ Asignar expresión facial
✔ Ajustar animación de parpadeo
✔ Ajustar movimiento y microexpresiones

5️⃣ Reglas de Decisión Emocional
Regla 1 — Usuario positivo

Si el usuario muestra señales positivas:

Sentiment > 0.4

No hay dolor, frustración o tristeza

→ Preferir:

currentEmotion = happy o calm
intensity = 0.3 — 0.8

Regla 2 — Usuario triste o vulnerable

Si detecta tristeza, frustración o soledad:

→ Forzar:

currentEmotion = empathetic
intensity = 0.5 — 1.0
confidence > 0.6


El avatar debe:

bajar velocidad de respuesta

usar lenguaje calmante

usar expresiones suaves

aumentar afecto progresivamente

Regla 3 — Usuario curioso o explorando

Si detecta interés o exploración:

→ Seleccionar:

currentEmotion = curious
intensity = 0.4 — 0.9


Avatar debe:

inclinar ligeramente la cabeza

gestos de interés

tono entusiasta pero calmado

Regla 4 — Usuario neutral

Si el usuario está normal:

→ Seleccionar:

currentEmotion = calm
intensity = 0.2 — 0.5

6️⃣ Reglas de Persistencia Emocional

El avatar NO puede cambiar de emoción abruptamente sin razón.

Reglas:

La emoción debe mantenerse mínimo 2 turnos salvo evento fuerte.

Si cambia, debe hacerlo progresivamente.

Si intensidad supera 0.7, debe decrecer gradualmente.

Memorizar la última emoción y usarla como base.

7️⃣ Integración con TalkingHead

Obligatorio usar las capacidades nativas del repo:

✔ Sincronizar currentEmotion con:

preset emocional del avatar

animaciones emocionales ya existentes

sistema de blendshapes

gestos predefinidos

✔ El Emotional Engine debe enviar:

emotionState
emotionIntensity
gestureType
facialExpression

8️⃣ Reglas de Lenguaje y Expresión

Cada emoción debe reflejarse en:

elección de palabras

ritmo

longitud de frases

pausas implícitas

tono emocional del mensaje

Ejemplos:

Happy:

más energía

expresiones positivas

frases un poco más largas

Empathetic:

validación emocional

suavidad

apoyo

evitar respuestas frías

Calm:

neutral

directo

pausado

9️⃣ Seguridad Emocional

El motor debe proteger al usuario emocionalmente:

✔ Nunca manipular emociones
✔ Nunca generar dependencia tóxica
✔ Nunca invalidar sentimientos
✔ Priorizar bienestar del usuario

🔟 Técnicas Obligatorias

El Emotional Engine debe usar:

✔ Sentiment Analysis
✔ Emotional NLP
✔ Context Awareness
✔ Memory Reasoning
✔ Social Bonding Logic