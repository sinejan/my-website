import { PortfolioData } from '@/types/portfolio';
import { ExperienceSection } from '../../body/subsections/Experience/code/ExperienceSection';
import { SkillsSection } from '../../body/subsections/Skills/code/SkillsSection';
import { EducationSection } from '../../body/subsections/Education/code/EducationSection';
import { MentorshipSection } from '../../body/subsections/Mentorship/code/MentorshipSection';
import { CertificatesSection } from '../../body/subsections/Certificates/code/CertificatesSection';

export class ModalManager {
  private experienceSection: ExperienceSection;
  private skillsSection: SkillsSection;
  private educationSection: EducationSection;
  private mentorshipSection: MentorshipSection;
  private certificatesSection: CertificatesSection;

  constructor() {
    this.experienceSection = new ExperienceSection();
    this.skillsSection = new SkillsSection();
    this.educationSection = new EducationSection();
    this.mentorshipSection = new MentorshipSection();
    this.certificatesSection = new CertificatesSection();
  }

  async init(data: PortfolioData): Promise<void> {
    try {
      // Initialize all modal sections
      this.experienceSection.init(data.experience, data.mentorships);
      this.skillsSection.init(data.technicalSkills);
      this.educationSection.init(data.education);
      this.mentorshipSection.init(data.mentorships);
      this.certificatesSection.init(data.certifications);
    } catch (error) {
      console.error('Error initializing modals:', error);
      throw error;
    }
  }
}