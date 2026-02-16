document.addEventListener('DOMContentLoaded', function() {
    // ===== Мобильное меню =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            if (mainNav) mainNav.classList.remove('active');
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    fadeElements.forEach(el => observer.observe(el));
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const isMobile = () => window.innerWidth <= 768;
    
    function updateParallax() {
        if (isMobile()) return;
        const scrolled = window.pageYOffset;
        parallaxLayers.forEach((layer, index) => {
            if (index === 2) return;
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed * 0.1);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateParallax();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const body = document.body;
        
        // Загружаем сохранённую тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            if (themeIcon) {
                if (isDark) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    document.querySelectorAll('.leaf').forEach(leaf => {
        const randomDelay = Math.random() * 20;
        leaf.style.animationDelay = `-${randomDelay}s`;
    });
});
