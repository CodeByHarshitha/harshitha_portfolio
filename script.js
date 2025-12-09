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
});
