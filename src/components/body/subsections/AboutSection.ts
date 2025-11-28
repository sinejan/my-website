import { PersonalInfo, TechnicalSkill } from '../../../types/portfolio';

export class AboutSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.querySelector('.about-section');
  }

  async init(personalInfo: PersonalInfo, technicalSkills: TechnicalSkill[]): Promise<void> {
    if (!this.container) {
      console.error('About section container not found');
      return;
    }

    try {
      this.renderAboutContent(personalInfo);
      // Technical skills are available for future use if needed
      console.log(`About section initialized with ${technicalSkills.length} technical skills`);
    } catch (error) {
      console.error('Error initializing about section:', error);
    }
  }

  private renderAboutContent(_personalInfo: PersonalInfo): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
          <div class="about-card">
            <!-- Action Buttons -->
            <div class="about-actions">
              <button class="btn btn-outline" onclick="openModal('experience-modal')">
                Professional Experience
              </button>
              <button class="btn btn-outline" onclick="openModal('skills-modal')">
                Technical Skills
              </button>
              <button class="btn btn-outline" onclick="openModal('education-modal')">
                Education & Background
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Re-initialize Lucide icons if needed
    if ((window as any).lucide?.createIcons) {
      (window as any).lucide.createIcons();
    }
  }
}
