// Animation timing functions
const easing = {
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
};

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero__subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }

    // Start typing effect when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                type();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(subtitle);
}

// Smooth reveal for timeline items
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Skills progress animation
function initSkillsAnimation() {
    const skillsCategories = document.querySelectorAll('.skills__category');
    
    skillsCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Project cards stagger animation
function initProjectCardsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
}

// Smooth scroll with easing
function smoothScroll(target, duration = 1000) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easing.easeOutExpo(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Initialize all animations
function initAnimations() {
    initParallax();
    initTypingEffect();
    initTimelineAnimation();
    initSkillsAnimation();
    initProjectCardsAnimation();
}

// Run animations initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations); 