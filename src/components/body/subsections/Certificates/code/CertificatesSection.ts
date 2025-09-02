import { Certification } from '../../../../../types/portfolio';

export class CertificatesSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.getElementById('certificates-modal-content');
  }

  async init(certificates: Certification[]): Promise<void> {
    if (!this.container) {
      console.error('Certificates modal container not found');
      return;
    }

    try {
      this.renderCertificates(certificates);
    } catch (error) {
      console.error('Error initializing certificates section:', error);
    }
  }

  private renderCertificates(certificates: Certification[]): void {
    if (!this.container) return;

    // Check if certificates is valid array
    if (!certificates || !Array.isArray(certificates)) {
      console.warn('Certificates data is not a valid array:', certificates);
      this.container.innerHTML = '<p>No certificates available.</p>';
      return;
    }

    this.container.innerHTML = certificates.map(cert => `
      <div class="certificate-item">
        <div class="certificate-icon">
          <i data-lucide="award"></i>
        </div>
        <div class="certificate-info">
          <h4>${cert.name}</h4>
          <div class="certificate-date">${cert.issuer} • ${cert.year}</div>
        </div>
      </div>
    `).join('');
  }
}