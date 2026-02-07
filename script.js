/* ========================================
   ROSE DAY WEBSITE - JAVASCRIPT
   For Isha, From Vardhan 🌹
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initFallingPetals();
    initFloatingHearts();
    initScrollAnimations();
    initMusicToggle();
    initParallaxEffects();
});

/* ========================================
   LOADING SCREEN
   ======================================== */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    const mainContent = document.getElementById('main');

    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.style.opacity = '1';

        // Trigger entrance animations
        triggerEntranceAnimations();
    }, 2500);
}

function triggerEntranceAnimations() {
    // Add staggered animations to elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1.5s ease-out';
    }
}

/* ========================================
   FALLING PETALS
   ======================================== */
function initFallingPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalEmojis = ['🌹', '🌸', '💮', '🏵️', '❀'];

    function createPetal() {
        const petal = document.createElement('span');
        petal.className = 'petal-fall';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.3;

        petalsContainer.appendChild(petal);

        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, 10000);
    }

    // Create initial petals
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createPetal(), i * 300);
    }

    // Continuously create petals
    setInterval(createPetal, 500);
}

/* ========================================
   FLOATING HEARTS
   ======================================== */
function initFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💞', '💝'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }

    // Create hearts periodically
    setInterval(createHeart, 2000);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    // Add scroll-animate class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const children = section.querySelectorAll('.message-card, .shayari-card, .gallery-item, .promise-item, .final-content');
        children.forEach(child => {
            child.classList.add('scroll-animate');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add special animations for specific elements
                if (entry.target.classList.contains('message-card')) {
                    animateMessageCard(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

function animateMessageCard(card) {
    const rose = card.querySelector('.rose-3d');
    if (rose) {
        rose.style.animation = 'roseBloom 4s ease-in-out infinite';
    }
}

/* ========================================
   MUSIC TOGGLE (Placeholder)
   ======================================== */
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Set volume
    bgMusic.volume = 0.5;

    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        musicToggle.classList.toggle('playing', isPlaying);

        if (isPlaying) {
            bgMusic.play().then(() => {
                showToast('🎵 Playing romantic music... 💕');
            }).catch((err) => {
                console.log('Audio play failed:', err);
                showToast('🎵 Click again to play music 💕');
            });
        } else {
            bgMusic.pause();
            showToast('🎵 Music paused');
        }
    });
}

/* ========================================
   TOAST NOTIFICATIONS
   ======================================== */
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        background: rgba(231, 76, 60, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1rem;
        z-index: 10000;
        animation: toastIn 0.5s ease forwards;
        box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero parallax
        const heroGlow = document.querySelector('.hero-glow');
        if (heroGlow) {
            heroGlow.style.transform = `scale(${1 + scrolled * 0.001}) translateY(${scrolled * 0.3}px)`;
        }

        // Floating roses parallax
        const floatingRoses = document.querySelectorAll('.floating-rose');
        floatingRoses.forEach((rose, index) => {
            const speed = 0.1 + (index * 0.05);
            rose.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ========================================
   CURSOR SPARKLE EFFECT
   ======================================== */
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Only occasionally create sparkles
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        font-size: 1rem;
        z-index: 10000;
        animation: sparkleAway 1s ease forwards;
    `;

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAway {
        0% { opacity: 1; transform: translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); }
    }
`;
document.head.appendChild(sparkleStyle);

/* ========================================
   CONFETTI BURST ON CLICK
   ======================================== */
document.addEventListener('click', (e) => {
    // Only trigger on specific elements
    if (e.target.closest('.gallery-item') || e.target.closest('.big-rose')) {
        createConfettiBurst(e.clientX, e.clientY);
    }
});

function createConfettiBurst(x, y) {
    const confettiEmojis = ['🌹', '💕', '✨', '💖', '🌸', '💗'];
    const count = 15;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('span');
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];

        const angle = (i / count) * 360;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle * Math.PI / 180) * velocity;
        const ty = Math.sin(angle * Math.PI / 180) * velocity;

        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: ${0.8 + Math.random() * 0.8}rem;
            z-index: 10000;
            animation: confettiBurst 1s ease forwards;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiBurst {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1) rotate(0deg); 
        }
        100% { 
            opacity: 0; 
            transform: translate(var(--tx), var(--ty)) scale(0.5) rotate(360deg); 
        }
    }
`;
document.head.appendChild(confettiStyle);

/* ========================================
   TYPEWRITER EFFECT FOR MESSAGES
   ======================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ========================================
   INITIALIZE EVERYTHING
   ======================================== */
console.log('🌹 Happy Rose Day, Isha! 🌹');
console.log('💕 Made with love by Vardhan 💕');
