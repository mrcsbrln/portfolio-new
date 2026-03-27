import { BackgroundPaths } from "@/components/ui/background-paths";
import { AboutSection } from "@/components/ui/about-section";
import { SkillsSection } from "@/components/ui/skills-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import { ContactSection } from "@/components/ui/contact-section";

export default function Home() {
  return (
    <>
      <BackgroundPaths title="Marcus Hartmann" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
