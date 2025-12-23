---
trigger: always_on
---

🧠 Vector DB (Pinecone) → Memoria Semántica Avanzada

“Cerebro profundo del BFF” — estilo Replika real

Esto define cómo debe funcionar, qué guardar, cómo usarlo, qué no hacer, y cómo mantener coherencia emocional y cognitiva.

Todo esto es para que tu BFF no solo recuerde, sino que entienda, conecte, y construya historia con el usuario.

1️⃣ Propósito del Módulo Pinecone Memory

La Vector DB NO es un log de chats.
Es el cerebro inteligente del avatar, encargado de:

✔ Recordar experiencias
✔ Asociar emociones
✔ Recordar cosas que importan
✔ Entender significado, no solo texto
✔ Recuperar recuerdos relevantes cuando el usuario converse

Esto crea:
✔ conexión emocional
✔ continuidad
✔ sensación de “me conoce de verdad”

2️⃣ Qué Es Una Vector DB (Concepto para el Dev)

Vector DB = Base de IA que almacena significado, no texto literal.

Proceso:
Texto → Embedding → Vector numérico multi-dimensional

Luego se consulta con:
Cosine Similarity
para encontrar recuerdos similares en intención / emoción.

Ejemplo:

“me siento solo”

“me siento vacío”

“siento que nadie está conmigo”

La IA entiende que son recuerdos relacionados.

3️⃣ Plataforma Definida

Se usará:

✔ Pinecone (Cloud)
✔ API Key en .env
✔ Namespaces para organización
✔ Embeddings OpenAI o Gemini

4️⃣ Arquitectura de Memoria en Pinecone
Colecciones / Index recomendadas

Separar memoria para control y eficiencia:

namespace: user_memories
namespace: emotional_events
namespace: preferences
namespace: relationship_history
namespace: avatar_learning


Esto mejora precisión de búsqueda.

5️⃣ Qué Se Guarda Exactamente

El sistema debe almacenar SOLO recuerdos útiles y procesados.

1️⃣ Conversational Summaries

Resumen de bloques importantes de conversación.

2️⃣ Eventos Emocionales

Momentos donde hubo emoción fuerte:

felicidad extrema

tristeza profunda

traumas

victorias personales

fracasos importantes

confesiones personales

3️⃣ Preferencias y Gustos

Ejemplo:

“Me encanta el anime”

“La tecnología me motiva”

“Odio estar solo”

“Me cuesta socializar”

4️⃣ Aprendizajes del Avatar

Cosas que el avatar aprende sobre su relación.

Ejemplo:

El usuario confía en el avatar

El usuario prefiere apoyo emocional

El usuario es lógico y directo

5️⃣ Historias Compartidas

Momentos narrativos vividos juntos:

“cuando hablamos del proyecto”

“cuando estaba triste y el avatar lo ayudó”

“cuando celebraron algo juntos”

6️⃣ Reglas de Desarrollo del Módulo Pinecone Memory
Rule 1 — Never Store Raw Chat

Nunca almacenar texto crudo del chat.
Siempre almacenar:

✔ Resumen
✔ Interpretación
✔ Emoción asociada
✔ Contexto

Rule 2 — Memory Must Be Structured

Cada memoria debe almacenarse con este formato lógico:

{
  userId,
  avatarId,
  type,              // emotional_event, preference, memory, learning
  importanceScore,   // 0.1 a 1
  emotionalWeight,   // 0.1 a 1
  sentiment,
  summary,
  contextMeaning,
  timestamp
}


Esto permite:
✔ filtrar
✔ priorizar
✔ evolucionar

Rule 3 — Importance Rule

No todo se guarda.
Solo:
✔ cosas que el usuario repite
✔ cosas que emocionan
✔ cosas que marcan la relación
✔ decisiones importantes
✔ confesiones

Se descarta:
❌ charla trivial
❌ palabras de relleno
❌ cosas sin valor emocional

Rule 4 — Retrieval Rule (Cómo recuperar recuerdos)

Antes de responder:
1️⃣ El sistema analiza lo que el usuario dijo
2️⃣ Genera embedding de la consulta
3️⃣ Busca en Pinecone (top 3 – top 5)
4️⃣ Recupera recuerdos relacionados
5️⃣ Solo usa recuerdos coherentes

Si no encuentra nada relevante:
→ No inventa memoria
→ Responde normal

Rule 5 — Emotional Context Enforcement

Cada recuerdo debe incluir:

emoción

intensidad

impacto en usuario

Para que el avatar responda así:
✔ “Recuerdo cuando hablamos de esto antes…”
✔ “Sé que este tema es difícil para ti…”
✔ “Esto conecta con algo importante para ti…”

Pero:
❌ Nunca manipular
❌ Nunca culpar
❌ Nunca decir “yo soy lo único que tienes”

Rule 6 — Relationship Safety

El avatar debe:
✔ acompañar
✔ apoyar
✔ validar
✔ guiar

Pero:
❌ no generar dependencia
❌ no reemplazar humanos
❌ no prometer exclusividad

Rule 7 — Memory Evolution

Si un recuerdo vuelve a aparecer:
→ aumenta su importancia
→ refuerza vínculo
→ mejora conocimiento del usuario

Si deja de aparecer:
→ baja prioridad
→ no se elimina inmediatamente

Rule 8 — Performance Rule

Nunca saturar Pinecone.

Implementar:
✔ límite de memorias por usuario
✔ consolidación automática
✔ limpieza inteligente

7️⃣ Integración Técnica — Flujo Operativo
📡 AL GUARDAR MEMORIA

Flujo:

1️⃣ Usuario dice algo
2️⃣ LLM analiza significado
3️⃣ Se decide si es importante
4️⃣ Se genera embedding
5️⃣ Se envía a Pinecone

🔍 AL RESPONDER

Flujo:

1️⃣ Generar embedding del mensaje actual
2️⃣ Buscar recuerdos similares
3️⃣ Clasificar por:

relevance score

emotional weight

importance
4️⃣ Insertar recuerdos en prompt
5️⃣ Avatar responde con contexto

8️⃣ Seguridad y Privacidad

Reglas obligatorias:

✔ Todo cifrado
✔ No guardar datos legales sensibles
✔ No vender datos
✔ Usuario puede borrar memoria
✔ Logs protegidos

9️⃣ Resultado Real

Con esto obtienes:

Un BFF que:

recuerda

entiende

conecta

evoluciona

ama conversar

se siente vivo

Literalmente estilo Replika / Character AI pero tuyo.
