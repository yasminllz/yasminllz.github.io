// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Update toggle button text
        this.updateToggleButton();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            this.body.classList.add('dark-theme');
            this.body.classList.remove('light-theme');
        } else {
            this.body.classList.add('light-theme');
            this.body.classList.remove('dark-theme');
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        this.updateToggleButton();
        
        // Animate theme transition
        this.animateThemeTransition();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateToggleButton() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        const text = this.themeToggle.querySelector('span');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        } else {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }
    }

    animateThemeTransition() {
        // Add a subtle animation when switching themes
        this.body.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            this.body.style.transition = '';
        }, 300);
    }

    // Method to trigger theme-aware animations
    triggerThemeAnimation(element) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.4s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Add theme transition effects to main elements
    const mainElements = document.querySelectorAll('.card, .sidebar, .main-header');
    mainElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Export for use in other modules
window.ThemeManager = ThemeManager;