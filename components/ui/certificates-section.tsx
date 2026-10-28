"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { certificates, type Certificate } from "@/lib/certificates";

// --- Animation variants ---

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// --- Components ---

function CertificateRow({
  certificate,
  index,
  onOpen,
  buttonRef,
}: {
  certificate: Certificate;
  index: number;
  onOpen: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <motion.li variants={rowVariants}>
      <button
        ref={buttonRef}
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`${certificate.title} – show certificate`}
        className="group relative grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-2 border-b border-white/10 py-6 text-left outline-none transition-colors duration-300 hover:bg-white/[0.03] focus-visible:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-white md:grid-cols-[3rem_1fr_16rem_6rem_2rem] md:items-center md:px-2"
      >
        <span className="font-mono text-xs text-neutral-600 transition-colors duration-300 group-hover:text-neutral-400 md:pt-0 pt-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0">
          <span className="block text-base md:text-lg font-medium tracking-tight text-neutral-200 transition-colors duration-300 group-hover:text-white">
            {certificate.title}
          </span>
          {certificate.detail && (
            <span className="mt-1 block text-sm text-neutral-500">
              {certificate.detail}
            </span>
          )}
          {/* Issuer and date move below the title on small screens */}
          <span className="mt-2 flex flex-wrap gap-x-3 font-mono text-[0.625rem] tracking-widest uppercase text-neutral-500 md:hidden">
            <span>{certificate.issuer}</span>
            <span className="text-neutral-700">/</span>
            <span>{certificate.date}</span>
          </span>
        </span>

        <span className="hidden font-mono text-xs tracking-widest uppercase text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300 md:block">
          {certificate.issuer}
        </span>

        <span className="hidden font-mono text-xs text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300 md:block">
          {certificate.date}
        </span>

        <span
          aria-hidden="true"
          className="justify-self-end pt-1 text-neutral-600 transition-[color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white md:pt-0"
        >
          ↗
        </span>

        {/* Line growing along the bottom border on hover */}
        <span className="absolute -bottom-px left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full group-focus-visible:w-full" />
      </button>
    </motion.li>
  );
}

export function CertificatesSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const rowRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  // The overlay portal needs document.body, which only exists on the client
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // While a certificate is open: the page doesn't scroll, Escape closes it,
  // focus sits on the close button and returns to the row afterwards
  useEffect(() => {
    if (selected === null) return;
    const rows = rowRefs.current;
    closeRef.current?.focus();

    const html = document.documentElement;
    const { body } = document;
    const prevOverflow = html.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    // Fill the gap of the hidden scrollbar so the page doesn't shift sideways
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      rows[selected]?.focus({ preventScroll: true });
    };
  }, [selected]);

  const current = selected === null ? null : certificates[selected];

  return (
    <section id="certificates" className="w-full bg-neutral-900 py-28 md:py-36">
      <div className="w-full max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6"
        >
          04 / Certificates
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-10"
        >
          Certificates
        </motion.h2>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={listVariants}
          className="border-t border-white/10"
        >
          {certificates.map((certificate, i) => (
            <CertificateRow
              key={certificate.src}
              certificate={certificate}
              index={i}
              onOpen={() => setSelected(i)}
              buttonRef={(el) => {
                rowRefs.current[i] = el;
              }}
            />
          ))}
        </motion.ul>
      </div>

      {/* Portal keeps the fixed overlay independent of ancestor transforms */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {current && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 z-[60] bg-black"
              />
            )}
            {current && (
              <motion.div
                key="certificate"
                role="dialog"
                aria-modal="true"
                aria-label={current.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[70] m-auto flex h-[min(48rem,90vh)] w-[min(64rem,94vw)] flex-col overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl"
              >
                <div className="flex shrink-0 items-center gap-4 border-b border-neutral-800 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm md:text-base font-medium text-white">
                      {current.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.625rem] tracking-widest uppercase text-neutral-500">
                      {current.issuer} · {current.date}
                    </p>
                  </div>
                  <a
                    href={current.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden shrink-0 font-mono text-xs tracking-widest uppercase text-neutral-400 transition-colors hover:text-white sm:block"
                  >
                    Open in new tab ↗
                  </a>
                  <a
                    href={current.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open in new tab"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/30 text-sm text-white/80 transition-colors hover:border-white hover:text-white sm:hidden"
                  >
                    ↗
                  </a>
                  <button
                    ref={closeRef}
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-white/30 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <iframe
                  // Hide the PDF viewer's sidebar and toolbar, fit to width
                  src={
                    current.src.endsWith(".pdf")
                      ? `${current.src}#toolbar=0&navpanes=0&view=FitH`
                      : current.src
                  }
                  title={current.title}
                  className="min-h-0 w-full flex-1 bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
