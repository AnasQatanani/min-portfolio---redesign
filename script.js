// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transition
    initPageTransition();
    
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize parallax effect
    initParallax();
});

// Page Transition
function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    
    // Show transition when leaving page
    document.querySelectorAll('a').forEach(link => {
        if (link.href !== '' && !link.href.includes('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                pageTransition.style.transform = 'scaleY(1)';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        }
    });
    
    // Hide transition on page load
    window.addEventListener('load', () => {
        pageTransition.style.transform = 'scaleY(0)';
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                entry.target.style.animationPlayState = 'running';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach((el, index) => {
        el.style.animationPlayState = 'paused';
        el.dataset.delay = index * 0.2;
        fadeObserver.observe(el);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Skickar...';
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Validate form
                if (!validateForm(data)) {
                    throw new Error('Vänligen fyll i alla fält korrekt.');
                }
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showNotification('Meddelandet har skickats!', 'success');
                form.reset();
                
            } catch (error) {
                showNotification(error.message, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name?.trim()) {
        showNotification('Vänligen ange ditt namn.', 'error');
        return false;
    }
    
    if (!data.email?.trim() || !emailRegex.test(data.email)) {
        showNotification('Vänligen ange en giltig e-postadress.', 'error');
        return false;
    }
    
    return true;
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.5s ease forwards;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#10B981';
    } else {
        notification.style.background = '#EF4444';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Navigation Functions
function navigateToProjects() {
    window.location.href = 'projects.html';
}

function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add animation keyframes to the document
const keyframes = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = keyframes;
document.head.appendChild(style);