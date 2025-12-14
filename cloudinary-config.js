// Configuration Cloudinary pour optimisation automatique des images
// Cloud Name: datq0v1yx
// Collection: https://collection.cloudinary.com/datq0v1yx/7dad082a8126add27efcb974f43c3209
// Utilisation: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[image_path]

const CLOUDINARY_CONFIG = {
    cloudName: 'datq0v1yx', // Cloud name Cloudinary
    apiKey: '4Xri1dQ2B5PiyRkj_daGgObTdeU', // API Key Cloudinary (pour uploads côté serveur)
    secure: true,
    baseURL: 'https://res.cloudinary.com/datq0v1yx/image/upload',
    collectionURL: 'https://collection.cloudinary.com/datq0v1yx/7dad082a8126add27efcb974f43c3209',
    // Images uploadées avec leurs IDs Cloudinary
    uploadedImages: {
        'equipe-entrain-deneiger': {
            publicId: 'equipe_entrain_de_deneiger_3personenes_kn6nvq',
            version: 'v1765679356',
            url: 'https://res.cloudinary.com/datq0v1yx/image/upload/v1765679356/equipe_entrain_de_deneiger_3personenes_kn6nvq'
        }
    },
    
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
    
    // Helper function pour générer les URLs avec version
    getImageURL: function(imageKey, size = 'desktop') {
        const image = this.uploadedImages[imageKey];
        if (!image) {
            console.warn(`Image ${imageKey} non trouvée dans uploadedImages`);
            return '';
        }
        
        const sizeTransform = this.sizes[size] || this.sizes.desktop;
        return `${this.baseURL}/${sizeTransform}/${image.version}/${image.publicId}`;
    },
    
    // Helper pour srcset responsive avec version
    getSrcSet: function(imageKey) {
        const image = this.uploadedImages[imageKey];
        if (!image) {
            console.warn(`Image ${imageKey} non trouvée dans uploadedImages`);
            return '';
        }
        
        return [
            `${this.getImageURL(imageKey, 'mobile')} 768w`,
            `${this.getImageURL(imageKey, 'tablet')} 1280w`,
            `${this.getImageURL(imageKey, 'desktop')} 1920w`
        ].join(', ');
    },
    
    // Helper pour obtenir l'URL originale avec version
    getOriginalURL: function(imageKey) {
        const image = this.uploadedImages[imageKey];
        return image ? image.url : '';
    }
};

// Exemple d'utilisation:
// <img src="[CLOUDINARY_CONFIG.getImageURL('images/hero.jpg', 'hero')]" 
//      srcset="[CLOUDINARY_CONFIG.getSrcSet('images/hero.jpg')]"
//      sizes="100vw">

// Pour activer Cloudinary, remplacer dans index.html:
// - images/equipe entrain de deneiger(3personenes).avif
// → CLOUDINARY_CONFIG.getImageURL('equipe-entrain-deneiger', 'hero')

