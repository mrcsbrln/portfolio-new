# Chat Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed bottom-right chat widget to the portfolio's main page that auto-opens on desktop, shows suggested questions, and sends messages to an n8n webhook that responds with AI answers about Marcus.

**Architecture:** A single `"use client"` component (`chat-widget.tsx`) manages all state and logic. It is imported directly into `app/page.tsx`. Webhook URL is injected at build time via `NEXT_PUBLIC_N8N_WEBHOOK_URL` from `.env.local` (dev) and `.env.production` (prod).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion v12

> **Note:** No test runner is configured in this project. Verification is done by running `npm run dev` and manually testing each behavior. No test files are created.

> **Before writing code:** Read `node_modules/next/dist/docs/01-app/index.md` for any breaking changes relevant to client components in this version of Next.js.

---

## File Map

| Action | Path                            | Responsibility                                    |
| ------ | ------------------------------- | ------------------------------------------------- |
| Create | `components/ui/chat-widget.tsx` | All widget UI, state, and fetch logic             |
| Modify | `app/page.tsx`                  | Import and render `<ChatWidget />`                |
| Create | `.env.local`                    | Dev webhook URL (already gitignored via `.env*`)  |
| Create | `.env.production`               | Prod webhook URL (already gitignored via `.env*`) |

---

## Task 1: Environment variables

**Files:**

- Create: `.env.local`
- Create: `.env.production`

- [ ] **Step 1: Create `.env.local`**

```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-n8n.cqvcsp.easypanel.host/webhook-test/c4099533-7e08-42eb-ae70-a811df158ff5
```

- [ ] **Step 2: Create `.env.production`**

```bash
# .env.production
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-n8n.cqvcsp.easypanel.host/webhook/c4099533-7e08-42eb-ae70-a811df158ff5
```

- [ ] **Step 3: Verify gitignore covers env files**

Run:

```bash
grep "\.env" .gitignore
```

Expected: `.env*` is present. If not, add `.env.local` and `.env.production` to `.gitignore`.

---

## Task 2: Build the ChatWidget component

**Files:**

- Create: `components/ui/chat-widget.tsx`

### 2a — Scaffold the component with types and state

- [ ] **Step 1: Create `components/ui/chat-widget.tsx` with types, state, and empty render**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "assistant" | "user"; content: string };

const GREETING =
  "Hallo! Ich beantworte gerne Fragen über Marcus. Womit kann ich helfen?";

const SUGGESTIONS = [
  "💼 Was ist Marcus' Tech Stack?",
  "🚀 An welchen Projekten hat Marcus gearbeitet?",
  "📬 Wie kann ich Marcus kontaktieren?",
  "🎓 Was ist Marcus' Erfahrung?",
];

