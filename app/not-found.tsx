import type { Metadata } from "next";
import { ParticleNotFound } from "@/components/ui/particle-not-found";

export const metadata: Metadata = {
  title: "404 — Page not found | Marcus Hartmann",
  robots: { index: false },
};

export default function NotFound() {
  return <ParticleNotFound />;
}
