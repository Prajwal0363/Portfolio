// Visitor Counter
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    document.getElementById('visitorCount').textContent = count;
}

updateVisitorCount();

// Section Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
            // Trigger slide-in animations for new section
            triggerSlideAnimations(section);
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide header on scroll down
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) {
            document.querySelector('header').classList.add('scrolled');
        } else {
            document.querySelector('header').classList.remove('scrolled');
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;

        // Parallax effect for hero background
        if (sectionId === 'home') {
            const heroBackground = document.querySelector('.hero-background');
            heroBackground.style.setProperty('--scroll', currentScroll);
            heroBackground.classList.add('parallax');
        }
    });
}

// Trigger Slide-In Animations for Section Content
function triggerSlideAnimations(section) {
    const slideElements = section.querySelectorAll('.slide-in');
    slideElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('slid');
    });
}

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 4px #ef4444';
        } else {
            input.style.borderColor = '#003366';
            input.style.boxShadow = 'none';
        }
    });

    if (isValid) {
        alert('Thank you! Your message has been sent. I will get back to you soon.');
        form.reset();
    } else {
        alert('Please fill out all fields.');
    }
}

// Initialize Type.js Animation
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
            showSection(sectionId);
        });
    });

    new Typed('#typed-text', {
        strings: [
            'Hi, I am Prajwal.',
            'Passionate about AI Innovation',
            'Building Intelligent Solutions',
            'Exploring Deep Learning',
            'Collaborating with Tech Leaders'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    });
});