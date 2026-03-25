"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navItems = [
    { label: "About me", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
];

export function Navbar() {
    const visible = useMotionValue(1);
    const y = useTransform(visible, [0, 1], ["-100%", "0%"]);
    const lastScrollY = useRef(0);
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;
            const heroHeight = window.innerHeight;

            setPastHero(currentY > heroHeight);

            if (currentY < 60) {
                animate(visible, 1, { duration: 0.3 });
            } else if (delta > 4) {
                animate(visible, 0, { duration: 0.3 });
            } else if (delta < -4) {
                animate(visible, 1, { duration: 0.3 });
            }

            lastScrollY.current = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visible]);

    return (
        <motion.header
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            style={{ y }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            {/* Glass backdrop — only past hero */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500
                    backdrop-blur-md
                    bg-white/80 dark:bg-neutral-950/80
                    border-b border-neutral-200/60 dark:border-neutral-800/60
                    ${pastHero ? "opacity-100" : "opacity-0"}`}
            />

            <div className="relative mx-auto max-w-[1440px] px-6 py-5">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="/"
                        aria-label="Marcus Hartmann — Home"
                        className="flex items-baseline gap-0 group"
                    >
                        <span className="font-mono text-base font-bold tracking-tight text-neutral-900 dark:text-white select-none">
                            MH
                        </span>
                        <span className="font-mono text-base font-bold text-neutral-400 dark:text-neutral-500 select-none animate-[cursor-blink_1.1s_step-end_infinite]">
                            _
                        </span>
                    </a>

                    {/* Nav links */}
                    <ul className="flex items-center gap-7 sm:gap-9">
                        {navItems.map((item, i) => (
                            <motion.li
                                key={item.href}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.15 + i * 0.07,
                                    duration: 0.45,
                                    ease: "easeOut",
                                }}
                            >
                                <a
                                    href={item.href}
                                    className="relative text-sm font-medium text-neutral-500 dark:text-neutral-400
                                               hover:text-neutral-900 dark:hover:text-white
                                               transition-colors duration-200 group"
                                >
                                    {item.label}
                                    <span
                                        className="absolute -bottom-px left-0 h-px w-0 bg-neutral-900 dark:bg-white
                                                   transition-all duration-300 ease-out group-hover:w-full"
                                    />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
}
