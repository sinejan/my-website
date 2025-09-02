type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string;
};

export class CertificatesSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.querySelector('.certificates-section');
  }

  async init(): Promise<void> {
    if (!this.container) {
      console.error('Certificates section container not found');
      return;
    }

    try {
      const certificates = await this.loadCertificates();
      this.renderCertificatesContent(certificates);
    } catch (error) {
      console.error('Error initializing certificates section:', error);
    }
  }

  private async loadCertificates(): Promise<Certificate[]> {
    try {
      const response = await fetch('/data/portfolio.json');
      const data = await response.json();
      return data.certificates || [];
    } catch (error) {
      console.error('Error loading certificates:', error);
      return [];
    }
  }

  private renderCertificatesContent(certificates: Certificate[]): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="container">
        <h2 class="section-title">Certifications</h2>
        <div class="certificates-grid">
          ${certificates.map((cert, index) => `
            <div class="certificate-item" style="animation-delay: ${index * 0.1}s">
              <img
                src="${cert.image}"
                alt="${cert.title}"
                class="certificate-image"
                title="${cert.title} - ${cert.issuer} (${cert.date})"
              />
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}
