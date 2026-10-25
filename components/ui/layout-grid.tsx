"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Adapted from Aceternity UI's Layout Grid

export type LayoutGridCard = {
  id: number;
  title: string;
  className?: string;
  thumbnail: string;
  // Overlay shown on the tile in the grid
  preview: ReactNode;
  // Details shown once the tile is expanded
  content: ReactNode;
};

export function LayoutGrid({ cards }: { cards: LayoutGridCard[] }) {
  const [selected, setSelected] = useState<LayoutGridCard | null>(null);
  const tileRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  // The overlay portal needs document.body, which only exists on the client
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // While a card is open: the page doesn't scroll, Escape closes it, focus
  // sits on the close button and returns to the tile afterwards
  useEffect(() => {
    if (!selected) return;
    const { id } = selected;
    // Same object as tileRefs.current, so the cleanup sees the re-rendered tile
    const tiles = tileRefs.current;
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
      tiles[id]?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[18rem] md:auto-rows-[20rem] gap-4">
        {cards.map((card) => (
          <div key={card.id} className={card.className}>
            {selected?.id === card.id ? (
              // Keeps the grid cell filled while the card is expanded
              <div className="h-full w-full border border-neutral-800 bg-neutral-900" />
            ) : (
              <motion.div
                layoutId={`card-${card.id}`}
                ref={(el) => {
                  tileRefs.current[card.id] = el;
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${card.title} – show details`}
                onClick={() => setSelected(card)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(card);
                  }
                }}
                className="group flex h-full w-full cursor-pointer flex-col overflow-hidden border border-neutral-800 bg-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="relative flex-1 overflow-hidden">
                  <CardImage
                    card={card}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="grayscale transition-[filter,scale] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                </div>
                <div className="border-t border-neutral-800 bg-neutral-900 transition-colors duration-300 group-hover:bg-neutral-800">
                  {card.preview}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Portal keeps the fixed overlay independent of ancestor transforms */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 z-[60] bg-black"
              />
            )}
            {selected && (
              <motion.div
                key={`card-${selected.id}`}
                layoutId={`card-${selected.id}`}
                role="dialog"
                aria-modal="true"
                aria-label={selected.title}
                className="fixed inset-0 z-[70] m-auto flex h-[min(40rem,88vh)] w-[min(60rem,92vw)] flex-col overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl"
              >
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <CardImage
                    card={selected}
                    sizes="(max-width: 768px) 92vw, 60rem"
                  />
                  <button
                    ref={closeRef}
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center border border-white/30 bg-black/70 text-sm text-white/80 backdrop-blur-sm transition-colors hover:border-white hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="max-h-[60%] shrink-0 overflow-y-auto border-t border-neutral-800 bg-neutral-900 p-6 md:p-8"
                >
                  {selected.content}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function CardImage({
  card,
  sizes,
  className,
}: {
  card: LayoutGridCard;
  sizes: string;
  className?: string;
}) {
  return (
    <motion.div layoutId={`image-${card.id}`} className="absolute inset-0">
      <Image
        src={card.thumbnail}
        alt={card.title}
        fill
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    </motion.div>
  );
}
