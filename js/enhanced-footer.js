/**
 * Enhanced Footer JavaScript - Handles animations and interactions
 */

class EnhancedFooter {
  constructor() {
    this.footer = null;
    this.isVisible = false;
    this.animationDelay = 100;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.footer = document.querySelector('.enhanced-footer');
      if (this.footer) {
        this.setupIntersectionObserver();
        this.setupSocialIconAnimations();
        this.setupRippleEffects();
        this.setupTooltips();
        this.setupAccessibility();
      }
    });
  }

  /**
   * Setup intersection observer for footer entrance animation
   */
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isVisible) {
          this.triggerEntranceAnimation();
          this.isVisible = true;
        }
      });
    }, options);

    observer.observe(this.footer);
  }

  /**
   * Trigger staggered entrance animation for footer sections
   */
  triggerEntranceAnimation() {
    const sections = this.footer.querySelectorAll('.footer-section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.animationPlayState = 'running';
        section.classList.add('animate-in');
      }, index * this.animationDelay);
    });
  }

  /**
   * Setup enhanced social media icon animations
   */
  setupSocialIconAnimations() {
    const socialLinks = this.footer.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
      // Add hover sound effect (optional)
      link.addEventListener('mouseenter', () => {
        this.createFloatingIcons(link);
        this.addHoverGlow(link);
      });

      link.addEventListener('mouseleave', () => {
        this.removeHoverGlow(link);
      });

      // Add click animation
      link.addEventListener('click', (e) => {
        this.createClickRipple(e, link);
      });
    });
  }

  /**
   * Create floating micro-animations on hover
   */
  createFloatingIcons(element) {
    const icon = element.querySelector('i');
    if (icon) {
      // Create floating particles effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.createFloatingParticle(element);
        }, i * 50);
      }
    }
  }

  /**
   * Create a floating particle effect
   */
  createFloatingParticle(parent) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      left: ${Math.random() * 20 + 15}px;
      top: ${Math.random() * 20 + 15}px;
      animation: floatUp 1s ease-out forwards;
    `;

    parent.style.position = 'relative';
    parent.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  }

  /**
   * Add glowing effect on hover
   */
  addHoverGlow(element) {
    element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3)';
    element.style.filter = 'brightness(1.1)';
  }

  /**
   * Remove glowing effect
   */
  removeHoverGlow(element) {
    element.style.boxShadow = '';
    element.style.filter = '';
  }

  /**
   * Setup ripple effects for interactive elements
   */
  setupRippleEffects() {
    const interactiveElements = this.footer.querySelectorAll('.footer-links a, .social-links a');
    
    interactiveElements.forEach(element => {
      element.addEventListener('click', (e) => {
        this.createRippleEffect(e, element);
      });
    });
  }

  /**
   * Create click ripple effect
   */
  createClickRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
      z-index: 1000;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Create general ripple effect
   */
  createRippleEffect(event, element) {
    if (!element.querySelector('.ripple')) {
      this.createClickRipple(event, element);
    }
  }

  /**
   * Setup tooltips for social media links
   */
  setupTooltips() {
    const socialLinks = this.footer.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
      const title = link.getAttribute('title');
      if (title) {
        this.createTooltip(link, title);
      }
    });
  }

  /**
   * Create custom tooltip
   */
  createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;
    `;

    element.style.position = 'relative';
    element.appendChild(tooltip);

    element.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Add ARIA labels
    const socialLinks = this.footer.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
      const title = link.getAttribute('title');
      if (title && !link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', title);
      }
    });

    // Add focus management
    this.setupFocusManagement();
    
    // Add keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Setup focus management for better accessibility
   */
  setupFocusManagement() {
    const focusableElements = this.footer.querySelectorAll('a, button, [tabindex="0"]');
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        element.style.outline = '2px solid #60a5fa';
        element.style.outlineOffset = '2px';
      });

      element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
      });
    });
  }

  /**
   * Setup keyboard navigation enhancements
   */
  setupKeyboardNavigation() {
    const links = this.footer.querySelectorAll('a');
    
    links.forEach(link => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.createClickRipple(e, link);
          
          // Trigger click after a short delay to show the ripple
          setTimeout(() => {
            link.click();
          }, 100);
        }
      });
    });
  }

  /**
   * Add dynamic animation styles to the document
   */
  addAnimationStyles() {
    if (!document.getElementById('footer-animations')) {
      const style = document.createElement('style');
      style.id = 'footer-animations';
      style.textContent = `
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
          }
        }

        @keyframes ripple {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        .footer-section.animate-in {
          animation: fadeInUp 0.6s ease forwards;
        }

        .floating-particle {
          animation: floatUp 1s ease-out forwards;
        }

        /* Enhanced hover states */
        .enhanced-footer .footer-links a:hover {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        }

        .enhanced-footer .social-links a:active {
          transform: translateY(-5px) scale(0.95);
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize performance monitoring
   */
  initPerformanceMonitoring() {
    // Monitor animation performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 16) { // More than one frame
            console.warn('Slow footer animation detected:', entry.name, entry.duration);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
  }
}

// Add CSS animations dynamically
const addFooterAnimationCSS = () => {
  if (!document.getElementById('enhanced-footer-animations')) {
    const style = document.createElement('style');
    style.id = 'enhanced-footer-animations';
    style.textContent = `
      @keyframes floatUp {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-30px) scale(0.5);
        }
      }

      @keyframes ripple {
        0% {
          opacity: 1;
          transform: scale(0);
        }
        100% {
          opacity: 0;
          transform: scale(2);
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    addFooterAnimationCSS();
    new EnhancedFooter();
  });
} else {
  addFooterAnimationCSS();
  new EnhancedFooter();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedFooter;
}