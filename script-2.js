// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

// Initialize Intersection Observer for scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

// Callback function for when elements enter viewport
const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);

            // Optional: Stop observing after animation (performance optimization)
            observer.unobserve(entry.target);
        }
    });
};

// Create the observer instance
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySAll('.scroll-reveal');
    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

// ========================================
// SMOOTH NAVBAR BEHAVIOR
// ========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow to navbar when scrolled
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ========================================
// ANIMATED COUNTER FOR METRICS
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe metric cards and trigger counter animation
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueElement = entry.target.querySelector('.metric-value');
            if (valueElement && !valueElement.classList.contains('animated')) {
                const targetValue = parseInt(valueElement.dataset.value) || 
                                   parseInt(valueElement.textContent);
                valueElement.classList.add('animated');
                animateCounter(valueElement, targetValue);
            }
            metricObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        metricObserver.observe(card);
    });
});

// ========================================
// PARALLAX EFFECT FOR HERO SECTION
// ========================================

const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ========================================
// ENHANCED IMAGE LOADING
// ========================================

// Add fade-in effect for images when they load
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

// ========================================
// PROCESS CARD SEQUENTIAL ANIMATION
// ========================================

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.process-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
            processObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    const processGrids = document.querySelectorAll('.process-grid');
    processGrids.forEach(grid => {
        // Set initial state for cards
        const cards = grid.querySelectorAll('.process-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        processObserver.observe(grid);
    });
});

// ========================================
// BACK TO TOP BUTTON (Optional)
// ========================================

function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-4px)';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// Uncomment the line below to enable back-to-top button
// createBackToTop();

// ========================================
// MOBILE MENU TOGGLE (if needed in future)
// ========================================

function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', initMobileMenu);