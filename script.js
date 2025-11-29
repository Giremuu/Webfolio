// Language Toggle Functionality
let currentLang = 'fr';

const langFrBtn = document.getElementById('langFr');
const langEnBtn = document.getElementById('langEn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const elementsToTranslate = document.querySelectorAll('[data-en][data-fr]');
const navLinks = document.querySelectorAll('.nav-menu a');

// Language toggle button click handlers
langFrBtn.addEventListener('click', () => {
    if (currentLang !== 'fr') {
        currentLang = 'fr';
        updateLanguage();
    }
});

langEnBtn.addEventListener('click', () => {
    if (currentLang !== 'en') {
        currentLang = 'en';
        updateLanguage();
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Update all translatable elements
function updateLanguage() {
    elementsToTranslate.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders
    const nameInput = document.getElementById('name');
    const namePlaceholder = nameInput.getAttribute(`data-${currentLang}-placeholder`);
    if (namePlaceholder) {
        nameInput.placeholder = namePlaceholder;
    }

    // Update active state on flag buttons
    if (currentLang === 'fr') {
        langFrBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langFrBtn.classList.remove('active');
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

// Contact form handler (placeholder for EmailJS integration)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Placeholder for EmailJS integration
    console.log('Form submitted:', { name, email, message });
    
    // Show success message (you can customize this)
    alert(currentLang === 'fr' 
        ? 'Message envoyé avec succès! (EmailJS à configurer)' 
        : 'Message sent successfully! (EmailJS to be configured)');
    
    // Reset form
    contactForm.reset();
});

// Smooth scroll to section with offset for fixed header
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
});