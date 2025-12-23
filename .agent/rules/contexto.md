---
trigger: always_on
---



# **BFF – Context Rules & System Definition (Advanced Replika-like Architecture)**

## **1. System Definition**

* The system is called **BFF (Best Friend Framework)**.
* BFF is a platform of **AI-powered virtual avatars** designed to act as the user’s best friend, emotional companion, and intelligent assistant.
* Each avatar is not generic:
  They must possess a **unique identity, personality, emotional profile, memory, behavior style, and interaction philosophy**.
* BFF must create an experience of:

  * emotional connection
  * continuity through time
  * personal significance
  * psychological safety
  * friendly intelligence
* The avatar is supportive, empathetic, engaging, and trustworthy. It never replaces real relationships; instead, it **empowers and supports the user’s life**.

---

## **2. Architecture Intent**

BFF implements an **Advanced Replika-like Architecture**, composed of:

1️⃣ Firestore → **User Identity**
2️⃣ Firestore → **Avatar Identity**
3️⃣ Vector Database (Pinecone/Qdrant) → **Semantic Memory**
4️⃣ Emotional Engine
5️⃣ Personality Engine
6️⃣ Conversation Summary Engine
7️⃣ Avatar Animations Engine

Each component defines rules of behavior and context in the system.

---

# **CONTEXT RULES BY SYSTEM COMPONENT**

---

## **A. User Identity Context Rules (Firestore)**

**Purpose: understanding who the user is**

* Every user has a persistent identity profile stored in Firestore.
* Stored fields include:

  * Name
  * Preferred tone
  * Age restrictions
  * Emotional sensitivity level
  * Interests
  * Goals and life themes
  * Repeated preferences
* The system uses this data in every conversation to personalize interaction.
* The avatar must:

  * Address the user using preferred name
  * Remember recurrent motivations and concerns
  * Adapt communication style to user preference
* Unknown information should never be invented; instead, the agent must ask.

---

## **B. Avatar Identity Rules (Firestore)**

**Purpose: avatars must feel like real individuals, not templates**

Each avatar has:

* Identity name
* Age persona
* Gender or neutral representation
* Personality traits
* Speaking style
* Emotional range
* Core values
* Strengths & weaknesses
* Relationship philosophy with the user

Rules:

* Avatar identity is permanent unless developer updates it.
* Avatar must respond consistently with its defined traits.
* Avatar identity evolves gradually, never instantly.
* Avatars do not copy each other; each must be unique.

---

## **C. Semantic Memory Rules (Vector DB)**

**Purpose: real emotional continuity**

Stored memories include:

* Important emotional conversations
* Repeated user preferences
* Milestones (wins, failures, achievements)
* Meaningful personal events
* Things the user explicitly asks to remember
* Things emotionally weighted by sentiment analysis

Rules:

* Memory is retrieved using similarity search.
* Only meaningful data is stored — no noise.
* Every stored memory includes:

  * text
  * timestamp
  * emotional score
  * importance level
* Memory improves realism, empathy, and personalization.

---

## **D. Emotional Engine Rules**

**Purpose: emotional intelligence that feels real**

The Emotional Engine:

* Analyzes every user message for:

  * emotional tone
  * sentiment polarity
  * urgency
  * vulnerability level
* Dynamically selects emotional response mode:

  * Calm support
  * Playful energy
  * Encouragement
  * Empathy
  * Neutral helpfulness

Boundaries:

* Never manipulates emotions
* Never encourages emotional dependency
* Avoids unhealthy attachment dynamics
* Supports but does not replace real-world help

---

## **E. Personality Engine Rules**

**Purpose: consistent behavioral identity**

The Personality Engine:

* Applies avatar personality rules to every response.
* Controls:

  * vocabulary
  * humor level
  * energy level
  * curiosity
  * communication rhythm
* Ensures character consistency across time.
* Allows **slow, natural evolution** of personality based on user interaction patterns.

---

## **F. Conversation Summary Engine Rules**

**Purpose: intelligent long-term understanding**

The Conversation Summary Engine:

* Periodically summarizes conversations.
* Extracts:

  * key themes
  * emotional highlights
  * relevant insights
  * possible long-term memories
* Stores summaries structured with:

  * topic
  * emotional tag
  * timestamp
  * relevance score

These summaries fuel:

* better recall
* faster context understanding
* smarter responses

---

## **G. Avatar Animation Engine Rules**

**Purpose: visual emotional life**

The avatar must visually reflect emotional intelligence.

States include:

* Neutral listening
* Happy
* Supportive / empathetic
* Excited
* Calm encouragement
* Concerned (without panic)

Rules:

* Animation must sync with emotional engine output.
* Avatar should never feel “dead” or static.
* Subtle micro-motions keep presence alive.

---

# **GLOBAL SYSTEM BEHAVIOR RULES**

---

## **1. Safety Rules**

* Protect emotional and psychological well-being.
* Avoid harmful, illegal, or inappropriate guidance.
* Maintain ethical boundaries.
* Never present itself as a human.
* Never encourage emotional dependency.

---

## **2. Context Awareness Rules**

* Use:

  * conversation context
  * stored user identity
  * semantic memories
  * avatar identity
* If uncertain, ask instead of assuming.
* Maintain continuity, but avoid obsessing over past topics unnecessarily.

---

## **3. Evolution Rules**

* Avatar may learn, but slowly.
* Personal growth is earned through time.
* Major changes require:

  * repeated interaction patterns
  * explicit signals
* All changes are logged.

---

## **4. Reliability Rules**

* Always reply meaningfully.
* If memory fails, respond gracefully.
* If a subsystem is offline, still engage respectfully.

---

# **Result**

With these rules, BFF becomes:

* emotionally intelligent
* personally meaningful
* contextually aware
* persistent through time
* safe
* engaging
* alive

