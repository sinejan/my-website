import { Mentorship } from '../../../../../types/portfolio';

export class MentorshipSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.getElementById('mentorship-modal-content');
  }

  async init(mentorships: Mentorship[]): Promise<void> {
    if (!this.container) {
      console.error('Mentorship modal container not found');
      return;
    }

    try {
      this.renderMentorships(mentorships);
    } catch (error) {
      console.error('Error initializing mentorship section:', error);
    }
  }

  private renderMentorships(mentorships: Mentorship[]): void {
    if (!this.container) return;

    this.container.innerHTML = mentorships.map(mentorship => `
      <div class="experience-item">
        <h4>${mentorship.program}</h4>
        <div class="experience-meta">Role: ${mentorship.role} • ${mentorship.startDate} - ${mentorship.endDate || 'Present'}</div>
        ${mentorship.mentor ? `<div class="experience-meta">Mentor: ${mentorship.mentor}</div>` : ''}
        <p>${mentorship.description}</p>
      </div>
    `).join('');
  }
}