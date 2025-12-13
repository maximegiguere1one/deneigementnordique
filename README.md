# Déneigement Nordique Expert — Site Web

Site web professionnel pour Déneigement Nordique Expert, spécialisé en déneigement résidentiel et commercial au Québec.

## 🎯 Caractéristiques

- **Design moderne** : Copie conforme de la structure et du design de Greenora
- **100% responsive** : Optimisé pour mobile, tablette et desktop
- **Animations fluides** : Transitions et effets de scroll élégants
- **SEO optimisé** : Structure sémantique et métadonnées complètes
- **Performance** : Chargement rapide et optimisé

## 🎨 Identité visuelle

### Couleurs
- **Bleu foncé** : `#1F3A56` (texte, titres)
- **Vert forêt** : `#1F7A4D` (accents, icônes, CTA secondaires)
- **Bleu glace** : `#2FA4D9` (éléments visuels, highlights)
- **Blanc neige** : `#FFFFFF`
- **Gris clair** : `#F4F6F8` (fonds alternatifs)

### Typographie
- **Titres** : Manrope (bold, moderne)
- **Texte** : Inter (lisible et professionnel)

## 📁 Structure du projet

```
déneigement nordique expert/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Animations et interactions
└── README.md          # Documentation
```

## 🚀 Installation et utilisation

### Prérequis
- Node.js et npm installés sur votre machine

### Installation
```bash
npm install
```

### Lancer le site en local

**Option 1 : Avec rechargement automatique (recommandé)**
```bash
npm start
```

## 🌐 Déploiement sur Vercel

### Configuration
Le site est configuré pour être déployé sur Vercel avec le domaine **deneigementnordique.com**.

### Étapes de déploiement

1. **Connecter le dépôt GitHub à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez le dépôt `maximegiguere1one/deneigementnordique`
   - Vercel détectera automatiquement la configuration dans `vercel.json`

2. **Configurer le domaine personnalisé**
   - Dans les paramètres du projet Vercel, allez dans "Domains"
   - Ajoutez `deneigementnordique.com`
   - Suivez les instructions pour configurer les DNS

3. **Déploiement automatique**
   - Chaque push sur la branche `main` déclenchera un déploiement automatique
   - Les déploiements sont instantanés grâce à la configuration statique

### Configuration Vercel
Le fichier `vercel.json` inclut :
- Configuration pour site statique
- Headers de sécurité
- Cache optimisé pour les assets (images, CSS, JS)
- Routes et rewrites configurés
ou
```bash
npm run dev
```
Le site s'ouvrira automatiquement dans votre navigateur à l'adresse `http://localhost:3000`

**Option 2 : Serveur HTTP simple**
```bash
npm run serve
```

### Commandes disponibles
- `npm start` - Lance le serveur avec rechargement automatique et ouvre le navigateur
- `npm run dev` - Même chose que start avec surveillance des fichiers
- `npm run serve` - Lance un serveur HTTP simple
- `npm run build` - Commande de build (non nécessaire pour ce site statique)

### Alternative sans npm
Si vous n'avez pas Node.js, vous pouvez aussi :
```bash
# Avec Python
python -m http.server 8000

# Puis ouvrir http://localhost:8000 dans votre navigateur
```

## 📱 Sections du site

1. **Hero Section** : Titre principal, sous-titre et CTA
2. **Trust Section** : Points de valeur (4 colonnes)
3. **À propos** : Présentation de l'entreprise
4. **Services** : 5 services en grille avec cartes
5. **Processus** : 4 étapes du processus
6. **Témoignages** : Avis clients
7. **CTA Finale** : Appel à l'action principal
8. **Contact** : Formulaire et coordonnées
9. **Footer** : Liens et informations légales

## 🔧 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `styles.css` :
```css
:root {
    --color-primary: #1F3A56;
    --color-secondary: #1F7A4D;
    --color-accent: #2FA4D9;
    /* ... */
}
```

### Modifier le contenu
Éditez directement `index.html` pour changer les textes, titres et descriptions.

### Ajouter des images
Remplacez les placeholders SVG par vos propres images dans la section hero.

## 📞 Contact

Pour toute question ou modification, contactez l'équipe de développement.

## 📄 Licence

© 2024 Déneigement Nordique Expert. Tous droits réservés.

