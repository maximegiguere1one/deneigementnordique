// Critical JavaScript - Chargé immédiatement
// Contient uniquement le code nécessaire pour le rendu initial

(function() {
    'use strict';
    
    // Mobile Performance Optimization - Critical
    if (window.innerWidth <= 768) {
        document.addEventListener('DOMContentLoaded', function() {
            var images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(function(img) {
                if (img.hasAttribute('width') && img.hasAttribute('height')) {
                    img.style.aspectRatio = img.getAttribute('width') + ' / ' + img.getAttribute('height');
                }
            });
            
            var carousel = document.querySelector('.carousel-track-about');
            if (carousel) {
                carousel.style.willChange = 'transform';
                carousel.style.transform = 'translateZ(0)';
                carousel.style.backfaceVisibility = 'hidden';
            }
        });
    }
    
    // Service Worker Registration - Critical
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

