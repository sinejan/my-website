import { Education } from '../../../../../types/portfolio';

export class EducationSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.getElementById('education-modal-content');
  }

  async init(education: Education[]): Promise<void> {
    if (!this.container) {
      console.error('Education modal container not found');
      return;
    }

    try {
      this.renderEducation(education);
    } catch (error) {
      console.error('Error initializing education section:', error);
    }
  }

  private renderEducation(education: Education[]): void {
    if (!this.container) return;

    this.container.innerHTML = education.map(edu => `
      <div class="experience-item">
        <h4>${edu.degree} in ${edu.field}</h4>
        <div class="experience-meta">${edu.institution} • ${edu.startYear} - ${edu.endYear || 'Present'}</div>
        ${edu.gpa ? `<div class="experience-meta">GPA: ${edu.gpa}</div>` : ''}
        ${edu.activities ? `<ul>${edu.activities.map(activity => `<li>${activity}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
  }
}