const ERROR_MSG =
  "Entschuldigung, etwas ist schiefgelaufen. Bitte versuch es später erneut.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-open on md+ (≥768px)
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  // Scroll to bottom on every new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return null; // placeholder — filled in next steps
}
```

- [ ] **Step 2: Run dev server to verify no TypeScript errors**

```bash
npm run dev
```

Expected: Server starts, no TS errors in terminal.

### 2b — Implement the send logic

- [ ] **Step 3: Add `handleSend` function inside the component (before the return)**

```tsx
async function handleSend(text?: string) {
  const userText = (text ?? input).trim();
  if (!userText || isLoading) return;

  setMessages((prev) => [...prev, { role: "user", content: userText }]);
  setInput("");
  setIsLoading(true);

  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    setMessages((prev) => [...prev, { role: "assistant", content: ERROR_MSG }]);
    setIsLoading(false);
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    if (!res.ok) throw new Error("non-2xx");

    const data = await res.json();
    const reply = typeof data?.reply === "string" ? data.reply : null;

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply ?? ERROR_MSG },
    ]);
  } catch {
    setMessages((prev) => [...prev, { role: "assistant", content: ERROR_MSG }]);
  } finally {
    setIsLoading(false);
  }
}
```

### 2c — Build the UI

- [ ] **Step 4: Replace `return null` with the full widget JSX**

```tsx
return (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-80 flex flex-col rounded-2xl border border-[#262626] bg-[#141414] shadow-2xl overflow-hidden"
          style={{ maxHeight: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#1f1f1f]">
            <div>
              <p className="text-sm font-semibold text-[#fafafa]">
                Ask me anything
              </p>
              <p className="text-[10px] text-[#666] mt-0.5">● Bereit</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded border border-[#2a2a2a] text-[#666] hover:text-[#aaa] transition-colors text-xs"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[82%] rounded-[10px] px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "assistant"
                    ? "self-start bg-[#1d1d1d] border border-[#262626] text-[#aaa] rounded-tl-[3px]"
                    : "self-end bg-[#fafafa] text-[#0a0a0a] font-medium rounded-br-[3px]"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="self-start bg-[#1d1d1d] border border-[#262626] rounded-[10px] rounded-tl-[3px] px-3 py-2 flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#555] block"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Suggestion chips — shown only before first user message */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-col gap-1 mt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left border border-[#262626] rounded-lg px-3 py-2 text-xs text-[#888] bg-[#181818] hover:border-[#444] hover:text-[#bbb] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center px-3 py-2 border-t border-[#1f1f1f]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              disabled={isLoading}
              placeholder="Frage stellen..."
              className="flex-1 bg-[#1d1d1d] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-[#ccc] placeholder-[#555] outline-none disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || input.trim().length === 0}
              className="w-7 h-7 flex items-center justify-center bg-[#fafafa] rounded-lg text-[#0a0a0a] font-bold text-sm disabled:opacity-40 transition-opacity"
            >
              →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* FAB button */}
    <button
      onClick={() => setIsOpen((v) => !v)}
      className="w-12 h-12 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      aria-label="Chat öffnen"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  </div>
);
```

- [ ] **Step 5: Verify no TypeScript errors**

```bash
npm run dev
```

Expected: Server starts cleanly, no red underlines in IDE.

---

## Task 3: Wire into the main page

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: Import and add `<ChatWidget />` to `app/page.tsx`**

Add import at the top:

```tsx
import { ChatWidget } from "@/components/ui/chat-widget";
```

Add to the JSX (inside the fragment, after `<ContactSection />`):

```tsx
<ChatWidget />
```

Final file should look like:

```tsx
import { BackgroundPaths } from "@/components/ui/background-paths";
import { AboutSection } from "@/components/ui/about-section";
import { SkillsSection } from "@/components/ui/skills-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import { ContactSection } from "@/components/ui/contact-section";
import { ChatWidget } from "@/components/ui/chat-widget";

export default function Home() {
  return (
    <>
      <BackgroundPaths title="Marcus Hartmann" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <ChatWidget />
    </>
  );
}
```

---

## Task 4: Manual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open http://localhost:3000 on desktop (≥768px)**

Expected: Chat widget visible bottom-right, auto-open with greeting and 4 suggestion chips.

- [ ] **Step 3: Click a suggestion chip**

Expected: Chip disappears, user message appears (white bubble), typing indicator shows, AI response appears (dark bubble), list scrolls to bottom.

- [ ] **Step 4: Type a custom message and press Enter**

Expected: Same flow as suggestion.

- [ ] **Step 5: Try submitting empty input**

Expected: Nothing happens (send button is disabled/grayed out).

- [ ] **Step 6: Click ✕ to close, then FAB to reopen**

Expected: Widget closes and reopens with animation.

- [ ] **Step 7: Open on mobile viewport (375px)**

Expected: Widget is closed by default. FAB button visible. Clicking it opens the chat.

- [ ] **Step 8: Check Imprint and Privacy pages**

Navigate to `/imprint` and `/privacy`. Expected: No chat widget visible.

- [ ] **Step 9: Verify production build**

```bash
npm run build
```

Expected: Build completes, no TS errors, static export succeeds.

---

## Task 5: Commit

- [ ] **Step 1: Stage and commit**

```bash
git add components/ui/chat-widget.tsx app/page.tsx
git commit -m "feat(chat): add recruiter chat widget connected to n8n webhook"
```

Note: `.env.local` and `.env.production` are gitignored — do not commit them.
