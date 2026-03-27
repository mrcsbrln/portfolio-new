"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string) {
  return {
    name: name.trim().length < 2 ? "Please enter your name." : "",
    email: !EMAIL_RE.test(email) ? "Please enter a valid email address." : "",
    message: message.trim().length < 10 ? "Please enter a message (min. 10 characters)." : "",
  };
}

const sectionVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [status, setStatus] = useState<FormState>("idle");

  const errors = validate(name, email, message);
  const isValid = !errors.name && !errors.email && !errors.message && privacy;

  function touch(field: keyof typeof touched) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus("loading");

    try {
      const res = await fetch("https://marcus-hartmann.net/sendMail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setPrivacy(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="w-full min-h-dvh bg-neutral-900 py-20 md:py-28 flex flex-col justify-center"
    >
      <div className="w-full max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-10"
        >
          04 / Contact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
              Let's work together
            </h2>
            <p className="text-lg font-medium text-neutral-400 mb-4">
              Got a problem to solve?
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              Contact me through this form. I am interested in hearing from you,
              knowing your ideas and contributing to your projects with my work.
            </p>
            <p className="text-sm text-neutral-400">
              Need a Frontend developer?{" "}
              <a
                href="mailto:info@marcus-hartmann.net"
                className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors duration-200"
              >
                Let's talk!
              </a>
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Name */}
              <div className="border-t border-neutral-700 py-6">
                <label className="block text-base font-bold tracking-tight text-white mb-3">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => touch("name")}
                  placeholder={touched.name && errors.name ? errors.name : "Your name goes here"}
                  className={`w-full bg-transparent outline-none text-sm text-neutral-300 font-mono
                    ${touched.name && errors.name ? "placeholder:text-red-400" : "placeholder:text-neutral-600"}`}
                />
              </div>

              {/* Email */}
              <div className="border-t border-neutral-700 py-6">
                <label className="block text-base font-bold tracking-tight text-white mb-3">
                  What's your email?
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => { setEmailFocused(false); touch("email"); }}
                  placeholder={touched.email && errors.email && !email ? errors.email : "your@email.com"}
                  className={`w-full bg-transparent outline-none text-sm text-neutral-300 font-mono
                    ${touched.email && errors.email && !email ? "placeholder:text-red-400" : "placeholder:text-neutral-600"}`}
                />
                {touched.email && errors.email && email && !emailFocused && (
                  <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="border-t border-neutral-700 py-6">
                <label className="block text-base font-bold tracking-tight text-white mb-3">
                  How can I help you?
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => { setMessageFocused(false); touch("message"); }}
                  placeholder={touched.message && errors.message && !message ? errors.message : "What do you need to develop?"}
                  className={`w-full bg-transparent outline-none text-sm text-neutral-300 font-mono resize-none
                    ${touched.message && errors.message && !message ? "placeholder:text-red-400" : "placeholder:text-neutral-600"}`}
                />
                {touched.message && errors.message && message && !messageFocused && (
                  <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Privacy + Submit */}
              <div className="border-t border-neutral-700 pt-6 flex flex-col gap-6">
                {/* Privacy checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      required
                      checked={privacy}
                      onChange={(e) => setPrivacy(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border transition-colors duration-200
                        ${privacy
                          ? "bg-white border-white"
                          : "bg-transparent border-neutral-500 group-hover:border-neutral-300"
                        }`}
                    />
                    {privacy && (
                      <svg
                        className="absolute inset-0 w-4 h-4 text-neutral-900"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 leading-relaxed">
                    I've read the{" "}
                    <a
                      href="/privacy"
                      className="text-white underline underline-offset-2 hover:text-neutral-300 transition-colors duration-200"
                    >
                      privacy policy
                    </a>{" "}
                    and agree to the processing of my data as outlined.
                  </span>
                </label>

                {/* Submit */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    {status === "success" && (
                      <p className="font-mono text-[10px] tracking-widest uppercase text-green-400">
                        Message sent successfully.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="font-mono text-[10px] tracking-widest uppercase text-red-400">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading" || !isValid}
                    className="shrink-0 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase
                               border border-white/40 px-8 py-4 text-white
                               hover:bg-white hover:text-neutral-900 hover:border-white
                               transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : "Say hello :)"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
