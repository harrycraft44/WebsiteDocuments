const panels = document.querySelectorAll(".panel")

panels.forEach(panel => {
    panel.addEventListener("click", () => {
        removeActiveClasses()
        panel.classList.add("active")
    })
})

function removeActiveClasses(){
    panels.forEach(panel => {
        panel.classList.remove("active")
    })
}

// Create floating particles for cool background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 800;
    const particleCount = isMobile ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
}

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Mouse trail effect for extra coolness (throttled for performance)
let lastTrailTime = 0;
const trailThrottleMs = 50; // Only create trail every 50ms

function createMouseTrail() {
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < trailThrottleMs) return;
        lastTrailTime = now;
        
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    });
}

// Initialize all cool effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add reveal class to elements for scroll animation
    const animateElements = document.querySelectorAll('.updatebox, .moviebox, .panel');
    animateElements.forEach(el => el.classList.add('reveal'));
    
    // Trigger initial reveal check
    revealOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Add CSS for mouse trail dynamically
const mouseTrailStyle = document.createElement('style');
mouseTrailStyle.textContent = `
    .mouse-trail {
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, var(--neon-cyan, #00ffff), var(--neon-pink, #ff00ff));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 0.5s ease-out forwards;
    }
    
    @keyframes trailFade {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseTrailStyle);