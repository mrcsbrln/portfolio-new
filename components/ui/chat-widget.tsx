"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";

type Message = { id: string; role: "assistant" | "user"; content: string };

const GREETING =
  "Hallo! Ich beantworte gerne Fragen über Marcus. Womit kann ich helfen?";

const SUGGESTIONS = [
  "💼 Was ist Marcus' Tech Stack?",
  "🚀 An welchen Projekten hat Marcus gearbeitet?",
  "💼 Was arbeitet Marcus zur Zeit?",
  "🏄 Was macht Marcus in seiner Freizeit?",
];

const ERROR_MSG =
  "Entschuldigung, etwas ist schiefgelaufen. Bitte versuch es später erneut.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // On desktop (≥768px): open once the hero section has scrolled out of view
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setIsOpen(true);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Scroll to bottom on every new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: userText },
    ]);
    setInput("");
    setIsLoading(true);

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: ERROR_MSG },
      ]);
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

      const reply = await res.text();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply.trim() || ERROR_MSG,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: ERROR_MSG },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-2rem)] max-w-80 flex flex-col rounded-2xl border border-[#262626] bg-[#141414] shadow-2xl overflow-hidden"
            style={{ maxHeight: "480px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#1f1f1f]">
              <div>
                <p className="text-sm font-semibold text-[#fafafa]">
                  Ask my AI-Assitant
                </p>
                <p className="text-[10px] text-[#666] mt-0.5">● Bereit</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Chat schließen"
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[82%] rounded-[10px] px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "assistant"
                      ? "self-start bg-[#1d1d1d] border border-[#262626] text-[#aaa] rounded-tl-[3px]"
                      : "self-end bg-[#fafafa] text-[#0a0a0a] font-medium rounded-br-[3px]"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-1 last:mb-0">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-[#ccc]">
                            {children}
                          </strong>
                        ),
                        h3: ({ children }) => (
                          <p className="font-semibold text-[#ccc] mt-2 mb-0.5">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-none pl-0 space-y-0.5">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="before:content-['–'] before:mr-1.5 before:text-[#555]">
                            {children}
                          </li>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
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
                      disabled={isLoading}
                      className="text-left border border-[#262626] rounded-lg px-3 py-2 text-xs text-[#888] bg-[#181818] hover:border-[#444] hover:text-[#bbb] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                className="flex-1 bg-[#1d1d1d] border border-[#262626] rounded-lg px-3 py-1.5 text-[16px] sm:text-xs text-[#ccc] placeholder-[#555] outline-none disabled:opacity-50"
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
}
