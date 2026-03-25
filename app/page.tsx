import { BackgroundPaths } from "@/components/ui/background-paths";
import { AboutSection } from "@/components/ui/about-section";
import { SkillsSection } from "@/components/ui/skills-section";

export default function Home() {
  return (
    <>
      <BackgroundPaths title="Marcus Hartmann" />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
