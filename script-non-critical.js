// Non-Critical JavaScript - Chargé après le rendu initial
// Contient animations, carousels, et interactions non essentielles

(function() {
    'use strict';
    
    // Lazy load non-critical code
    function loadNonCritical() {
        // Charger le script principal de manière asynchrone
        var script = document.createElement('script');
        script.src = 'script.js';
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
    }
    
    // Charger après que la page soit interactive
    if (document.readyState === 'complete') {
        loadNonCritical();
    } else {
        window.addEventListener('load', loadNonCritical);
    }
    
    // Ou utiliser requestIdleCallback si disponible
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadNonCritical, { timeout: 2000 });
    }
})();

