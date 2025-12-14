// Script pour migrer les images vers Cloudinary
// Utilisation: node migrate-cloudinary.js

const CLOUDINARY_CONFIG = {
    cloudName: 'datq0v1yx',
    baseURL: 'https://res.cloudinary.com/datq0v1yx/image/upload'
};

// Mapping des images locales vers Cloudinary
// Format: { localPath: 'cloudinary-folder/image-name' }
const IMAGE_MAPPING = {
    'images/equipe entrain de deneiger(3personenes)': 'equipe-entrain-deneiger',
    'images/4 deneigeurs sur toit plat': '4-deneigeurs-toit-plat',
    'images/4 deneigeur sur toit plat avec mordure': '4-deneigeur-toit-plat-mordure',
    'images/en soumission': 'en-soumission',
    'images/en evaluation': 'en-evaluation',
    'images/équipe en preparation': 'equipe-preparation',
    'images/avant deneigement': 'avant-deneigement',
    'images/apres deneigement': 'apres-deneigement'
};

// Générer les URLs Cloudinary avec transformations
function getCloudinaryURL(imagePath, size = 'desktop') {
    const sizes = {
        mobile: 'w_768,h_768,c_fill,q_auto:best,f_auto',
        tablet: 'w_1280,h_1280,c_fill,q_auto:best,f_auto',
        desktop: 'w_1920,h_1080,c_fill,q_auto:best,f_auto',
        hero: 'w_1920,h_1080,c_fill,q_auto:best,f_auto'
    };
    
    const transform = sizes[size] || sizes.desktop;
    const cloudinaryPath = IMAGE_MAPPING[imagePath] || imagePath.replace('images/', '').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    
    return `${CLOUDINARY_CONFIG.baseURL}/${transform}/${cloudinaryPath}`;
}

// Générer srcset pour responsive
function getCloudinarySrcSet(imagePath) {
    return [
        `${getCloudinaryURL(imagePath, 'mobile')} 768w`,
        `${getCloudinaryURL(imagePath, 'tablet')} 1280w`,
        `${getCloudinaryURL(imagePath, 'desktop')} 1920w`
    ].join(', ');
}

// Exporter pour utilisation dans HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCloudinaryURL,
        getCloudinarySrcSet,
        CLOUDINARY_CONFIG,
        IMAGE_MAPPING
    };
}

// Pour utilisation dans le navigateur
if (typeof window !== 'undefined') {
    window.CLOUDINARY_CONFIG = CLOUDINARY_CONFIG;
    window.getCloudinaryURL = getCloudinaryURL;
    window.getCloudinarySrcSet = getCloudinarySrcSet;
}

console.log('Cloudinary Config loaded');
console.log('Cloud Name:', CLOUDINARY_CONFIG.cloudName);
console.log('Base URL:', CLOUDINARY_CONFIG.baseURL);

