import { PersonalInfo } from '../../../types/portfolio';

export class ContactSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.querySelector('.contact-section');
  }

  async init(personalInfo: PersonalInfo): Promise<void> {
    if (!this.container) {
      console.error('Contact section container not found');
      return;
    }

    try {
      this.renderContactContent(personalInfo);
      this.setupContactInteractions();
    } catch (error) {
      console.error('Error initializing contact section:', error);
    }
  }

  private renderContactContent(personalInfo: PersonalInfo): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="container">
        <h2 class="section-title">Let's Connect</h2>
        <div class="contact-content">
          <div class="contact-grid">
            <a href="mailto:${personalInfo.email}" class="contact-card glass-card contact-link" id="contact-email">
              <div class="contact-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h4>Email</h4>
              <span class="contact-text">${personalInfo.email}</span>
            </a>
            <a href="${personalInfo.linkedin}" target="_blank" class="contact-card glass-card contact-link" id="contact-linkedin">
              <div class="contact-icon linkedin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <h4>LinkedIn</h4>
              <span class="contact-text">Connect with me</span>
            </a>
            <a href="${personalInfo.github || '#'}" target="_blank" class="contact-card glass-card contact-link" id="contact-github">
              <div class="contact-icon github-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </div>
              <h4>GitHub</h4>
              <span class="contact-text">View my code</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  private setupContactInteractions(): void {
    // Re-initialize Lucide icons after DOM update
    if ((window as any).lucide?.createIcons) {
      (window as any).lucide.createIcons();
    }
  }
}
