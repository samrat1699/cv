// Auto-update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    initTheme();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
}




// Active Navigation Link (Handles both single-page scroll and multi-page)
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').split('#')[0]; // Get file name without #

        // If we are on the publications page, highlight the publications link
        if (currentUrl === 'publications.html' && linkHref === 'publications.html') {
            link.classList.add('active');
        }
        // If we are on the main page, use scroll spy to highlight sections
        else if (currentUrl === 'index.html' || currentUrl === '') {
            window.addEventListener('scroll', () => {
                let current = '';
                document.querySelectorAll('.section').forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href').includes('#' + current)) {
                        l.classList.add('active');
                    }
                });
            });
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.academic-card, .interest-card, .publication-item, .project-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Sidebar shadow on scroll
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.boxShadow = window.scrollY > 50 ? '4px 0 15px rgba(0,0,0,0.1)' : 'none';
    }
});