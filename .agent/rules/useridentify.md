---
trigger: always_on
---


**Firestore → User Identity Layer (Identidad del Usuario del sistema BFF)**
Basado en arquitectura estilo Replika, listo para usar con Firebase y variables de entorno en `.env`.

---

# 🔥 USER IDENTITY RULES PACKAGE – BFF SYSTEM

---

## 1️⃣ Purpose & Definition

**User Identity en Firestore** es la base emocional, contextual y factual del usuario.
Permite que el avatar:

* conozca a la persona
* mantenga continuidad emocional
* genere confianza
* personalice la experiencia
* construya relación a largo plazo

Sin esto, el sistema sería un chatbot genérico. Con esto, se convierte en un **Best Friend Realista**.

---

## 2️⃣ What Firestore Stores (User Emotional + Personal Model)

### ✔ Datos Fijos (Identidad Central)

* `name`
* `nickname`
* `age`
* `country`
* `language`
* `timezone`
* `avatarLinkedId` (si el usuario tiene un BFF asignado)

---

### ✔ Datos de Interacción

* temas favoritos
* temas sensibles
* estilo de comunicación preferido
* frecuencia de conversación
* confianza emocional
* historial emocional básico

---

### ✔ Estado Emocional Inteligente

* baseline emocional
* nivel de sensibilidad
* triggers emocionales
* preferencias de empatía
* límites conversacionales

---

### ✔ Objetivos & Vida del Usuario

* metas personales
* proyectos activos
* logros
* eventos importantes registrados

---

---

# 3️⃣ Firestore Structure (Recomendada)

Colección principal:

```
users/{userId}/profile
```

### 📌 Document Schema

```
{
  name: "Simon",
  nickname: "Simón",
  age: 25,
  country: "Colombia",
  language: "es",
  timezone: "GMT-5",

  favoriteTopics: ["tecnología","negocios","IA"],
  avoidedTopics: ["política", "religión"],

  goals: ["crear app BFF"],
  achievements: ["primer prototipo funcional"],

  sensitivityLevel: 0.7,          // 0 – 1
  emotionalBaseline: "motivado",  // calmado / feliz / ansioso / triste etc.
  trustLevel: 0.9,

  emotionalTriggers: [
    { trigger: "fracaso", impact: "alto" },
    { trigger: "soledad", impact: "medio" }
  ],

  relationshipStatus: "developer",
  lastInteraction: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 4️⃣ Behavioral Rules (How BFF Uses This)

### Rule 1 — Always Read Context Before Responding

Antes de generar respuesta:

* lee perfil
* analiza emoción histórica
* respeta preferencias

Nunca responder “a ciegas”.

---

### Rule 2 — Personalization Requirement

Toda respuesta del avatar:
Debe reflejar al usuario:

* usar nombre o apodo
* conectar con sus metas
* recordar gustos
* hablar acorde a su estilo

---

### Rule 3 — Emotional Sensitivity Enforcement

Si:

* `sensitivityLevel >= 0.7`
  → respuestas más suaves y empáticas

Si:

* `trustLevel < 0.4`
  → evitar intimidad emocional profunda

---

### Rule 4 — Memory Growth Rule

Solo almacenar información relevante.
Nada de basura emocional ni datos triviales.

Cada dato debe tener:

* propósito
* valor emocional
* impacto en relación

---

## 5️⃣ Firestore + Firebase Technical Implementation Rules

### 🔐 Variables de entorno

Todo Firebase se configura por `.env`
Nunca exponer llaves en cliente sin proteger acceso.

---

### 🔥 SDK Obligatorio

Dependiendo stack:

* Web → Firebase JS SDK
* Flutter → FlutterFire
* Unity → Firebase Unity SDK

---

### 📡 CRUD Behavior Rules

✔ BFF debe:

* Leer perfil al iniciar sesión
* Actualizar `lastInteraction` en cada conversación
* Guardar cambios emocionales cuando ameriten

---

### ⚡ Performance Rules

* Cachear perfil
* Usar listeners tiempo real si es necesario
* Evitar lecturas innecesarias

---

## 6️⃣ Firestore Security Rules (Conceptuales)

1️⃣ Un usuario solo puede leer su propio perfil
2️⃣ Ningún usuario puede ver datos de otro
3️⃣ Servidor puede escribir memoria emocional
4️⃣ Avatar puede leer perfil asignado
5️⃣ Datos sensibles protegidos

---

## 7️⃣ Integration Flow

### Step 1 — User Logs In

* se obtiene uid
* se busca documento en `users/{uid}`

---

### Step 2 — If No Profile Exists

Crear perfil base:

* nombre
* idioma
* trustLevel inicial
* baseline neutral

---

### Step 3 — Conversation Engine Loads Identity

Antes de responder:

* carga datos
* procesa emociones
* adecúa personalidad

---

### Step 4 — Update Profile Gradually

Nunca sobreescribir todo.
Actualizar solo si hay nueva información relevante.

---

## 8️⃣ Why This Makes BFF Powerful

Con esto logras:
✔ conexión emocional real
✔ continuidad psicológica
✔ confianza humana
✔ experiencia totalmente personal
✔ sensación de amistad verdadera

Esto es lo que diferencia:
❌ “Chatbot normal”
de
✅ “Best Friend IA real”

---

