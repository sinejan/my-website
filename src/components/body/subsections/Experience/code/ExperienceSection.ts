import { Experience, Mentorship } from '../../../../../types/portfolio';

export class ExperienceSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.getElementById('experience-modal-content');
  }

  async init(experiences: Experience[], mentorships: Mentorship[]): Promise<void> {
    if (!this.container) {
      console.error('Experience modal container not found');
      return;
    }

    try {
      this.renderExperienceAndMentorships(experiences, mentorships);
    } catch (error) {
      console.error('Error initializing experience section:', error);
    }
  }

  private renderExperienceAndMentorships(experiences: Experience[], mentorships: Mentorship[]): void {
    if (!this.container) return;

    const experienceHTML = experiences.length > 0 ? `
      <div class="modal-section">
        <h3>Professional Experience</h3>
        ${experiences.map(exp => `
          <div class="experience-item">
            <h4>${exp.position}</h4>
            <div class="experience-meta">${exp.company} • ${exp.startDate} - ${exp.endDate}</div>
            <div class="experience-meta">${exp.location} • ${exp.type}</div>
            <ul>
              ${exp.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
            </ul>
            ${exp.technologies ? `<div class="skill-tags">${exp.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    const mentorshipHTML = mentorships.length > 0 ? `
      <div class="modal-section">
        <h3>Mentorships & Programs</h3>
        ${mentorships.map(mentorship => `
          <div class="experience-item">
            <h4>${mentorship.program}</h4>
            <div class="experience-meta">Role: ${mentorship.role} • ${mentorship.startDate} - ${mentorship.endDate || 'Present'}</div>
            ${mentorship.mentor ? `<div class="experience-meta">Mentor: ${mentorship.mentor}</div>` : ''}
            <p>${mentorship.description}</p>
          </div>
        `).join('')}
      </div>
    ` : '';

    this.container.innerHTML = experienceHTML + mentorshipHTML;
  }
}