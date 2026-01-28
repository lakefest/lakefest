document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            mainNav.classList.remove('active');
            
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
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0) translateZ(0)";
            }
        });
    };
    
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    const missionCards = document.querySelectorAll('.mission-card');
    const teamMembers = document.querySelectorAll('.team-member');
    const contactCards = document.querySelectorAll('.contact-card');
    
    const handleParallax = function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((layer, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed * 0.1);
            layer.style.transform = `translateZ(-${index+1}px) scale(${index+2}) translateY(${yPos}px)`;
        });
        
        missionCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight && cardTop > -300) {
                const speed = 0.05;
                const yPos = (windowHeight - cardTop) * speed;
                card.style.transform = `translateY(${-yPos}px) translateZ(${yPos/10}px) rotateY(${yPos/100}deg)`;
            }
        });
        
        teamMembers.forEach((member, index) => {
            const memberTop = member.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (memberTop < windowHeight && memberTop > -300) {
                const speed = 0.03;
                const yPos = (windowHeight - memberTop) * speed;
                member.style.transform = `translateY(${-yPos}px) translateZ(${yPos/15}px)`;
            }
        });
        
        contactCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight && cardTop > -300) {
                const speed = 0.04;
                const yPos = (windowHeight - cardTop) * speed;
                card.style.transform = `translateY(${-yPos}px) translateZ(${yPos/12}px)`;
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        fadeInOnScroll();
        handleParallax();
    });
    
    fadeInOnScroll();
    handleParallax();
    
    fadeElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px) translateZ(0)";
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
    
    document.querySelectorAll('.leaf').forEach(leaf => {
        const randomDelay = Math.random() * 20;
        leaf.style.animationDelay = `-${randomDelay}s`;
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-8px) translateZ(15px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = `translateY(0) translateZ(0) scale(1)`;
        });
    });
});