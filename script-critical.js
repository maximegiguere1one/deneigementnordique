// Critical JavaScript - Chargé immédiatement
// Zero Forced Layouts - All READS batched before WRITES

(function() {
    'use strict';
    
    // Cache window width to avoid repeated reads
    var cachedWindowWidth = window.innerWidth;
    
    // Mobile Performance Optimization - Critical - Zero forced layouts
    if (cachedWindowWidth <= 768) {
        document.addEventListener('DOMContentLoaded', function() {
            // READ: Get all images and their dimensions first
            var images = document.querySelectorAll('img[loading="lazy"]');
            var imageStyles = [];
            
            images.forEach(function(img) {
                if (img.hasAttribute('width') && img.hasAttribute('height')) {
                    var width = img.getAttribute('width');
                    var height = img.getAttribute('height');
                    imageStyles.push({
                        element: img,
                        aspectRatio: width + ' / ' + height
                    });
                }
            });
            
            // WRITE: Apply all aspect-ratio styles in one batch
            requestAnimationFrame(function() {
                imageStyles.forEach(function(item) {
                    item.element.style.aspectRatio = item.aspectRatio;
                });
            });
            
            // WRITE: Carousel optimizations in same batch
            var carousel = document.querySelector('.carousel-track-about');
            if (carousel) {
                requestAnimationFrame(function() {
                    carousel.style.willChange = 'transform';
                    carousel.style.transform = 'translateZ(0)';
                    carousel.style.backfaceVisibility = 'hidden';
                });
            }
        });
    }
    
    // Cache window width on resize (passive listener)
    window.addEventListener('resize', function() {
        requestAnimationFrame(function() {
            cachedWindowWidth = window.innerWidth;
        });
    }, { passive: true });
    
    // Service Worker Registration - Critical - No layout reads
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registered:', registration.scope);
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
})();

