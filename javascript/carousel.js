// Carousel Management
class CarouselManager {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        // Get carousel elements
        this.carousel = document.querySelector('.carousel-container');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (!this.carousel || this.slides.length === 0) return;
        
        // Add click listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
        
        // Add swipe support for mobile
        this.addSwipeSupport();
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Trigger animation
        this.animateSlideTransition();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    animateSlideTransition() {
        const activeSlide = this.slides[this.currentSlide];
        const slideContent = activeSlide.querySelector('.slide-content');
        
        if (slideContent) {
            // Reset animation
            slideContent.style.animation = 'none';
            slideContent.offsetHeight; // Trigger reflow
            slideContent.style.animation = 'fadeIn 0.8s ease-out';
        }
        
        // Animate indicators
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.style.transform = 'scale(1.2)';
                indicator.style.background = 'white';
            } else {
                indicator.style.transform = 'scale(1)';
                indicator.style.background = 'rgba(255, 255, 255, 0.4)';
            }
        });
    }

    addSwipeSupport() {
        let startX = null;
        let startY = null;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.previousSlide(); // Swipe right - previous slide
                }
            }
            
            startX = null;
            startY = null;
        });
    }

    // Method to add new slides dynamically
    addSlide(slideData) {
        const slideElement = document.createElement('div');
        slideElement.className = 'carousel-slide';
        slideElement.innerHTML = `
            <div class="slide-content">
                <div class="slide-image">
                    <img src="${slideData.image}" alt="${slideData.alt}">
                </div>
                <div class="slide-text">
                    <h2>${slideData.title}</h2>
                    <h1>${slideData.subtitle}</h1>
                    <h2>${slideData.description}</h2>
                    <button class="cta-button">${slideData.buttonText}</button>
                </div>
            </div>
        `;
        
        this.carousel.appendChild(slideElement);
        this.slides = document.querySelectorAll('.carousel-slide');
        
        // Add new indicator
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => {
            this.goToSlide(this.slides.length - 1);
        });
        
        document.querySelector('.carousel-indicators').appendChild(indicator);
        this.indicators = document.querySelectorAll('.indicator');
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.carouselManager = new CarouselManager();
});

// Export for use in other modules
window.CarouselManager = CarouselManager;