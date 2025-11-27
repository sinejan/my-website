type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  outcome: string;
};

export class ProjectsSection {
  private container: HTMLElement | null = null;
  private projects: Project[] = [];
  private isExpanded: boolean = false;
  private readonly INITIAL_PROJECT_COUNT = 6;

  constructor() {
    this.container = document.querySelector('.overview-section');
  }

  async init(): Promise<void> {
    console.log('ProjectsSection init called');
    if (!this.container) {
      console.error('Container .overview-section not found');
      return;
    }

    try {
      this.projects = await this.loadProjects();
      console.log('Loaded projects:', this.projects);

      if (this.projects.length === 0) {
        console.log('No projects found, hiding section');
        this.container.style.display = 'none';
        return;
      }

      this.container.style.display = 'block';
      this.renderSection();
    } catch (e) {
      console.error('Failed to load projects:', e);
      this.container.style.display = 'none';
    }
  }

  private async loadProjects(): Promise<Project[]> {
    try {
      const response = await fetch('/data/portfolio.json');
      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  private renderSection(): void {
    if (!this.container) return;

    const visibleProjects = this.isExpanded
      ? this.projects
      : this.projects.slice(0, this.INITIAL_PROJECT_COUNT);

    const hasMoreProjects = this.projects.length > this.INITIAL_PROJECT_COUNT;

    this.container.innerHTML = `
      <div class="container">
        <h2 class="section-title">Projects</h2>
        <div class="projects-showcase">
          ${visibleProjects.map((project) => {

      return `
            <article class="project-card layout-normal card-interactive" data-project-id="${project.id}">
              <!-- Left Content Area -->
              <div class="project-left-area">
                  <!-- Icon and Title (Left side) -->
                  <div class="project-icon-section">
                    <div class="project-icon-badge">
                      <i data-lucide="${this.getIcon(project.id)}"></i>
                    </div>
                    <div class="project-main-info">
                      <h3 class="project-title">${project.title}</h3>
                      <p class="project-description">${project.description}</p>
                    </div>
                  </div>
              </div>

              <!-- Right Content Area -->
              <div class="project-right-area">
                  <!-- Technologies (Right side) -->
                  <div class="project-meta-section">
                    <div class="tech-section">
                      <h4>Technologies</h4>
                      <div class="tech-grid">
                        ${project.technologies.slice(0, 4).map(tech => `
                          <span class="tech-tag">${tech}</span>
                        `).join('')}
                      </div>
                    </div>
                  </div>
              </div>

              <!-- Bottom Action Area (Always same position) -->
              <div class="project-bottom-area">
                <!-- Key Results Section -->
                <div class="results-preview">
                  <h4><i data-lucide="trophy"></i> Key Results</h4>
                  <p>${project.outcome}</p>
                </div>

                <!-- Action Button (Always same position) -->
                <div class="project-action-static">
                  <button class="explore-btn">
                    <span>Explore Project</span>
                    <i data-lucide="arrow-right"></i>
                  </button>
                </div>
              </div>
            </article>
          `;
    }).join('')}
        </div>

        ${hasMoreProjects ? `
          <div class="projects-toggle-container" style="text-align: center; margin-top: 2rem;">
            <button id="toggle-projects-btn" class="btn-secondary" style="
              padding: 0.75rem 1.5rem;
              background: transparent;
              border: 1px solid var(--primary);
              color: var(--primary);
              border-radius: 2rem;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.2s ease;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            ">
              <span>${this.isExpanded ? 'Show Less' : 'Show More Projects'}</span>
              <i data-lucide="${this.isExpanded ? 'chevron-up' : 'chevron-down'}"></i>
            </button>
          </div>
        ` : ''}
      </div>
    `;

    this.setupClickHandlers();
    this.setupToggleHandler();
  }

  private setupToggleHandler(): void {
    const toggleBtn = document.getElementById('toggle-projects-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isExpanded = !this.isExpanded;
        this.renderSection();

        // If collapsing, scroll back to projects section top
        if (!this.isExpanded && this.container) {
          this.container.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  private setupClickHandlers(): void {
    if (!this.container) return;

    const cards = this.container.querySelectorAll('.project-card.card-interactive');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
          this.populateProjectModal(project);
          (window as any).openModal?.('project-modal');
        }
      });
    });

    // Re-initialize Lucide icons
    if ((window as any).lucide?.createIcons) {
      (window as any).lucide.createIcons();
    }
  }

  private populateProjectModal(project: Project): void {
    // Update modal title
    const titleElement = document.getElementById('project-modal-title');
    if (titleElement) {
      titleElement.textContent = project.title;
    }

    // Update modal content
    const contentElement = document.getElementById('project-modal-content');
    if (contentElement) {
      contentElement.innerHTML = this.generateProjectModalContent(project);
    }
  }

  private generateProjectModalContent(project: Project): string {
    return `
      <div class="modal-section">
        <h3>Project Overview</h3>
        <p>${project.description}</p>
      </div>

      <div class="modal-section">
        <h3>Technologies Used</h3>
        <div class="tech-grid" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${project.technologies.map(tech => `
            <span class="tech-tag">${tech}</span>
          `).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3>Key Highlights</h3>
        <ul>
          ${project.highlights.map(highlight => `
            <li>${highlight}</li>
          `).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h3>Outcome</h3>
        <p>${project.outcome}</p>
      </div>
    `;
  }

  private getIcon(projectId: string): string {
    const iconMap: Record<string, string> = {
      'sagemaker-anomaly-detection': 'brain',
      's3-cloudfront-pipeline': 'git-branch',
      'eks-deployment-monitoring': 'server',
      's3-presigned-url': 'shield',
      'on-premise-aws-migration': 'cloud',
      'ai-hr-analytics': 'message-square',
      'rekognition-face-management': 'camera',
      'venue-discovery-chatbot': 'bot',
      'default': 'folder'
    };

    return iconMap[projectId] || iconMap.default;
  }
}