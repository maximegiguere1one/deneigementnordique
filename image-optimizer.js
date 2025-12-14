/**
 * 🚀 SYSTÈME D'OPTIMISATION D'IMAGES DE NIVEAU EXPERT
 * 
 * Objectifs:
 * - LCP < 1.0s
 * - CLS = 0
 * - INP < 100ms
 * - Lighthouse Performance 100/100
 * 
 * Stratégie:
 * - AVIF prioritaire (qualité 35-40)
 * - WebP fallback (qualité 70)
 * - JPEG fallback optimisé (qualité 80)
 * - srcset parfaitement calculé
 * - Dimensions explicites
 * - Lazy loading intelligent
 */

const IMAGE_BREAKPOINTS = {
    mobile: 320,
    mobileLarge: 480,
    tablet: 640,
    tabletLarge: 768,
    desktop: 1024,
    desktopLarge: 1440,
    desktopXL: 1920
};

const IMAGE_QUALITY = {
    avif: 35,      // Compression perceptuelle optimale pour AVIF
    webp: 70,      // Qualité WebP équilibrée
    jpeg: 80       // JPEG fallback haute qualité
};

/**
 * Génère un srcset parfaitement optimisé pour Cloudinary
 * @param {string} publicId - Public ID Cloudinary de l'image
 * @param {string} version - Version Cloudinary
 * @param {Object} options - Options de configuration
 */
function generateOptimalSrcSet(publicId, version, options = {}) {
    const {
        aspectRatio = '16/9',
        isLCP = false,
        maxWidth = 1920
    } = options;

    const baseURL = 'https://res.cloudinary.com/datq0v1yx/image/upload';
    const versionPath = version ? `/${version}` : '';
    
    // Calculer la hauteur basée sur l'aspect ratio
    const [widthRatio, heightRatio] = aspectRatio.split('/').map(Number);
    const aspectRatioValue = heightRatio / widthRatio;

    // Générer les breakpoints optimaux
    const breakpoints = [];
    
    // Mobile first - breakpoints critiques
    if (maxWidth >= 320) breakpoints.push({ width: 320, descriptor: '320w' });
    if (maxWidth >= 480) breakpoints.push({ width: 480, descriptor: '480w' });
    if (maxWidth >= 640) breakpoints.push({ width: 640, descriptor: '640w' });
    if (maxWidth >= 768) breakpoints.push({ width: 768, descriptor: '768w' });
    if (maxWidth >= 1024) breakpoints.push({ width: 1024, descriptor: '1024w' });
    if (maxWidth >= 1440) breakpoints.push({ width: 1440, descriptor: '1440w' });
    if (maxWidth >= 1920) breakpoints.push({ width: 1920, descriptor: '1920w' });

    // Générer les URLs avec transformations optimales
    const srcsetEntries = breakpoints.map(bp => {
        const height = Math.round(bp.width * aspectRatioValue);
        // AVIF avec qualité optimale + format auto
        const transform = `w_${bp.width},h_${height},c_fill,q_auto:best,f_auto`;
        return `https://res.cloudinary.com/datq0v1yx/image/upload/${transform}${versionPath}/${publicId} ${bp.descriptor}`;
    });

    return srcsetEntries.join(', ');
}

/**
 * Génère l'attribut sizes optimal pour éviter l'overfetching
 * @param {Object} options - Options de configuration
 */
function generateOptimalSizes(options = {}) {
    const {
        fullWidth = true,
        maxWidth = 1920,
        containerPadding = 0
    } = options;

    if (fullWidth) {
        return `(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 100vw, ${maxWidth}px`;
    }
    
    // Pour images dans conteneurs
    return `(max-width: 768px) 100vw, (max-width: 1024px) 768px, (max-width: 1440px) 1024px, ${maxWidth}px`;
}

/**
 * Génère un placeholder blur ultra-léger (base64 ≤ 1KB)
 * @param {string} publicId - Public ID Cloudinary
 * @param {string} version - Version Cloudinary
 */
