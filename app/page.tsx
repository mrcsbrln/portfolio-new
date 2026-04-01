import { BackgroundPaths } from "@/components/ui/background-paths";
import { AboutSection } from "@/components/ui/about-section";
import { SkillsSection } from "@/components/ui/skills-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import { ContactSection } from "@/components/ui/contact-section";
import { ChatWidget } from "@/components/ui/chat-widget";

export default function Home() {
  return (
    <>
      <div id="hero">
        <BackgroundPaths title="Marcus Hartmann" />
      </div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <ChatWidget />
    </>
  );
}
