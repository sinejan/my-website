import { PortfolioApp } from './components/PortfolioApp';
// import './components/Project/style/main.css'; // Removed: file does not exist

// Initialize the portfolio application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize Lucide icons via global UMD script (loaded in index.html)
    (window as any).lucide?.createIcons?.();

    // Create and initialize the portfolio app
    const app = new PortfolioApp();
    await app.init();

    console.log('Portfolio application initialized successfully');
  } catch (error) {
    console.error('Error initializing portfolio application:', error);
  }
});

// Handle smooth scrolling for navigation links
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('a[href^="#"]')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    if (href) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
});

// Handle navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Handle mobile menu toggle
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('#nav-toggle') || target.closest('#nav-toggle')) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    }
  }
  
  // Close mobile menu when clicking on a nav link
  if (target.matches('.nav-link')) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
});

// Modal functionality - Define globally and immediately
function openModal(modalId: string) {
  console.log('Opening modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened successfully');
  } else {
    console.error('Modal not found:', modalId);
  }
}

function closeModal(modalId: string) {
  console.log('Closing modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    console.log('Modal closed successfully');
  }
}

// Attach to window immediately
(window as any).openModal = openModal;
(window as any).closeModal = closeModal;

// Also attach on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  (window as any).openModal = openModal;
  (window as any).closeModal = closeModal;
  console.log('Modal functions attached to window');
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('modal')) {
    target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Prevent overscroll bounce on iOS
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Add global modal functions to window
declare global {
  interface Window {
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
  }
}
