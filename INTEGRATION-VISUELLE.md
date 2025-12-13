# Guide d'Intégration Visuelle - Déneigement Nordique Expert

## 📁 Structure des fichiers

Placez tous les fichiers visuels dans les dossiers suivants :

```
déneigement nordique expert/
├── images/
│   ├── equipe-en-train-de-deneiger-3personnes.jpeg
│   ├── 4-deneigeurs-sur-toit-plat.jpeg
│   ├── 4-deneigeur-sur-toit-plat-avec-mordure.jpeg
│   ├── en-soumission.jpeg
│   ├── en-evaluation.jpeg
│   ├── equipe-en-preparation.jpeg
│   ├── avant-deneigement.jpeg
│   └── apres-deneigement.jpeg
└── videos/
    ├── Quebec_Rooftop_Snow_Removal_Video.mp4
    └── Realistic_Snow_Removal_Video_Request.mp4
```

## 🎯 Affectation des visuels

### 🟦 HERO SECTION
**Fichier** : `videos/Quebec_Rooftop_Snow_Removal_Video.mp4` ou `videos/Realistic_Snow_Removal_Video_Request.mp4`

**Caractéristiques** :
- Vidéo en arrière-plan avec overlay sombre
- Autoplay, loop, muted
- Fallback : image `4-deneigeurs-sur-toit-plat.jpeg` si vidéo non disponible

### 🟦 SECTION "POURQUOI NOUS CHOISIR"
**Fichier** : `images/equipe-en-train-de-deneiger-3personnes.jpeg` ou `images/4-deneigeurs-sur-toit-plat.jpeg`

**Placement** :
- Desktop : À droite du texte
- Mobile : Au-dessus du texte

**Message** : Expertise terrain, sécurité, méthode, fiabilité

### 🟦 PROCESSUS - ÉTAPE 1 : SOUMISSION
**Fichier** : `images/en-soumission.jpeg`

**Rôle** : Relation client, professionnalisme commercial, premier contact humain

### 🟦 PROCESSUS - ÉTAPE 2 : ÉVALUATION
**Fichier** : `images/en-evaluation.jpeg`

**Rôle** : Analyse, inspection, gestion du risque

### 🟦 PROCESSUS - ÉTAPE 3 : PLANIFICATION
**Fichier** : `images/equipe-en-preparation.jpeg`

**Rôle** : Organisation, coordination, sérieux opérationnel

### 🟦 PROCESSUS - ÉTAPE 4 : INTERVENTION
**Fichier** : `images/4-deneigeur-sur-toit-plat-avec-mordure.jpeg`

**Rôle** : Exécution, sécurité, travail réel

### 🟦 SECTION AVANT / APRÈS
**Fichiers** :
- `images/avant-deneigement.jpeg`
- `images/apres-deneigement.jpeg`

**Fonctionnalité** : Slider interactif avec boutons "Avant" / "Après"

**Rôle** : Preuve de résultat, réduction du risque, tranquillité d'esprit

## 🎨 Directives de style

### ✅ À FAIRE
- Visages non centraux (posture naturelle)
- Aucune pose marketing
- Laisser respirer les images
- Ne pas répéter la même image dans 2 sections
- Priorité à la lisibilité B2B

### ❌ À ÉVITER
- Galerie photo inutile
- Carousel sans but
- Répétition de vidéos
- Images décoratives sans message

## 📐 Spécifications techniques

### Images
- Format : JPEG
- Optimisation : Compressées pour web (qualité 80-85%)
- Lazy loading : Activé pour toutes les images
- Alt text : Déjà intégré avec descriptions SEO

### Vidéos
- Format : MP4 (H.264)
- Résolution recommandée : 1920x1080 minimum
- Durée : 15-30 secondes (loop)
- Poids : Optimisé pour web (< 5MB si possible)

## 🚀 Message global

**"Déneigement Nordique Expert est structuré, sécuritaire et fiable pour des bâtiments commerciaux."**

Le site doit rassurer en moins de 5 secondes.

## 🔧 Personnalisation

Si vous souhaitez remplacer une image ou vidéo :

1. Placez le nouveau fichier dans le bon dossier (`images/` ou `videos/`)
2. Renommez-le exactement comme le fichier à remplacer
3. Ou modifiez le nom dans `index.html` si vous utilisez un nom différent

## 📱 Responsive

Toutes les images sont optimisées pour :
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

Les images s'adaptent automatiquement grâce au CSS.

