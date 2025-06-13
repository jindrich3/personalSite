// DOM Elements
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
    if (navMenu.classList.contains('active') && !event.target.closest('.nav')) {
        toggleMobileMenu();
    }
}

// Smooth scroll to section
function scrollToSection(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - nav.offsetHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
function observeElements() {
    const animatedElements = document.querySelectorAll('.timeline__item, .skills__category, .project-card');
    animatedElements.forEach(element => observer.observe(element));
}

// Handle scroll events
function handleScroll() {
    // Add/remove nav background on scroll
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}

// Initialize
function init() {
    // Event Listeners
    navToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', handleClickOutside);
    navLinks.forEach(link => link.addEventListener('click', scrollToSection));
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations
    observeElements();
    
    // Set initial active nav link
    updateActiveNavLink();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 