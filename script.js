// Smooth scroll animations on page load
// OPTIMIZED: Zero forced layouts - All READS batched before WRITES
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
            }
        });
    }, observerOptions);

    // Observe all fade-in elements - Use requestAnimationFrame to avoid forced reflows
    const fadeElements = document.querySelectorAll('.fade-in');
    requestAnimationFrame(function() {
        fadeElements.forEach(el => {
            observer.observe(el);
        });
    });

    // Stagger animation for grid items - Batch all WRITES
    const staggerElements = document.querySelectorAll('.trust-item, .service-card, .work-card, .process-step, .testimonial-card');
    // Batch all style writes together
    requestAnimationFrame(function() {
        staggerElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Before/After Slider - No layout reads needed
    const beforeAfterBtns = document.querySelectorAll('.before-after-btn');
    const beforeAfterItems = document.querySelectorAll('.before-after-item');
    
    beforeAfterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Batch all class writes together
            requestAnimationFrame(function() {
                beforeAfterBtns.forEach(b => b.classList.remove('active'));
                beforeAfterItems.forEach(item => item.classList.remove('active'));
                
                this.classList.add('active');
                
                if (target === 'before') {
                    document.querySelector('.before-after-item:first-child').classList.add('active');
                } else {
                    document.querySelector('.before-after-item:last-child').classList.add('active');
                }
            }.bind(this));
        });
    });

    // Smooth scroll for anchor links - OPTIMIZED: Batch READ then WRITE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // READ: Get all layout values first
                    const navbarHeight = 72; // Fixed value, no read needed
                    const targetRect = target.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const offsetTop = targetRect.top + scrollTop - navbarHeight;
                    
                    // WRITE: After all reads are done
                    requestAnimationFrame(function() {
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    });
                }
            }
        });
    });

    // Premium Navbar scroll effect - OPTIMIZED: IntersectionObserver only, no layout reads
    function initNavbarHide() {
        const navbar = document.querySelector('.greenora-navbar-transparent');
        const heroSection = document.querySelector('.greenora-hero');

        if (!navbar || !heroSection) return;

        // Cache scroll position to avoid repeated reads
        let cachedScrollTop = 0;
        let isScrolling = false;

        const hideNavbar = () => {
            requestAnimationFrame(function() {
                navbar.classList.add('hidden-after-hero');
                navbar.classList.remove('scrolled');
            });
        };

        const showNavbar = () => {
            requestAnimationFrame(function() {
                navbar.classList.remove('hidden-after-hero');
                // Use cached scroll value, no read here
                if (cachedScrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        };

        // Update cached scroll value on scroll (passive listener)
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(function() {
                    cachedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    isScrolling = false;
                });
            }
        }, { passive: true });

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

        // Initial check - READ once, cache result
        requestAnimationFrame(function() {
            cachedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroRect = heroSection.getBoundingClientRect();
            const heroBottom = heroRect.bottom + cachedScrollTop;
            
            if (cachedScrollTop >= heroBottom) {
                hideNavbar();
            }
        });
    }

    initNavbarHide();
    
    // Mobile Menu Toggle - Premium Navbar - No layout reads
    const mobileToggle = document.getElementById('nav-mobile-toggle');
    const mobileOverlay = document.getElementById('nav-mobile-overlay');
    const mobileClose = document.getElementById('nav-mobile-close');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            requestAnimationFrame(function() {
                this.classList.toggle('active');
                mobileOverlay.classList.toggle('active');
                document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
            }.bind(this));
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                requestAnimationFrame(function() {
                    mobileToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                requestAnimationFrame(function() {
                    mobileToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        });
        
        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                requestAnimationFrame(function() {
                    mobileToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        });
    }
    
    // Mobile Menu Toggle - Greenora Navbar - No layout reads
    const greenoraMobileToggle = document.getElementById('greenora-mobile-toggle');
    const greenoraNavMenu = document.querySelector('.greenora-nav-menu');
    
    if (greenoraMobileToggle && greenoraNavMenu) {
        greenoraMobileToggle.addEventListener('click', function() {
            requestAnimationFrame(function() {
                this.classList.toggle('active');
                greenoraNavMenu.classList.toggle('active');
                document.body.style.overflow = greenoraNavMenu.classList.contains('active') ? 'hidden' : '';
            }.bind(this));
        });
        
        // Close menu when clicking on a link
        const greenoraNavLinks = document.querySelectorAll('.greenora-nav-link');
        greenoraNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                requestAnimationFrame(function() {
                    greenoraMobileToggle.classList.remove('active');
                    greenoraNavMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        });
    }
    
    // Active nav link based on scroll - OPTIMIZED: Batch READS, then WRITES
    const navLinks = document.querySelectorAll('.nav-menu-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Cache section positions to avoid repeated reads
    let sectionPositions = [];
    let cachedScrollY = 0;
    let isUpdatingNav = false;

    function cacheSectionPositions() {
        // Batch all READS together
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        sectionPositions = Array.from(sections).map(section => {
            const rect = section.getBoundingClientRect();
            return {
                id: section.getAttribute('id'),
                top: rect.top + scrollTop,
                height: rect.height
            };
        });
    }

    function updateActiveNav() {
        if (isUpdatingNav) return;
        isUpdatingNav = true;

        // READ: Get scroll position once
        cachedScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Find current section using cached positions
        let current = '';
        sectionPositions.forEach(section => {
            if (cachedScrollY >= section.top - 150) {
                current = section.id;
            }
        });
        
        // WRITE: Batch all class changes
        requestAnimationFrame(function() {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
            isUpdatingNav = false;
        });
    }
    
    // Cache positions on load and resize
    cacheSectionPositions();
    window.addEventListener('resize', function() {
        requestAnimationFrame(cacheSectionPositions);
    }, { passive: true });
    
    // Throttled scroll listener
    let navUpdateTimeout;
    window.addEventListener('scroll', function() {
        if (navUpdateTimeout) return;
        navUpdateTimeout = requestAnimationFrame(function() {
            updateActiveNav();
            navUpdateTimeout = null;
        });
    }, { passive: true });
    
    updateActiveNav();

    // Form submission handler - No layout reads
    const contactForms = document.querySelectorAll('#contact-form, .form-greenora');
    contactForms.forEach(contactForm => {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Batch all writes
                requestAnimationFrame(function() {
                    submitButton.textContent = 'Envoi en cours...';
                    submitButton.disabled = true;
                });
                
                setTimeout(() => {
                    requestAnimationFrame(function() {
                        submitButton.textContent = 'Message envoyé !';
                        submitButton.style.background = 'var(--color-secondary)';
                        this.reset();
                    }.bind(this));
                    
                    setTimeout(() => {
                        requestAnimationFrame(function() {
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            submitButton.style.background = '';
                        });
                    }, 3000);
                }, 1000);
            });
        }
    });

    // Parallax System - OPTIMIZED: Zero forced layouts
    let ticking = false;
    let cachedWindowHeight = window.innerHeight;
    let cachedScrollY = 0;
    
    // Cache window height on resize
    window.addEventListener('resize', function() {
        requestAnimationFrame(function() {
            cachedWindowHeight = window.innerHeight;
        });
    }, { passive: true });
    
    // Parallax speeds
    const PARALLAX_SPEEDS = {
        background: 0.05,
        midground: 0.15,
        foreground: 0.3
    };
    
    // Cache element positions once
    let parallaxElements = [];
    function cacheParallaxElements() {
        const elements = document.querySelectorAll('.process-step-image, .why-choose-image');
        parallaxElements = Array.from(elements).map(el => {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                element: el,
                initialTop: rect.top + scrollTop,
                height: rect.height
            };
        });
    }
    
    function updateParallax() {
        // READ: Get scroll position once
        cachedScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate transforms for all elements
        const transforms = [];
        
        // Hero video
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo && cachedScrollY < cachedWindowHeight * 1.5) {
            const rate = cachedScrollY * PARALLAX_SPEEDS.background;
            transforms.push({
                element: heroVideo,
                transform: `translateY(${rate}px)`
            });
        }
        
        // Parallax images - Use cached positions
        parallaxElements.forEach(item => {
            const elementTop = item.initialTop;
            const elementCenter = elementTop + item.height / 2;
            const viewportCenter = cachedScrollY + cachedWindowHeight / 2;
            const distance = viewportCenter - elementCenter;
            
            if (Math.abs(distance) < cachedWindowHeight * 2) {
                const rate = distance * PARALLAX_SPEEDS.midground;
                transforms.push({
                    element: item.element,
                    transform: `translateY(${rate}px)`
                });
            }
        });
        
        // WRITE: Apply all transforms in one batch
        requestAnimationFrame(function() {
            transforms.forEach(item => {
                item.element.style.transform = item.transform;
            });
            ticking = false;
        });
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
            });
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    let lastScroll = 0;
    let parallaxTimeout;
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScroll < 16) return;
        lastScroll = now;
        if (parallaxTimeout) return;
        parallaxTimeout = requestAnimationFrame(function() {
            requestTick();
            parallaxTimeout = null;
        });
    }, { passive: true });
    
    // Cache elements and initial call
    cacheParallaxElements();
    updateParallax();
    
    // Re-cache on resize
    window.addEventListener('resize', function() {
        requestAnimationFrame(function() {
            cacheParallaxElements();
        });
    }, { passive: true });
    
    // Carousel Animation - Lazy load when visible
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
                    if (slides.length > 0 && !carouselTrack.dataset.initialized) {
                        // Batch all DOM writes
                        requestAnimationFrame(function() {
                            slides.forEach(slide => {
                                const clone = slide.cloneNode(true);
                                carouselTrack.appendChild(clone);
                            });
                            carouselTrack.dataset.initialized = 'true';
                        });
                        carouselObserver.disconnect();
                    }
                }
            });
        }, { rootMargin: '100px' });
        carouselObserver.observe(carouselTrack);
    }
    
    // Stagger Animation for Grid Items - Batch all writes
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            const gridItems = document.querySelectorAll('.services-grid-greenora .fade-in, .why-us-grid-greenora .fade-in, .works-grid-greenora .fade-in, .testimonials-grid-greenora .fade-in, .stats-grid-greenora .fade-in');
            requestAnimationFrame(function() {
                gridItems.forEach((item, index) => {
                    item.style.setProperty('--index', index);
                    item.style.animationDelay = `${index * 0.1}s`;
                });
            });
        });
    } else {
        setTimeout(function() {
            const gridItems = document.querySelectorAll('.services-grid-greenora .fade-in, .why-us-grid-greenora .fade-in, .works-grid-greenora .fade-in, .testimonials-grid-greenora .fade-in, .stats-grid-greenora .fade-in');
            requestAnimationFrame(function() {
                gridItems.forEach((item, index) => {
                    item.style.setProperty('--index', index);
                    item.style.animationDelay = `${index * 0.1}s`;
                });
            });
        }, 100);
    }
    
    // Atmospheric Particles - Lazy load on desktop only
    if (cachedWindowHeight > 768 && 'requestIdleCallback' in window) {
        requestIdleCallback(function() {
            function createAtmosphericParticles() {
                const hero = document.querySelector('.hero');
                if (!hero) return;
                
                const particlesContainer = document.createElement('div');
                particlesContainer.className = 'atmospheric-particles';
                particlesContainer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden';
                
                // Batch all DOM writes
                requestAnimationFrame(function() {
                    hero.appendChild(particlesContainer);
                    
                    for (let i = 0; i < 8; i++) {
                        const particle = document.createElement('div');
                        const size = Math.random() * 3 + 2;
                        particle.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(255,255,255,${Math.random() * 0.2 + 0.1});border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:drift-${i} ${Math.random() * 20 + 15}s infinite linear;filter:blur(1px);will-change:transform`;
                        
                        const style = document.createElement('style');
                        style.textContent = `@keyframes drift-${i}{0%{transform:translate(${Math.random() * 50 - 25}px,${Math.random() * 50 - 25}px);opacity:${Math.random() * 0.3 + 0.1}}100%{transform:translate(${Math.random() * 50 - 25}px,${Math.random() * 50 - 25}px);opacity:${Math.random() * 0.3 + 0.1}}}`;
                        document.head.appendChild(style);
                        particlesContainer.appendChild(particle);
                    }
                });
            }
            createAtmosphericParticles();
        }, { timeout: 2000 });
    }

    // Add active state to nav links based on scroll position - OPTIMIZED
    // (Duplicate function removed - using the optimized version above)
});

// Add CSS for active nav link - No layout reads
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

// Testimonials Carousel - No layout reads
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

    let activeIndex = 2;

    const testimonialWrapper = document.getElementById('testimonial-active');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialAuthor = document.getElementById('testimonial-author');
    const testimonialLocation = document.getElementById('testimonial-location');
    const avatarButtons = document.querySelectorAll('.testimonial-avatar-btn');

    if (!testimonialWrapper || !testimonialText || !testimonialAuthor || !testimonialLocation || avatarButtons.length === 0) {
        return;
    }

    function updateTestimonial(index) {
        // Batch all writes
        requestAnimationFrame(function() {
            testimonialWrapper.classList.add('fade-out');
        });

        setTimeout(() => {
            // Update content (text changes don't cause layout)
            testimonialText.textContent = testimonials[index].text;
            testimonialAuthor.textContent = testimonials[index].author;
            testimonialLocation.textContent = testimonials[index].location;

            // Batch all class writes
            requestAnimationFrame(function() {
                avatarButtons.forEach((btn, i) => {
                    if (i === index) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                testimonialWrapper.classList.remove('fade-out');
                testimonialWrapper.classList.add('fade-in');
            });
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
