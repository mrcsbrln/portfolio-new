import { ParticleHero } from "@/components/ui/particle-hero";
import { AboutSection } from "@/components/ui/about-section";
import { SkillsSection } from "@/components/ui/skills-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import { CertificatesSection } from "@/components/ui/certificates-section";
import { ContactSection } from "@/components/ui/contact-section";
import { ChatWidget } from "@/components/ui/chat-widget";

export default function Home() {
  return (
    <>
      <div id="hero">
        <ParticleHero title="Marcus Hartmann" shockwave />
      </div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <ChatWidget />
    </>
  );
}
