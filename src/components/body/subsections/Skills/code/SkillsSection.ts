import { TechnicalSkill } from '../../../../../types/portfolio';

export class SkillsSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.getElementById('skills-modal-content');
  }

  async init(skills: TechnicalSkill[]): Promise<void> {
    if (!this.container) {
      console.error('Skills modal container not found');
      return;
    }

    try {
      this.renderSkills(skills);
    } catch (error) {
      console.error('Error initializing skills section:', error);
    }
  }

  private renderSkills(skills: TechnicalSkill[]): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="skills-grid">
        ${skills.map(skillGroup => `
          <div class="skill-category">
            <h4>${skillGroup.category}</h4>
            <div class="skill-tags">
              ${skillGroup.skills.map(skill => `
                <span class="skill-tag">${skill}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
