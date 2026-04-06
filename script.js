// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 150, fill: "forwards" });
});

// Interactive elements hover effect for cursor
const iteractableElements = document.querySelectorAll('a, button, input, textarea');
iteractableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
    });
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressHeight = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progressHeight}%`;
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Typewriter Effect
const textArray = ["Full Stack Developer", "MERN Stack Enthusiast", "React Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

// Start typewriter when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    if(textArray.length) setTimeout(type, 1000);
    
    // Form submission prevent default for demo
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(45deg, #00ffcc, #00b386)';
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 3000);
        });
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const tl = gsap.timeline();

tl.from('.greeting-anim', { y: 20, opacity: 0, duration: 0.5, delay: 0.2 })
  .from('.name-anim', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from('.role-anim', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from('.tagline-anim', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from('.cta-anim', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from('.social-anim a', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.3");

// Element Animations on Scroll
const animateOnScroll = (selector, animationProps) => {
    gsap.utils.toArray(selector).forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            ...animationProps
        });
    });
};

// Apply animations to sections
animateOnScroll('.section-title', { y: 30, opacity: 0, duration: 0.8 });
animateOnScroll('.about-text', { x: 30, opacity: 0, duration: 0.8 });
animateOnScroll('.about-image', { x: -30, opacity: 0, duration: 0.8 });
