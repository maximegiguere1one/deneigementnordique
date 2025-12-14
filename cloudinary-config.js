// Configuration Cloudinary pour optimisation automatique des images
// Utilisation: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[image_path]

const CLOUDINARY_CONFIG = {
    cloudName: 'deneigement-nordique', // À remplacer par votre cloud name Cloudinary
    secure: true,
    baseURL: 'https://res.cloudinary.com/deneigement-nordique/image/upload',
    
    // Transformations par défaut
    defaults: {
        quality: 'auto',
        fetchFormat: 'auto', // Auto-détecte AVIF, WebP, etc.
        flags: ['progressive', 'immutable_cache']
    },
    
    // Transformations pour différentes tailles
    sizes: {
        thumbnail: 'w_300,h_300,c_fill,q_auto,f_auto',
        mobile: 'w_768,h_768,c_fill,q_auto,f_auto',
        tablet: 'w_1280,h_1280,c_fill,q_auto,f_auto',
        desktop: 'w_1920,h_1080,c_fill,q_auto,f_auto',
        hero: 'w_1920,h_1080,c_fill,q_auto:best,f_auto'
    },
    
    // Helper function pour générer les URLs
    getImageURL: function(imagePath, size = 'desktop') {
        const sizeTransform = this.sizes[size] || this.sizes.desktop;
        const defaultParams = Object.entries(this.defaults)
            .map(([key, value]) => `${key}_${value}`)
            .join(',');
        
        return `${this.baseURL}/${sizeTransform}/${defaultParams}/${imagePath}`;
    },
    
    // Helper pour srcset responsive
    getSrcSet: function(imagePath) {
        return [
            `${this.getImageURL(imagePath, 'mobile')} 768w`,
            `${this.getImageURL(imagePath, 'tablet')} 1280w`,
            `${this.getImageURL(imagePath, 'desktop')} 1920w`
        ].join(', ');
    }
};

// Exemple d'utilisation:
// <img src="[CLOUDINARY_CONFIG.getImageURL('images/hero.jpg', 'hero')]" 
//      srcset="[CLOUDINARY_CONFIG.getSrcSet('images/hero.jpg')]"
//      sizes="100vw">

// Pour activer Cloudinary, remplacer dans index.html:
// - images/equipe entrain de deneiger(3personenes).avif
// → CLOUDINARY_CONFIG.getImageURL('equipe-entrain-deneiger', 'hero')

