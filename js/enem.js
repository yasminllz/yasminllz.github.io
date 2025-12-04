// ENEM Page JavaScript
// TODO: conectar com backend quando disponível

class EnemManager {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAccordions();
        this.initializeFilters();
    }

    setupEventListeners() {
        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', (e) => {
                this.toggleAccordion(e.currentTarget.parentElement);
            });
        });

        // Filter functionality
        document.querySelectorAll('.tag-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterTemas(e.target.dataset.filter);
            });
        });

        // Download button simulation
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.simulateDownload(e.target.textContent.trim());
            });
        });

        // CTA buttons
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.trackCTAClick(e.target.href);
            });
        });
    }

    initializeAccordions() {
        // Close all accordions by default
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    toggleAccordion(accordionItem) {
        const isActive = accordionItem.classList.contains('active');
        
        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current accordion
        if (!isActive) {
            accordionItem.classList.add('active');
            this.animateAccordionOpen(accordionItem);
        }
    }

    animateAccordionOpen(accordionItem) {
        const content = accordionItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Reset max-height after animation
        setTimeout(() => {
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = 'none';
            }
        }, 300);
    }

    initializeFilters() {
        this.filterTemas('all');
    }

    filterTemas(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.tag-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Filter tema items
        document.querySelectorAll('.tema-item').forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                this.animateItemShow(item);
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Update results count
        this.updateFilterResults();
    }

    animateItemShow(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50);
    }

    updateFilterResults() {
        const visibleItems = document.querySelectorAll('.tema-item:not(.hidden)').length;
        console.log(`Mostrando ${visibleItems} temas para filtro: ${this.currentFilter}`);
    }

    simulateDownload(buttonText) {
        // Simulate file download
        const fileName = buttonText.includes('Prova') ? 'enem_prova.pdf' : 'enem_gabarito.pdf';
        
        // Show loading state
        const originalText = event.target.innerHTML;
        event.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Baixando...';
        event.target.style.pointerEvents = 'none';
        
        setTimeout(() => {
            // Reset button
            event.target.innerHTML = originalText;
            event.target.style.pointerEvents = 'auto';
            
            // Show success message
            this.showToast(`${fileName} baixado com sucesso!`, 'success');
            
            // Track download
            this.trackDownload(fileName);
        }, 2000);
    }

    trackCTAClick(href) {
        // Track CTA button clicks
        const page = href.split('/').pop().replace('.html', '');
        console.log(`Navegando para: ${page}`);
        
        // Store navigation intent
        localStorage.setItem('enem_last_cta', JSON.stringify({
            page: page,
            timestamp: new Date().toISOString(),
            source: 'enem_page'
        }));
    }

    trackDownload(fileName) {
        // Track download events
        const downloads = JSON.parse(localStorage.getItem('enem_downloads') || '[]');
        downloads.push({
            file: fileName,
            timestamp: new Date().toISOString(),
            page: 'enem'
        });
        
        // Keep only last 50 downloads
        if (downloads.length > 50) {
            downloads.splice(0, downloads.length - 50);
        }
        
        localStorage.setItem('enem_downloads', JSON.stringify(downloads));
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide toast
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Method to get user progress data
    getUserProgress() {
        return {
            downloads: JSON.parse(localStorage.getItem('enem_downloads') || '[]').length,
            lastVisit: localStorage.getItem('enem_last_visit'),
            favoriteTopics: JSON.parse(localStorage.getItem('enem_favorite_topics') || '[]'),
            completedSections: JSON.parse(localStorage.getItem('enem_completed_sections') || '[]')
        };
    }

    // Method to save user progress
    saveProgress(section) {
        const completed = JSON.parse(localStorage.getItem('enem_completed_sections') || '[]');
        if (!completed.includes(section)) {
            completed.push(section);
            localStorage.setItem('enem_completed_sections', JSON.stringify(completed));
        }
        
        localStorage.setItem('enem_last_visit', new Date().toISOString());
    }

    // Method to add topic to favorites
    toggleFavoriteTopic(topic) {
        const favorites = JSON.parse(localStorage.getItem('enem_favorite_topics') || '[]');
        const index = favorites.indexOf(topic);
        
        if (index > -1) {
            favorites.splice(index, 1);
            this.showToast(`${topic} removido dos favoritos`, 'info');
        } else {
            favorites.push(topic);
            this.showToast(`${topic} adicionado aos favoritos`, 'success');
        }
        
        localStorage.setItem('enem_favorite_topics', JSON.stringify(favorites));
        return favorites.includes(topic);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enemManager = new EnemManager();
    
    // Track page visit
    window.enemManager.saveProgress('enem_overview');
    
    // Add click tracking to tema items
    document.querySelectorAll('.tema-item').forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.querySelector('h5').textContent;
            console.log(`Interesse em tema: ${topic}`);
        });
    });
});

// Export for use in other modules
window.EnemManager = EnemManager;