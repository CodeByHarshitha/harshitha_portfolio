document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, .container'); // Observe sections and home container
    const navLinks = document.querySelectorAll('.sidebar a');

    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get id of current section
                const id = entry.target.getAttribute('id') || 'home'; // Default to home if no id (container)

                // Special case for home container which might not have an ID yet or reuse home link
                // If .container has no ID, let's assume it corresponds to the top or we might need to add id="home" to .container

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay/smoothness (handled by CSS transition largely, but JS sets position)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Hover Effect
    const interactables = document.querySelectorAll('a, button, .skill-card, .skill-browser, .contact-icon');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Scroll Reveal Animation
    const hiddenElements = document.querySelectorAll('.hidden');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Optional: remove class to re-animate when scrolling back up?
                // entry.target.classList.remove('show'); 
            }
        });
    });

    // We need to add 'hidden' class to elements we want to animate first
    // This script runs after DOM loaded, but style defaults might be needed.
    // Ideally add 'hidden' in HTML, but we can do it here dynamically or update HTML.
    // Let's rely on adding .hidden in HTML for control.

    // For now, let's select key elements and add observer
    const animatable = document.querySelectorAll('.section-title, .browser-window, .timeline-item, .skill-browser, .contact-icon');
    animatable.forEach(el => {
        el.classList.add('hidden'); // Initialize as hidden
        scrollObserver.observe(el);
    });

    // Letter-by-Letter Typing Animation for About Section
    const aboutParagraphs = document.querySelectorAll('.window-content p');
    const originalTexts = [];

    // Store original text and clear content initially
    aboutParagraphs.forEach(p => {
        originalTexts.push(p.innerText);
        p.innerText = '';
        p.style.borderRight = '2px solid #333'; // Typing cursor
        p.style.display = 'inline-block'; // Needed for cursor to sit next to text
        p.style.width = '100%'; // Ensure it takes full width
        p.style.borderRight = 'none'; // Remove cursor initially
    });

    const typeWriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriterObserver.unobserve(entry.target);
                typeSequence(0);
            }
        });
    }, { threshold: 0.3 });

    // Observe the About section to start animation
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        typeWriterObserver.observe(aboutSection);
    }

    function typeSequence(pIndex) {
        if (pIndex >= aboutParagraphs.length) return;

        const p = aboutParagraphs[pIndex];
        const text = originalTexts[pIndex];
        let charIndex = 0;

        // Add blink cursor style
        p.style.borderRight = '3px solid #FBC02D';
        p.style.paddingRight = '5px';

        function typeChar() {
            if (charIndex < text.length) {
                p.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 15); // Fast typing speed (15ms)
            } else {
                p.style.borderRight = 'none'; // Remove cursor when done
                p.style.paddingRight = '0';
                setTimeout(() => typeSequence(pIndex + 1), 200); // Small pause before next paragraph
            }
        }

        typeChar();
    }

    // Falling Icons Animation for Skills Section
    const fallingIconsContainer = document.querySelector('.falling-icons');
    if (fallingIconsContainer) {
        const icons = [
            'fa-code', 'fa-laptop-code', 'fa-terminal', 'fa-microchip',
            'fa-network-wired', 'fa-database', 'fa-server', 'fa-mobile-alt',
            'fa-bug', 'fa-project-diagram', 'fa-cogs', 'fa-code-branch'
        ];

        // Create 50 falling icons for global coverage
        for (let i = 0; i < 50; i++) {
            const icon = document.createElement('i');
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];

            icon.classList.add('fas', randomIcon, 'falling-icon');

            // Randomize properties
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 5; // 5s to 15s
            const delay = Math.random() * 10; // 0s to 10s delay
            const size = Math.random() * 30 + 10; // 10px to 40px

            icon.style.left = `${left}%`;
            icon.style.animationDuration = `${duration}s`;
            icon.style.animationDelay = `${delay}s`;
            icon.style.fontSize = `${size}px`;

            fallingIconsContainer.appendChild(icon);
        }
    }
});