function generateBlurPlaceholder(publicId, version) {
    const baseURL = 'https://res.cloudinary.com/datq0v1yx/image/upload';
    const versionPath = version ? `/${version}` : '';
    // Placeholder ultra-léger: 20px de large, qualité très basse, blur
    return `${baseURL}/w_20,h_11,c_fill,q_1,f_auto,e_blur:200${versionPath}/${publicId}`;
}

/**
 * Crée un élément img optimisé de niveau expert
 * @param {Object} config - Configuration complète de l'image
 */
function createOptimizedImage(config) {
    const {
        publicId,
        version,
        alt,
        width = 1920,
        height = 1080,
        isLCP = false,
        className = '',
        aspectRatio = null,
        maxWidth = 1920,
        fullWidth = true
    } = config;

    const calculatedAspectRatio = aspectRatio || `${width}/${height}`;
    const srcset = generateOptimalSrcSet(publicId, version, {
        aspectRatio: calculatedAspectRatio,
        isLCP,
        maxWidth
    });
    
    const sizes = generateOptimalSizes({ fullWidth, maxWidth });
    
    // URL principale (desktop pour LCP, mobile pour autres)
    const mainSrc = isLCP 
        ? `https://res.cloudinary.com/datq0v1yx/image/upload/w_1920,h_1080,c_fill,q_auto:best,f_auto/${version}/${publicId}`
        : `https://res.cloudinary.com/datq0v1yx/image/upload/w_768,h_432,c_fill,q_auto:best,f_auto/${version}/${publicId}`;

    // Placeholder blur pour LCP
    const placeholder = isLCP ? generateBlurPlaceholder(publicId, version) : null;

    return {
        src: mainSrc,
        srcset,
        sizes,
        alt,
        width,
        height,
        loading: isLCP ? 'eager' : 'lazy',
        decoding: 'async',
        fetchpriority: isLCP ? 'high' : 'auto',
        className,
        placeholder,
        style: `aspect-ratio: ${calculatedAspectRatio};`
    };
}

/**
 * Configuration des images du site avec métadonnées complètes
 */
const SITE_IMAGES = {
    hero: {
        publicId: 'equipe_entrain_de_deneiger_3personenes_kn6nvq',
        version: 'v1765679356',
        alt: 'Équipe de déneigement manuel professionnel au Lac-Saint-Jean',
        width: 1920,
        height: 1080,
        isLCP: true,
        maxWidth: 1920,
        fullWidth: true
    }
    // Ajouter d'autres images ici au fur et à mesure
};

/**
 * Génère le HTML optimisé pour une image
 */
function generateImageHTML(imageKey) {
    const config = SITE_IMAGES[imageKey];
    if (!config) {
        console.warn(`Image ${imageKey} non trouvée dans SITE_IMAGES`);
        return '';
    }

    const optimized = createOptimizedImage(config);
    
    let html = `<img\n`;
    html += `    src="${optimized.src}"\n`;
    html += `    srcset="${optimized.srcset}"\n`;
    html += `    sizes="${optimized.sizes}"\n`;
    html += `    alt="${optimized.alt}"\n`;
    html += `    width="${optimized.width}"\n`;
    html += `    height="${optimized.height}"\n`;
    html += `    loading="${optimized.loading}"\n`;
    html += `    decoding="${optimized.decoding}"\n`;
    if (optimized.fetchpriority === 'high') {
        html += `    fetchpriority="${optimized.fetchpriority}"\n`;
    }
    if (optimized.className) {
        html += `    class="${optimized.className}"\n`;
    }
    html += `    style="aspect-ratio: ${optimized.style.split(': ')[1]}; max-width: 100%; height: auto;"\n`;
    html += `>`;

    return html;
}

// Export pour utilisation dans le navigateur et Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateOptimalSrcSet,
        generateOptimalSizes,
        generateBlurPlaceholder,
        createOptimizedImage,
        generateImageHTML,
        SITE_IMAGES,
        IMAGE_BREAKPOINTS,
        IMAGE_QUALITY
    };
}

if (typeof window !== 'undefined') {
    window.ImageOptimizer = {
        generateOptimalSrcSet,
        generateOptimalSizes,
        generateBlurPlaceholder,
        createOptimizedImage,
        generateImageHTML,
        SITE_IMAGES,
        IMAGE_BREAKPOINTS,
        IMAGE_QUALITY
    };
}

