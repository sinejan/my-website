import { PersonalInfo } from '../../types/portfolio';

export class HeroSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.querySelector('.hero-section');
  }

  async init(personalInfo: PersonalInfo): Promise<void> {
    if (!this.container) {
      console.error('Hero section container not found');
      return;
    }

    try {
      this.renderHeroContent(personalInfo);
      this.setupTypingAnimation(personalInfo.name);
    } catch (error) {
      console.error('Error initializing hero section:', error);
    }
  }

  private renderHeroContent(personalInfo: PersonalInfo): void {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-greeting">Hello, I'm</span>
              <span class="title-name" id="hero-name">${personalInfo.name}</span>
            </h1>
            <p class="hero-subtitle" id="hero-title">${personalInfo.title}</p>
            <p class="hero-description" id="hero-bio">${personalInfo.bio}</p>
          </div>
          <div class="hero-scroll">
            <a href="#about" class="scroll-indicator">
              <span class="scroll-text">Learn More</span>
              <div class="scroll-arrow"></div>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  private setupTypingAnimation(fullName: string): void {
    const nameElement = document.getElementById('hero-name');
    if (!nameElement) return;

    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < fullName.length) {
        nameElement.textContent += fullName.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
}
