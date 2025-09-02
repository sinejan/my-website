type ProjectCard = {
  id: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  modalId?: string;
};

export class ProjectsSection {
  private container: HTMLElement | null = null;

  constructor() {
    this.container = document.querySelector('.overview-section');
  }

  async init(): Promise<void> {
    console.log('ProjectsSection init called');
    if (!this.container) {
      console.error('Container .overview-section not found');
      return;
    }
    console.log('Container found:', this.container);
    try {
      const projects = await this.loadProjects();
      console.log('Loaded projects:', projects);

      // If no projects found, hide the entire section
      if (projects.length === 0) {
        console.log('No projects found, hiding section');
        this.container.style.display = 'none';
        return;
      }

      // Show section and render projects
      this.container.style.display = 'block';
      await this.renderSection(projects);
    } catch (e) {
      console.error('Failed to load projects:', e);
      // Hide section on error as well
      this.container.style.display = 'none';
    }
  }

  // Load projects from folder src/data/projects dynamically
  private async loadProjects(): Promise<ProjectCard[]> {
    console.log('Loading projects...');

    try {
      // Auto-detect all project files by trying sequential numbers
      const projects: ProjectCard[] = [];
      let projectIndex = 1;

      while (true) {
        try {
          const fileName = `${projectIndex}.json`;
          const response = await fetch(`/data/projects/${fileName}`);

          if (!response.ok) {
            // If we can't fetch this file, assume we've reached the end
            if (projectIndex === 1) {
              console.log('No projects found in the projects folder');
            } else {
              console.log(`No more projects found after ${projectIndex - 1} projects`);
            }
            break;
          }

          const projectData = await response.json();

          projects.push({
            id: `project-${projectData.id || projectIndex}`,
            title: projectData.project_name || 'Untitled Project',
            subtitle: projectData.description || 'No description available',
            actionText: 'Explore Project',
            modalId: 'project-modal'
          });

          console.log(`Loaded project ${projectIndex}: ${projectData.project_name}`);
          projectIndex++;
        } catch (error) {
          console.warn(`Failed to load project ${projectIndex}:`, error);
          break;
        }
      }

      console.log(`Total projects loaded: ${projects.length}`);
      return projects;
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  private async renderSection(projects: ProjectCard[]): Promise<void> {
    if (!this.container) return;

    // Load full project data for card display
    const projectsWithData = await Promise.all(
      projects.map(async (project, index) => {
        try {
          const response = await fetch(`/data/projects/${index + 1}.json`);
          const data = await response.json();
          return { ...project, data };
        } catch (error) {
          console.warn(`Failed to load data for project ${index + 1}:`, error);
          return { ...project, data: null };
        }
      })
    );

    this.container.innerHTML = `
      <div class="container">
        <h2 class="section-title">Projects</h2>
        <div class="projects-showcase">
          ${projectsWithData.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return `
            <article class="project-card ${isEven ? 'layout-normal' : 'layout-mirrored'} card-interactive" data-project-index="${idx}">
              <!-- Left Content Area -->
              <div class="project-left-area">
                ${isEven ? `
                  <!-- Icon and Title (Left side for odd cards) -->
                  <div class="project-icon-section">
                    <div class="project-icon-badge">
                      <i data-lucide="${this.getIcon(p.id)}"></i>
                    </div>
                    <div class="project-main-info">
                      <h3 class="project-title">${p.title}</h3>
                      <p class="project-description">${p.subtitle || ''}</p>
                    </div>
                  </div>
                ` : `
                  <!-- Meta Info (Right side content for even cards) -->
                  <div class="project-meta-section">
                    ${p.data ? `
                      <div class="meta-grid">
                        <div class="meta-item">
                          <span class="meta-label">Year</span>
                          <span class="meta-value">${p.data.year || 'N/A'}</span>
                        </div>
                        <div class="meta-item">
                          <span class="meta-label">Duration</span>
                          <span class="meta-value">${p.data.duration || 'N/A'} months</span>
                        </div>
                        <div class="meta-item">
                          <span class="meta-label">Type</span>
                          <span class="meta-value">${p.data.project_type || 'N/A'}</span>
                        </div>
                      </div>
                    ` : ''}

                    <!-- Technologies -->
                    ${p.data && p.data.technologies_used ? `
                      <div class="tech-section">
                        <h4>Technologies</h4>
                        <div class="tech-grid">
                          ${p.data.technologies_used.slice(0, 4).map((tech: any) => `
                            <span class="tech-tag">${tech.name}</span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `}
              </div>

              <!-- Right Content Area -->
              <div class="project-right-area">
                ${!isEven ? `
                  <!-- Icon and Title (Right side for even cards) -->
                  <div class="project-icon-section">
                    <div class="project-icon-badge">
                      <i data-lucide="${this.getIcon(p.id)}"></i>
                    </div>
                    <div class="project-main-info">
                      <h3 class="project-title">${p.title}</h3>
                      <p class="project-description">${p.subtitle || ''}</p>
                    </div>
                  </div>
                ` : `
                  <!-- Meta Info (Left side content for odd cards) -->
                  <div class="project-meta-section">
                    ${p.data ? `
                      <div class="meta-grid">
                        <div class="meta-item">
                          <span class="meta-label">Year</span>
                          <span class="meta-value">${p.data.year || 'N/A'}</span>
                        </div>
                        <div class="meta-item">
                          <span class="meta-label">Duration</span>
                          <span class="meta-value">${p.data.duration || 'N/A'} months</span>
                        </div>
                        <div class="meta-item">
                          <span class="meta-label">Type</span>
                          <span class="meta-value">${p.data.project_type || 'N/A'}</span>
                        </div>
                      </div>
                    ` : ''}

                    <!-- Technologies -->
                    ${p.data && p.data.technologies_used ? `
                      <div class="tech-section">
                        <h4>Technologies</h4>
                        <div class="tech-grid">
                          ${p.data.technologies_used.slice(0, 4).map((tech: any) => `
                            <span class="tech-tag">${tech.name}</span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `}
              </div>

              <!-- Bottom Action Area (Always same position) -->
              <div class="project-bottom-area">
                <!-- Key Results Section -->
                ${p.data && p.data.achievement_log ? `
                  <div class="results-preview">
                    <h4><i data-lucide="trophy"></i> Key Results</h4>
                    <p>${this.convertBoldText(p.data.achievement_log).substring(0, 150)}...</p>
                  </div>
                ` : ''}

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
      </div>
    `;

    // Setup click handlers
    this.setupClickHandlers(projects);
  }

  private setupClickHandlers(projects: ProjectCard[]): void {
    if (!this.container) return;

    const cards = this.container.querySelectorAll('.overview-card.card-interactive');
    cards.forEach((card, index) => {
      card.addEventListener('click', async () => {
        const project = projects[index];
        if (project && project.modalId) {
          // Load the full project data and populate modal
          await this.populateProjectModal(index + 1); // project IDs are 1-based
          (window as any).openModal?.(project.modalId);
        }
      });
    });

    // Re-initialize Lucide icons
    if ((window as any).lucide?.createIcons) {
      (window as any).lucide.createIcons();
    }
  }

  private async populateProjectModal(projectId: number): Promise<void> {
    try {
      // Fetch the project data
      const response = await fetch(`/data/projects/${projectId}.json`);
      if (!response.ok) {
        console.error(`Failed to fetch project ${projectId}`);
        return;
      }

      const projectData = await response.json();

      // Update modal title
      const titleElement = document.getElementById('project-modal-title');
      if (titleElement) {
        titleElement.textContent = projectData.project_name || 'Project Details';
      }

      // Update modal content
      const contentElement = document.getElementById('project-modal-content');
      if (contentElement) {
        contentElement.innerHTML = this.generateProjectModalContent(projectData);
      }
    } catch (error) {
      console.error('Error loading project data:', error);
    }
  }

  private generateProjectModalContent(project: any): string {
    return `
      <div class="modal-section">
        <h3>Project Overview</h3>
        <p><strong>Description:</strong> ${project.description || 'No description available'}</p>
        <p><strong>Year:</strong> ${project.year || 'N/A'}</p>
        <p><strong>Duration:</strong> ${project.duration || 'N/A'} months</p>
        <p><strong>Type:</strong> ${project.project_type || 'N/A'}</p>
      </div>

      ${project.technologies_used && project.technologies_used.length > 0 ? `
        <div class="modal-section">
          <h3>Technologies Used</h3>
          <ul>
            ${project.technologies_used.map((tech: any) => `
              <li><strong>${tech.name}:</strong> ${tech.description}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      ${project.infrastructure && project.infrastructure.length > 0 ? `
        <div class="modal-section">
          <h3>Infrastructure & Implementation</h3>
          ${project.infrastructure.map((infra: any) => `
            <div class="experience-item">
              <h4>${infra.name}</h4>
              <p>${infra.description}</p>
              ${infra.steps && infra.steps.length > 0 ? `
                <ul>
                  ${infra.steps.map((step: string) => `<li>${step}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${project.skills_required && project.skills_required.length > 0 ? `
        <div class="modal-section">
          <h3>Skills Required</h3>
          <ul>
            ${project.skills_required.map((skill: any) => `
              <li><strong>${skill.name}:</strong> ${skill.description}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      ${project.achievement_log ? `
        <div class="modal-section">
          <h3>Achievements & Results</h3>
          <p>${this.convertBoldText(project.achievement_log)}</p>
        </div>
      ` : ''}
    `;
  }

  private convertBoldText(text: string): string {
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }



  private getIcon(projectId: string): string {
    const iconMap: Record<string, string> = {
      'cloud': 'cloud',
      'web': 'globe',
      'mobile': 'smartphone',
      'data': 'database',
      'ai': 'brain',
      'devops': 'settings',
      'default': 'folder'
    };

    return iconMap[projectId] || iconMap.default;
  }
}