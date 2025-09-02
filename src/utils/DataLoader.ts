import { PortfolioData } from '@/types/portfolio';

export class DataLoader {
  private static cachedData: PortfolioData | null = null;

  /**
   * Load portfolio data (using ESM import for reliability in dev)
   */
  static async loadPortfolioData(): Promise<PortfolioData> {
    try {
      if (this.cachedData) return this.cachedData;
      const module = await import('@/data/portfolio.json');
      const data = (module as any).default as PortfolioData;
      this.cachedData = data;
      return data;
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      throw new Error('Failed to load portfolio data.');
    }
  }

  /**
   * Validate the structure of portfolio data
   */


  /**
   * Clear cached data (useful for development)
   */
  static clearCache(): void {
    this.cachedData = null;
  }

  /**
   * Get cached data without making a network request
   */
  static getCachedData(): PortfolioData | null {
    return this.cachedData;
  }

  /**
   * Format date strings for display
   */
  static formatDate(dateString: string): string {
    if (dateString.toLowerCase() === 'present') {
      return 'Present';
    }

    // Handle MM.YYYY format
    if (dateString.includes('.')) {
      const [month, year] = dateString.split('.');
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const monthIndex = parseInt(month) - 1;
      return `${monthNames[monthIndex]} ${year}`;
    }

    return dateString;
  }

  /**
   * Calculate duration between two dates
   */
  static calculateDuration(startDate: string, endDate: string): string {
    const start = this.parseDate(startDate);
    const end = endDate.toLowerCase() === 'present' ? new Date() : this.parseDate(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      
      let result = `${years} year${years !== 1 ? 's' : ''}`;
      if (remainingMonths > 0) {
        result += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      }
      return result;
    }
  }

  /**
   * Parse date string to Date object
   */
  private static parseDate(dateString: string): Date {
    if (dateString.includes('.')) {
      const [month, year] = dateString.split('.');
      return new Date(parseInt(year), parseInt(month) - 1);
    }
    return new Date(dateString);
  }

  /**
   * Get technology icon class name
   */
  static getTechIcon(technology: string): string {
    const iconMap: { [key: string]: string } = {
      'AWS': 'cloud',
      'Azure': 'cloud',
      'Docker': 'container',
      'Terraform': 'settings',
      'Git': 'git-branch',
      'Python': 'code',
      'Java': 'coffee',
      'JavaScript': 'code',
      'TypeScript': 'code',
      'HTML': 'code',
      'CSS': 'palette',
      'SQL': 'database',
      'C#': 'code'
    };

    return iconMap[technology] || 'tool';
  }
}
