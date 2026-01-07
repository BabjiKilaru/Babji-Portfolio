import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import {
  AboutSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  ResumeSection,
  SkillsSection,
} from '@/components/Sections';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer role="contentinfo" className="sr-only">
        © Babji Kilaru
      </footer>
    </div>
  );
};

export default Index;
