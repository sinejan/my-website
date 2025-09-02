import { PortfolioData } from '../types/portfolio';
import { DataLoader } from '../utils/DataLoader';
import { HeroSection } from './hero/HeroSection';
import { CertificatesSection } from './body/subsections/CertificatesSection';
import { AboutSection } from './body/subsections/AboutSection';
import { ExperienceSection } from './body/subsections/Experience/code/ExperienceSection';
import { SkillsSection } from './body/subsections/Skills/code/SkillsSection';
import { EducationSection } from './body/subsections/Education/code/EducationSection';
import { ContactSection } from './footer/subsections/ContactSection';

import { CertificatesSection as CertificatesModalSection } from './body/subsections/Certificates/code/CertificatesSection';
import { ProjectsSection } from './body/subsections/Project/code/ProjectsSection';

export class PortfolioApp {
  private data: PortfolioData | null = null;
  private sections: {
    hero: HeroSection;
    certificates: CertificatesSection;
    about: AboutSection;
    experience: ExperienceSection;
    skills: SkillsSection;
    education: EducationSection;
    contact: ContactSection;
    certificatesModal: CertificatesModalSection;
    projects: ProjectsSection;
  };

  constructor() {
    this.sections = {
      hero: new HeroSection(),
      certificates: new CertificatesSection(),
      about: new AboutSection(),
      experience: new ExperienceSection(),
      skills: new SkillsSection(),
      education: new EducationSection(),
      contact: new ContactSection(),
      certificatesModal: new CertificatesModalSection(),
      projects: new ProjectsSection()
    };
  }

  async init(): Promise<void> {
    try {
      // Load portfolio data
      this.data = await DataLoader.loadPortfolioData();
      
      if (!this.data) {
        throw new Error('Failed to load portfolio data');
      }

      // Initialize all sections with data
      await this.initializeSections();
      
      // Setup dynamic interactions
      this.setupInteractions();
      
      console.log('Portfolio app initialized with data:', this.data);
    } catch (error) {
      console.error('Error initializing portfolio app:', error);
      this.showErrorMessage();
    }
  }

  private async initializeSections(): Promise<void> {
    if (!this.data) return;

    try {
      // Initialize main sections
      await Promise.all([
        this.sections.hero.init(this.data.personalInfo),
        this.sections.certificates.init(),
        this.sections.about.init(this.data.personalInfo, this.data.technicalSkills),
        this.sections.contact.init(this.data.personalInfo)
      ]);

      // Initialize overview/projects
      await this.sections.projects.init();

      // Initialize modal content
      this.initializeModals();
    } catch (error) {
      console.error('Error initializing sections:', error);
      throw error;
    }
  }

  private initializeModals(): void {
    if (!this.data) return;

    // Initialize experience modal (includes mentorships)
    this.sections.experience.init(this.data.experience, this.data.mentorships);

    // Initialize skills modal
    this.sections.skills.init(this.data.technicalSkills);

    // Initialize education modal
    this.sections.education.init(this.data.education);

    // Initialize certificates modal
    this.sections.certificatesModal.init(this.data.certifications);
  }

  
  
  private setupInteractions(): void {
    // Setup scroll-triggered animations
    this.setupScrollAnimations();
    
    // Setup skill hover effects
    this.setupSkillInteractions();
  }



  private setupScrollAnimations(): void {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));
  }

  private setupSkillInteractions(): void {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('skill-hover');
      });
      
      item.addEventListener('mouseleave', () => {
        item.classList.remove('skill-hover');
      });
    });
  }

  private showErrorMessage(): void {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-container">
          <div class="error-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're having trouble loading the portfolio data. Please try refreshing the page.</p>
            <button onclick="window.location.reload()" class="btn btn-primary">
              Refresh Page
            </button>
          </div>
        </div>
      `;
    }
  }

  // Public method to get current data
  public getData(): PortfolioData | null {
    return this.data;
  }

  // Public method to refresh data
  public async refresh(): Promise<void> {
    await this.init();
  }
}
