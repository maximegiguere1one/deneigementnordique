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

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        // Si l'élément est déjà dans le viewport, ajouter visible immédiatement
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
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

    // Premium Navbar scroll effect - Fixed in hero, hidden after hero
    // SOLUTION RADICALE: Utiliser IntersectionObserver pour détecter la fin du hero
    function initNavbarHide() {
        console.log('[DEBUG] ===== initNavbarHide called =====');
        console.log('[DEBUG] Document readyState:', document.readyState);
        
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:83',message:'initNavbarHide called',data:{readyState:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        const navbar = document.querySelector('.greenora-navbar-transparent');
        const heroEndMarker = document.querySelector('.hero-end-marker');
        const heroSection = document.querySelector('.greenora-hero');
        
        console.log('[DEBUG] Elements found:', {
            navbar: !!navbar,
            heroEndMarker: !!heroEndMarker,
            heroSection: !!heroSection,
            navbarElement: navbar,
            markerElement: heroEndMarker,
            heroElement: heroSection
        });
        
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:90',message:'Elements found',data:{navbarFound:!!navbar,heroEndMarkerFound:!!heroEndMarker,heroSectionFound:!!heroSection},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        if (!navbar) {
            console.error('[DEBUG] Navbar not found!');
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:93',message:'Navbar not found - early return',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            return;
        }
        
        if (!heroSection) {
            console.error('[DEBUG] Hero section not found!');
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:99',message:'Hero section not found - early return',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            return;
        }
        
        if (!heroEndMarker) {
            console.error('[DEBUG] Hero end marker not found!');
        }
        
        // Make navbar fixed initially (in hero)
        navbar.classList.add('fixed');
        
        // Function to hide navbar completely
        function hideNavbar() {
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:108',message:'hideNavbar called',data:{navbarDisplay:getComputedStyle(navbar).display,navbarVisibility:getComputedStyle(navbar).visibility},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
            // #endregion
            
            navbar.classList.add('hidden-after-hero');
            navbar.classList.remove('scrolled');
            
            // Force hide with inline styles - CRITICAL
            navbar.style.setProperty('display', 'none', 'important');
            navbar.style.setProperty('visibility', 'hidden', 'important');
            navbar.style.setProperty('opacity', '0', 'important');
            navbar.style.setProperty('pointer-events', 'none', 'important');
            navbar.style.setProperty('height', '0', 'important');
            navbar.style.setProperty('overflow', 'hidden', 'important');
            navbar.style.setProperty('position', 'fixed', 'important');
            navbar.style.setProperty('top', '-1000px', 'important');
            navbar.style.setProperty('z-index', '-9999', 'important');
            
            // #region agent log
            const afterStyles = {display:navbar.style.display,visibility:navbar.style.visibility,opacity:navbar.style.opacity,computedDisplay:getComputedStyle(navbar).display,computedVisibility:getComputedStyle(navbar).visibility};
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:125',message:'After setting navbar styles',data:afterStyles,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            // Hide ALL children
            const allChildren = navbar.querySelectorAll('*');
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:130',message:'Hiding children',data:{childrenCount:allChildren.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            allChildren.forEach(function(el, idx) {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('opacity', '0', 'important');
                el.style.setProperty('pointer-events', 'none', 'important');
                el.style.setProperty('height', '0', 'important');
                el.style.setProperty('width', '0', 'important');
                el.style.setProperty('font-size', '0', 'important');
                el.style.setProperty('line-height', '0', 'important');
                
                // #region agent log
                if (idx < 5) { // Log first 5 children only
                    fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:143',message:'Child hidden',data:{index:idx,tagName:el.tagName,className:el.className,computedDisplay:getComputedStyle(el).display},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
                }
                // #endregion
            });
        }
        
        // Function to show navbar
        function showNavbar() {
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:150',message:'showNavbar called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
            // #endregion
            
            navbar.classList.remove('hidden-after-hero');
            
            // Remove all inline styles
            navbar.style.cssText = '';
            const allChildren = navbar.querySelectorAll('*');
            allChildren.forEach(function(el) {
                el.style.cssText = '';
            });
            
            // Add scrolled class if needed
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Method 1: Use IntersectionObserver on hero end marker (most reliable)
        if (heroEndMarker) {
            const markerRect = heroEndMarker.getBoundingClientRect();
            console.log('[DEBUG] Setting up IntersectionObserver on marker:', {
                markerRect: markerRect,
                markerParent: heroEndMarker.parentElement?.className,
                markerStyles: window.getComputedStyle(heroEndMarker)
            });
            
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:170',message:'Setting up IntersectionObserver',data:{markerRect:markerRect},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    console.log('[DEBUG] IntersectionObserver callback:', {
                        isIntersecting: entry.isIntersecting,
                        intersectionRatio: entry.intersectionRatio,
                        boundingClientRect: entry.boundingClientRect,
                        rootBounds: entry.rootBounds
                    });
                    
                    // #region agent log
                    fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:175',message:'IntersectionObserver callback',data:{isIntersecting:entry.isIntersecting,intersectionRatio:entry.intersectionRatio,boundingClientRect:entry.boundingClientRect},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
                    // #endregion
                    
                    // If marker is NOT intersecting (out of viewport), hide navbar
                    if (!entry.isIntersecting) {
                        console.log('[DEBUG] Marker NOT intersecting - hiding navbar');
                        // #region agent log
                        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:179',message:'Marker not intersecting - calling hideNavbar',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
                        // #endregion
                        hideNavbar();
                    } else {
                        console.log('[DEBUG] Marker intersecting - showing navbar');
                        // #region agent log
                        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:183',message:'Marker intersecting - calling showNavbar',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
                        // #endregion
                        showNavbar();
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: [0, 0.1, 0.5, 1.0] // Multiple thresholds for better detection
            });
            
            observer.observe(heroEndMarker);
            console.log('[DEBUG] IntersectionObserver started observing heroEndMarker');
        } else {
            console.error('[DEBUG] Hero end marker not found - IntersectionObserver not set up');
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:195',message:'Hero end marker not found',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
        }
        
        // Method 2: Fallback scroll detection
        function checkScrollPosition() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
            const heroRect = heroSection.getBoundingClientRect();
            const heroBottom = heroRect.bottom;
            const shouldHide = heroBottom <= 0;
            
            console.log('[DEBUG] checkScrollPosition:', {
                currentScroll: currentScroll,
                heroBottom: heroBottom,
                shouldHide: shouldHide,
                heroTop: heroRect.top,
                heroHeight: heroRect.height
            });
            
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:203',message:'checkScrollPosition called',data:{currentScroll:currentScroll,heroBottom:heroBottom,shouldHide:shouldHide},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            
            // If hero bottom is above viewport top, hide navbar
            if (shouldHide) {
                console.log('[DEBUG] Hiding navbar because heroBottom <= 0');
                // #region agent log
                fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:208',message:'Hero bottom <= 0 - calling hideNavbar',data:{heroBottom:heroBottom},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
                hideNavbar();
            } else {
                console.log('[DEBUG] Showing navbar because heroBottom > 0');
                // #region agent log
                fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:211',message:'Hero bottom > 0 - calling showNavbar',data:{heroBottom:heroBottom},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
                showNavbar();
            }
        }
        
        // Throttled scroll handler
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    checkScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Check immediately
        setTimeout(function() {
            checkScrollPosition();
        }, 100);
        
        // Check on resize
        window.addEventListener('resize', checkScrollPosition, { passive: true });
        
        // Safety net: check every 50ms
        setInterval(checkScrollPosition, 50);
    }
    
    // Execute immediately
    if (document.readyState === 'loading') {
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:238',message:'DOM loading - adding DOMContentLoaded listener',data:{readyState:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        document.addEventListener('DOMContentLoaded', initNavbarHide);
    } else {
        // DOM already loaded, run immediately
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/2c0c6ec6-14e5-488c-98bd-e562b1da3bca',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:243',message:'DOM ready - calling initNavbarHide immediately',data:{readyState:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        setTimeout(initNavbarHide, 0);
    }
    
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
            const sectionHeight = section.clientHeight;
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
        
        // Layer 2: Images seulement (très subtil)
        const images = document.querySelectorAll('.process-step-image, .why-choose-image');
        images.forEach(el => {
            const rect = el.getBoundingClientRect();
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
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ne pas retirer - Silence as Luxury
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        // Si l'élément est déjà dans le viewport, ajouter visible immédiatement
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
            el.classList.add('visible');
        } else {
            fadeObserver.observe(el);
        }
    });
    
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
            const sectionHeight = section.clientHeight;
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

