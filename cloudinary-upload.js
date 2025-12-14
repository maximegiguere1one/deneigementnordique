// Script pour uploader des images vers Cloudinary
// Utilisation: node cloudinary-upload.js [chemin-image]

const cloudinary = require('cloudinary').v2;

// Configuration Cloudinary
cloudinary.config({
    cloud_name: 'datq0v1yx',
    api_key: '4Xri1dQ2B5PiyRkj_daGgObTdeU',
    // api_secret: 'VOTRE_API_SECRET' // À ajouter si nécessaire pour uploads
});

// Mapping des images à uploader
const IMAGES_TO_UPLOAD = {
    'equipe-entrain-deneiger': {
        localPath: 'images/equipe entrain de deneiger(3personenes).jpeg',
        publicId: 'equipe-entrain-deneiger',
        folder: 'deneigement-nordique'
    },
    '4-deneigeurs-toit-plat': {
        localPath: 'images/4 deneigeurs sur toit plat .jpeg',
        publicId: '4-deneigeurs-toit-plat',
        folder: 'deneigement-nordique'
    },
    '4-deneigeur-toit-plat-mordure': {
        localPath: 'images/4 deneigeur sur toit plat avec mordure.jpeg',
        publicId: '4-deneigeur-toit-plat-mordure',
        folder: 'deneigement-nordique'
    },
    'en-soumission': {
        localPath: 'images/en soumission.jpeg',
        publicId: 'en-soumission',
        folder: 'deneigement-nordique'
    },
    'en-evaluation': {
        localPath: 'images/en evaluation.jpeg',
        publicId: 'en-evaluation',
        folder: 'deneigement-nordique'
    },
    'equipe-preparation': {
        localPath: 'images/équipe en preparation.jpeg',
        publicId: 'equipe-preparation',
        folder: 'deneigement-nordique'
    },
    'avant-deneigement': {
        localPath: 'images/avant deneigement.jpeg',
        publicId: 'avant-deneigement',
        folder: 'deneigement-nordique'
    },
    'apres-deneigement': {
        localPath: 'images/apres deneigement.jpeg',
        publicId: 'apres-deneigement',
        folder: 'deneigement-nordique'
    }
};

// Fonction pour uploader une image
async function uploadImage(imageConfig) {
    try {
        console.log(`📤 Upload de ${imageConfig.publicId}...`);
        
        const result = await cloudinary.uploader.upload(imageConfig.localPath, {
            public_id: imageConfig.publicId,
            folder: imageConfig.folder,
            overwrite: true,
            resource_type: 'image',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });
        
        console.log(`✅ ${imageConfig.publicId} uploadé avec succès!`);
        console.log(`   URL: ${result.secure_url}`);
        console.log(`   Public ID: ${result.public_id}`);
        console.log('');
        
        return result;
    } catch (error) {
        console.error(`❌ Erreur lors de l'upload de ${imageConfig.publicId}:`, error.message);
        return null;
    }
}

// Fonction pour uploader toutes les images
async function uploadAllImages() {
    console.log('🚀 Début de l\'upload des images vers Cloudinary...\n');
    
    const results = [];
    for (const [key, config] of Object.entries(IMAGES_TO_UPLOAD)) {
        const result = await uploadImage(config);
        if (result) {
            results.push(result);
        }
        // Attendre 1 seconde entre chaque upload pour éviter les limites de rate
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n✅ Upload terminé! ${results.length}/${Object.keys(IMAGES_TO_UPLOAD).length} images uploadées.`);
    return results;
}

// Exécuter si appelé directement
if (require.main === module) {
    // Vérifier si cloudinary est installé
    try {
        require('cloudinary');
    } catch (error) {
        console.error('❌ Le package cloudinary n\'est pas installé.');
        console.log('📦 Installation: npm install cloudinary');
        process.exit(1);
    }
    
    // Uploader toutes les images
    uploadAllImages().catch(console.error);
}

module.exports = { uploadImage, uploadAllImages, IMAGES_TO_UPLOAD };

