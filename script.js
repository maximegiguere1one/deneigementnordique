// Smooth scroll animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initial fade-in for elements already in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements - Use requestAnimationFrame to avoid forced reflows
    const fadeElements = document.querySelectorAll('.fade-in');
    requestAnimationFrame(function() {
        fadeElements.forEach(el => {
            // Use IntersectionObserver for all elements to avoid getBoundingClientRect() calls
            observer.observe(el);
        });
    });

    // Stagger animation for grid items
    const staggerElements = document.querySelectorAll('.trust-item, .service-card, .work-card, .process-step, .testimonial-card');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Before/After Slider
    const beforeAfterBtns = document.querySelectorAll('.before-after-btn');
    const beforeAfterItems = document.querySelectorAll('.before-after-item');
    
    beforeAfterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and items
            beforeAfterBtns.forEach(b => b.classList.remove('active'));
            beforeAfterItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding image
            if (target === 'before') {
                document.querySelector('.before-after-item:first-child').classList.add('active');
            } else {
                document.querySelector('.before-after-item:last-child').classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links - Premium Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = 72;
                    const offsetTop = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Premium Navbar scroll effect - hide menu once le hero est dépassé
    function initNavbarHide() {
        const navbar = document.querySelector('.greenora-navbar-transparent');
        const heroSection = document.querySelector('.greenora-hero');

        if (!navbar || !heroSection) return;

        const hideNavbar = () => {
            navbar.classList.add('hidden-after-hero');
            navbar.classList.remove('scrolled');
        };

        const showNavbar = () => {
            navbar.classList.remove('hidden-after-hero');
            if ((window.pageYOffset || document.documentElement.scrollTop) > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        showNavbar();
                    } else {
                        hideNavbar();
                    }
                });
            },
            {
                root: null,
                threshold: 0,
                rootMargin: '0px 0px -20% 0px'
            }
        );

        observer.observe(heroSection);

        window.addEventListener(
            'scroll',
            () => {
                if (!navbar.classList.contains('hidden-after-hero')) {
                    showNavbar();
                }
            },
            { passive: true }
        );

        // Vérifie la position courante au cas où l'utilisateur recharge plus bas que le hero
        // Cache offsetHeight to avoid forced reflow
        const heroHeight = heroSection.offsetHeight || heroSection.getBoundingClientRect().height;
        if ((window.pageYOffset || document.documentElement.scrollTop) >= heroHeight) {
            hideNavbar();
        }
    }

    initNavbarHide();
    
    // Mobile Menu Toggle - Premium Navbar
    const mobileToggle = document.getElementById('nav-mobile-toggle');
    const mobileOverlay = document.getElementById('nav-mobile-overlay');
    const mobileClose = document.getElementById('nav-mobile-close');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Mobile Menu Toggle - Greenora Navbar
    const greenoraMobileToggle = document.getElementById('greenora-mobile-toggle');
    const greenoraNavMenu = document.querySelector('.greenora-nav-menu');
    
    if (greenoraMobileToggle && greenoraNavMenu) {
        greenoraMobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            greenoraNavMenu.classList.toggle('active');
            document.body.style.overflow = greenoraNavMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const greenoraNavLinks = document.querySelectorAll('.greenora-nav-link');
        greenoraNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                greenoraMobileToggle.classList.remove('active');
                greenoraNavMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Active nav link based on scroll
    const navLinks = document.querySelectorAll('.nav-menu-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Cache clientHeight to avoid forced reflow
            const sectionHeight = section.dataset.height || section.getBoundingClientRect().height;
            if (!section.dataset.height) section.dataset.height = sectionHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Form submission handler - Support both old and new forms
    const contactForms = document.querySelectorAll('#contact-form, .form-greenora');
    contactForms.forEach(contactForm => {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Envoi en cours...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.textContent = 'Message envoyé !';
                    submitButton.style.background = 'var(--color-secondary)';
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                }, 1000);
            });
        }
    });

    // Supprimer les hover effects JavaScript - CSS gère déjà avec restraint

    // Parallax System - Motion as Respiration: Très lent, presque imperceptible
    let ticking = false;
    
    // Parallax speeds - Silence as Luxury: Plus lents
    const PARALLAX_SPEEDS = {
        background: 0.05,  // Très lent
        midground: 0.15,   // Lent
        foreground: 0.3    // Subtile
    };
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Layer 1: Hero Video seulement (très subtil)
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo && scrolled < windowHeight * 1.5) {
            const rate = scrolled * PARALLAX_SPEEDS.background;
            heroVideo.style.transform = `translateY(${rate}px)`;
            // Pas de scale - Restraint
        }
        
        // Layer 2: Images seulement (très subtil) - Optimized to reduce reflows
        const images = document.querySelectorAll('.process-step-image, .why-choose-image');
        images.forEach(el => {
            // Cache rect to avoid multiple getBoundingClientRect calls
            const rect = el.dataset.rect ? JSON.parse(el.dataset.rect) : el.getBoundingClientRect();
            if (!el.dataset.rect) {
                el.dataset.rect = JSON.stringify({top: rect.top, height: rect.height});
            }
            const elementTop = rect.top + scrolled;
            const elementCenter = elementTop + rect.height / 2;
            const viewportCenter = scrolled + windowHeight / 2;
            const distance = viewportCenter - elementCenter;
            
            if (Math.abs(distance) < windowHeight * 2) {
                const rate = distance * PARALLAX_SPEEDS.midground;
                el.style.transform = `translateY(${rate}px)`;
            }
        });
        
        // Pas de parallax sur les cards - Restraint
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttle plus agressif - Performance is Part of Design
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScroll < 16) return; // ~60fps max
        lastScroll = now;
        requestTick();
    }, { passive: true });
    
    updateParallax(); // Initial call
    
    // Fade In Observer - Motion as Respiration: Plus lent, plus organique
    // Note: fadeElements already declared above, reuse existing observer
    // This section removed to avoid duplicate declaration
    
    // Carousel Animation - Greenora Style (Infinite Scroll)
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        // Dupliquer les slides pour boucle infinie
        const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            carouselTrack.appendChild(clone);
        });
    }
    
    // Stagger Animation for Grid Items - Greenora Style
    const gridItems = document.querySelectorAll('.services-grid-greenora .fade-in, .why-us-grid-greenora .fade-in, .works-grid-greenora .fade-in, .testimonials-grid-greenora .fade-in, .stats-grid-greenora .fade-in');
    gridItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Atmospheric Particles - Particules flottantes subtiles
    function createAtmosphericParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'atmospheric-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        hero.appendChild(particlesContainer);
        
        // Créer max 15 particules
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: drift-${i} ${Math.random() * 20 + 15}s infinite linear;
                filter: blur(${Math.random() * 2 + 1}px);
            `;
            
            // Créer animation CSS dynamique
            const style = document.createElement('style');
            style.textContent = `
                @keyframes drift-${i} {
                    0% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                        opacity: ${Math.random() * 0.5 + 0.2};
                    }
                    50% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                        opacity: ${Math.random() * 0.3 + 0.1};
                    }
                    100% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                        opacity: ${Math.random() * 0.5 + 0.2};
                    }
                }
            `;
            document.head.appendChild(style);
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createAtmosphericParticles();

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Cache clientHeight to avoid forced reflow
            const sectionHeight = section.dataset.height || section.getBoundingClientRect().height;
            if (!section.dataset.height) section.dataset.height = sectionHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call on load
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-secondary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = [
        {
            text: "Nous cherchions un service de déneigement manuel complet pour notre toit commercial, et les résultats ont dépassé nos attentes. L'équipe était professionnelle, ponctuelle et méticuleuse.",
            author: "Marie-Claire Dubois, Propriétaire",
            location: "Alma, Lac-Saint-Jean"
        },
        {
            text: "Équipe expérimentée et ponctuelle. Le déneigement manuel préserve nos surfaces et notre toiture. Nous avons un contrat saisonnier depuis 3 ans et nous sommes toujours satisfaits.",
            author: "Jean-Pierre Tremblay, Propriétaire",
            location: "Roberval, Lac-Saint-Jean"
        },
        {
            text: "Intervention manuelle rapide après chaque tempête. L'équipe est courtoise, le travail est soigné et méticuleux. On voit vraiment la différence avec le déneigement manuel professionnel !",
            author: "Sophie Martin, Propriétaire",
            location: "Dolbeau-Mistassini, Lac-Saint-Jean"
        },
        {
            text: "Excellent service d'attention aux détails et grande communication tout au long du projet. Nous recommandons fortement leurs services de déneigement manuel !",
            author: "Marc-André Gagnon, Propriétaire",
            location: "Saint-Félicien, Lac-Saint-Jean"
        }
    ];

    let activeIndex = 2; // Index par défaut (3ème témoignage)

    const testimonialWrapper = document.getElementById('testimonial-active');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialAuthor = document.getElementById('testimonial-author');
    const testimonialLocation = document.getElementById('testimonial-location');
    const avatarButtons = document.querySelectorAll('.testimonial-avatar-btn');

    if (!testimonialWrapper || !testimonialText || !testimonialAuthor || !testimonialLocation || avatarButtons.length === 0) {
        return; // Exit if elements don't exist
    }

    function updateTestimonial(index) {
        // Fade out
        testimonialWrapper.classList.add('fade-out');

        setTimeout(() => {
            // Update content
            testimonialText.textContent = testimonials[index].text;
            testimonialAuthor.textContent = testimonials[index].author;
            testimonialLocation.textContent = testimonials[index].location;

            // Update avatars
            avatarButtons.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Fade in
            testimonialWrapper.classList.remove('fade-out');
            testimonialWrapper.classList.add('fade-in');
        }, 150);
    }

    // Add click handlers to avatar buttons
    avatarButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index !== activeIndex) {
                activeIndex = index;
                updateTestimonial(activeIndex);
            }
        });
    });

    // Initialize
    updateTestimonial(activeIndex);
});

