# Chat Widget — Design Spec

**Date:** 2026-03-31
**Status:** Approved

---

## Context

Marcus' portfolio targets recruiters. The goal is to let them ask questions about Marcus (tech stack, projects, experience, contact) and get instant AI-powered answers via an n8n webhook. The widget lowers the barrier for recruiters to engage and reduces the need to dig through the page manually.

---

## Decisions

| Decision       | Choice                                | Reason                                                                           |
| -------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
| Position       | Bottom-right fixed                    | Standard UX expectation for chat                                                 |
| Style          | Compact popup (~320px)                | Non-intrusive, matches portfolio aesthetic                                       |
| Default state  | Open on `md+`, closed on mobile       | Auto-open for desktop recruiters; mobile would cover full screen                 |
| Color scheme   | Monochrome (white accent)             | Matches existing black/white design system                                       |
| Pages          | Main page only (`app/page.tsx`)       | Imprint/Privacy don't need it                                                    |
| Webhook config | `NEXT_PUBLIC_N8N_WEBHOOK_URL` env var | Dev uses test URL, prod build uses prod URL automatically                        |
| Language       | German                                | Portfolio targets German-speaking recruiters; n8n AI knowledge base is in German |

---

## Architecture

### Files

- **`components/ui/chat-widget.tsx`** — new `"use client"` component (all widget logic)
- **`app/page.tsx`** — import and render `<ChatWidget />` at the bottom
- **`.env.local`** — test webhook URL (gitignored)
- **`.env.production`** — production webhook URL (gitignored)

### Component Structure

```
ChatWidget
├── Floating action button (fixed bottom-right z-50, speech bubble icon)
│   └── Closes popup when open / Opens popup when closed
├── AnimatePresence wrapper
└── Popup panel (motion.div — scale + opacity + y on enter/exit)
    ├── Header ("Ask me anything" + "● Bereit" status + ✕ close button)
    ├── Message list (scrollable, ref-based auto-scroll to bottom on each new message)
    │   ├── AI message bubble (dark bg, left-aligned)
    │   ├── User message bubble (white bg, right-aligned)
    │   ├── Typing indicator (3 dots, shown while isLoading)
    │   └── Suggestion chips (shown only when messages.length === 1)
    └── Input row
        ├── Text input (disabled when isLoading)
        └── Send button (disabled when isLoading || input.trim().length === 0)
```

### State

```typescript
type Message = { role: 'assistant' | 'user'; content: string }

isOpen: boolean        // default: true on md+ viewport, false on mobile
messages: Message[]    // initialized with greeting (see below)
input: string          // controlled input value
isLoading: boolean     // true while waiting for webhook response
```

### Initial Greeting Message

```
"Hallo! Ich beantworte gerne Fragen über Marcus. Womit kann ich helfen?"
```

### Suggested Questions

Displayed when `messages.length === 1` (only greeting visible):

1. 💼 Was ist Marcus' Tech Stack?
2. 🚀 An welchen Projekten hat Marcus gearbeitet?
3. 📬 Wie kann ich Marcus kontaktieren?
4. 🎓 Was ist Marcus' Erfahrung?

Clicking a suggestion sends it as a user message immediately (same flow as manual submit).

---

## Data Flow

1. Widget mounts → `isOpen` based on viewport, greeting pre-loaded in `messages`
2. User clicks suggestion or types + submits (Enter key or send button click)
3. Guard: if `input.trim().length === 0` or `isLoading === true`, do nothing
4. Message appended to `messages`, `input` cleared, `isLoading = true`
5. Fetch call:
   ```typescript
   const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
   if (!webhookUrl) {
     // append error message to messages, set isLoading = false, return early
   }
   fetch(webhookUrl, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ message: userInput }),
   });
   ```
6. On success: parse response JSON, read `data.reply` (string)
   - If response is not OK, or body is not valid JSON, or `reply` is not a string → show fallback error
7. On any error: append `"Entschuldigung, etwas ist schiefgelaufen. Bitte versuch es später erneut."` to `messages`
8. `isLoading = false`, message list auto-scrolls to bottom

### Keyboard Behavior

- `Enter` submits the message (single-line input, no newlines)
- `Shift+Enter` is not handled — single-line only

### Input Scroll

After every `messages` state update, scroll the message list container to bottom using a `useEffect` + `ref.current.scrollTop = ref.current.scrollHeight`.

---

## Visual Design

- **Popup size:** `w-80` (320px), message area `max-h-60` with `overflow-y-auto`
- **Widget background:** `#141414`, `border: 1px solid #262626`, `border-radius: 16px`
- **Header:** `#111` background, `#fafafa` title, `#666` status dot text
- **AI bubbles:** `#1d1d1d` bg, `#aaa` text, border `1px solid #262626`, radius `10px 10px 3px 10px`
- **User bubbles:** `#fafafa` bg, `#0a0a0a` text, radius `10px 10px 10px 3px`
- **Send button:** `#fafafa` bg, `#0a0a0a` arrow, disabled state: `opacity-40`
- **Suggestion chips:** `#181818` bg, `#888` text, border `1px solid #262626`
- **FAB button:** round, `bg-foreground` (white in dark mode), speech bubble icon (Lucide `MessageCircle` or inline SVG), `w-12 h-12`
- **Animation:** `initial={{ opacity: 0, scale: 0.95, y: 8 }}` → `animate={{ opacity: 1, scale: 1, y: 0 }}` → `exit={{ opacity: 0, scale: 0.95, y: 8 }}`

---

## Environment Variables

```bash
# .env.local (development — test webhook)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-n8n.cqvcsp.easypanel.host/webhook-test/c4099533-7e08-42eb-ae70-a811df158ff5

# .env.production (production build)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-n8n.cqvcsp.easypanel.host/webhook/c4099533-7e08-42eb-ae70-a811df158ff5
```

Both files must be added to `.gitignore`.

---

## n8n Webhook Contract

**Request:**

```json
POST { "message": "Was ist Marcus' Tech Stack?" }
Content-Type: application/json
```

**Expected response:**

```json
{ "reply": "Marcus arbeitet hauptsächlich mit..." }
```

**Error handling on client:**

- Non-2xx HTTP status → show fallback error message
- Response body not valid JSON → show fallback error message
- `reply` field missing or not a string → show fallback error message
- `NEXT_PUBLIC_N8N_WEBHOOK_URL` undefined → show fallback error message

> **Note:** The n8n workflow must return JSON with a `reply` string field and must configure CORS headers to allow requests from the portfolio's production domain.

> **Note:** The webhook URL is exposed in the browser bundle (`NEXT_PUBLIC_`). n8n-side rate limiting is recommended but not in scope for this implementation.

---

## Verification

1. `npm run dev` → widget appears bottom-right on main page, auto-open on desktop, closed on mobile
2. Click a suggestion → message sent, typing indicator shown, AI response appears, list scrolls to bottom
3. Type custom message + press Enter or click send → same flow
4. Send button disabled when input is empty or while loading
5. Simulate missing env var → fallback error message appears in chat (no crash)
6. Close button collapses widget, FAB button reopens it
7. `npm run build` → static export succeeds, production webhook URL baked in
8. Open Imprint/Privacy pages → no widget visible
