# Système de Design Visuel Immersif
## Profondeur Spatiale & Continuité - Style ERCO

---

## 1. BACKGROUND GRADIENT SETS

### Gradient Set A: Hero Deep (Zone Sombre)
**Usage** : Hero section, sections d'introduction
**Émotion** : Profondeur, densité, professionnalisme

```css
--gradient-hero-deep: linear-gradient(180deg, 
    #0A1520 0%,      /* Bleu nuit profond */
    #1A2535 25%,     /* Bleu ardoise foncé */
    #2A3545 50%,     /* Gris bleu moyen */
    #3A4555 75%,     /* Gris bleu clair */
    #4A5565 100%     /* Gris ardoise */
);

--gradient-hero-diagonal: linear-gradient(135deg, 
    #0A1520 0%,
    #1A2535 40%,
    #2A3545 70%,
    #3A4555 100%
);
```

**Application** :
- Hero section : `background: var(--gradient-hero-diagonal);`
- Overlay : `rgba(10, 21, 32, 0.85)` pour contraste texte

---

### Gradient Set B: Mid-Section Transition (Zone Intermédiaire)
**Usage** : Sections services, processus
**Émotion** : Équilibre, structure, clarté progressive

```css
--gradient-mid-transition: linear-gradient(180deg, 
    #3A4555 0%,      /* Gris bleu clair */
    #5A6575 20%,     /* Gris moyen */
    #7A8595 40%,     /* Gris clair */
    #E8ECF0 60%,     /* Gris très clair */
    #F0F4F8 80%,     /* Gris neige */
    #F8FAFC 100%     /* Blanc cassé */
);

--gradient-mid-subtle: linear-gradient(135deg, 
    #E8ECF0 0%,
    #F0F4F8 50%,
    #F8FAFC 100%
);
```

**Application** :
- Sections services : `background: var(--gradient-mid-subtle);`
- Transition douce depuis hero

---

### Gradient Set C: Clear Light (Zone Claire)
**Usage** : Sections trust, contact, footer
**Émotion** : Clarté, sécurité, solution

```css
--gradient-clear-light: linear-gradient(180deg, 
    #F8FAFC 0%,      /* Blanc cassé */
    #FFFFFF 50%,     /* Blanc pur */
    #FAFBFC 100%     /* Blanc chaud subtil */
);

--gradient-footer-ground: radial-gradient(
    ellipse at top center,
    #2C3E50 0%,      /* Bleu ardoise */
    #1A252F 50%,     /* Bleu nuit */
    #0F1820 100%     /* Noir bleu */
);
```

**Application** :
- Sections finales : `background: var(--gradient-clear-light);`
- Footer : `background: var(--gradient-footer-ground);`

---

## 2. SUBTLE AMBIENT TEXTURES

### Texture A: Micro-Grain Noise
**Usage** : Overlay global sur tout le site
**Effet** : Texture tactile, prévient le color banding

```css
--texture-grain: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.03"/></svg>');

/* Application */
body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--texture-grain);
    background-size: 200px 200px;
    opacity: 0.03;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Opacité : `0.03` (très subtil)
- Taille : `200px × 200px`
- Mix-blend-mode : `overlay`

---

### Texture B: Snow Drift (Zones Supérieures)
**Usage** : Hero, sections sombres
**Effet** : Atmosphère hivernale subtile

```css
--texture-drift: radial-gradient(
    ellipse 800px 400px at 50% 0%,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.04) 30%,
    transparent 70%
);

/* Application sur hero */
.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--texture-drift);
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Opacité max : `0.08`
- Forme : Ellipse horizontale
- Position : Haut de section

---

### Texture C: Frost Pattern (Zones Inférieures)
**Usage** : Sections claires, footer
**Effet** : Texture organique légère, comme du givre

```css
--texture-frost: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.02) 2px,
    rgba(255, 255, 255, 0.02) 4px
);

/* Application */
.clear-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--texture-frost);
    opacity: 0.5;
    pointer-events: none;
}
```

**Valeurs** :
- Opacité : `0.02-0.05`
- Répétition : `2-4px`
- Angle : `0deg` ou `45deg` pour variation

---

## 3. DEPTH CONTAINERS / LAYERED CARDS

### Container Level 1: Low Depth (Subtle Float)
**Usage** : Cartes de contenu, éléments secondaires
**Élévation** : Légère, presque au niveau du fond

```css
.depth-low {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px) saturate(150%);
    border-radius: 16px;
    box-shadow: 
        0 2px 8px rgba(10, 21, 32, 0.08),
        0 1px 3px rgba(10, 21, 32, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transform: translateZ(0);
}

/* Valeurs */
- Blur: 8px
- Shadow blur: 8px, 3px
- Shadow opacity: 0.08, 0.12
- Border opacity: 0.2
```

---

### Container Level 2: Medium Depth (Floating)
**Usage** : Cartes principales, sections importantes
**Élévation** : Modérée, flottante

```css
.depth-medium {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px) saturate(180%);
    border-radius: 20px;
    box-shadow: 
        0 8px 24px rgba(10, 21, 32, 0.12),
        0 4px 12px rgba(10, 21, 32, 0.08),
        0 2px 4px rgba(10, 21, 32, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: translateZ(0);
}

/* Valeurs */
- Blur: 12px
- Shadow blur: 24px, 12px, 4px (triple layer)
- Shadow opacity: 0.12, 0.08, 0.04
- Border opacity: 0.3
```

---

### Container Level 3: High Depth (Elevated)
**Usage** : CTA, éléments critiques, modales
**Élévation** : Élevée, très flottante

```css
.depth-high {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px) saturate(200%);
    border-radius: 24px;
    box-shadow: 
        0 16px 48px rgba(10, 21, 32, 0.16),
        0 8px 24px rgba(10, 21, 32, 0.12),
        0 4px 8px rgba(10, 21, 32, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transform: translateZ(0);
}

/* Valeurs */
- Blur: 16px
- Shadow blur: 48px, 24px, 8px (triple layer profond)
- Shadow opacity: 0.16, 0.12, 0.08
- Border opacity: 0.4
```

---

### Hover States - Depth Increase
**Règle** : Chaque niveau augmente d'un niveau au hover

```css
.depth-low:hover {
    box-shadow: 
        0 8px 24px rgba(10, 21, 32, 0.12),
        0 4px 12px rgba(10, 21, 32, 0.08);
    transform: translateY(-2px) translateZ(0);
}

.depth-medium:hover {
    box-shadow: 
        0 16px 48px rgba(10, 21, 32, 0.16),
        0 8px 24px rgba(10, 21, 32, 0.12);
    transform: translateY(-4px) translateZ(0);
}

.depth-high:hover {
    box-shadow: 
        0 24px 64px rgba(10, 21, 32, 0.2),
        0 12px 32px rgba(10, 21, 32, 0.16);
    transform: translateY(-6px) translateZ(0);
}
```

---

## 4. SECTION TRANSITION ELEMENTS

### Transition A: Gradient Fade Bridge
**Usage** : Entre sections sombres et claires
**Effet** : Fade progressif, pas de coupure nette

```css
.section-transition-bridge {
    position: relative;
    height: 200px;
    margin-top: -200px;
    background: linear-gradient(180deg,
        transparent 0%,
        rgba(232, 236, 240, 0.3) 30%,
        rgba(240, 244, 248, 0.6) 60%,
        rgba(248, 250, 252, 0.9) 90%,
        rgba(248, 250, 252, 1) 100%
    );
    pointer-events: none;
    z-index: 0;
}

/* Application */
.dark-section::after {
    content: '';
    position: absolute;
    bottom: -200px;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg,
        transparent 0%,
        rgba(232, 236, 240, 0.5) 100%
    );
    pointer-events: none;
}
```

**Valeurs** :
- Hauteur : `200px`
- Opacité progressive : `0 → 0.3 → 0.6 → 0.9 → 1`
- Position : `bottom: -200px` (chevauchement)

---

### Transition B: Soft Shape Overlay
**Usage** : Entre sections similaires
**Effet** : Forme organique qui guide l'œil

```css
.shape-transition {
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    height: 200px;
    background: radial-gradient(
        ellipse 120% 100px at 50% 0%,
        rgba(248, 250, 252, 0.8) 0%,
        rgba(248, 250, 252, 0.4) 50%,
        transparent 100%
    );
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Forme : Ellipse horizontale
- Opacité : `0.8 → 0.4 → 0`
- Position : `bottom: -100px`

---

### Transition C: Continuous Overlay
**Usage** : Sections adjacentes
**Effet** : Overlay qui se fond progressivement

```css
.continuous-overlay {
    position: relative;
}

.continuous-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.2) 100%
    );
    pointer-events: none;
    z-index: 1;
}
```

---

## 5. AMBIENT PARALLAX & MOTION CONCEPTS

### Parallax Layer System
**Concept** : 3 couches de vitesse pour profondeur

```css
/* Layer 1: Background (10% speed) */
.parallax-bg {
    transform: translateY(calc(var(--scroll) * 0.1));
    will-change: transform;
}

/* Layer 2: Mid-ground (50% speed) */
.parallax-mid {
    transform: translateY(calc(var(--scroll) * 0.5));
    will-change: transform;
}

/* Layer 3: Foreground (100% speed - normal) */
.parallax-foreground {
    transform: translateY(calc(var(--scroll) * 1));
    will-change: transform;
}
```

**Valeurs JavaScript** :
```javascript
// Vitesses de parallax
const PARALLAX_SPEEDS = {
    background: 0.1,    // Très lent, lourd
    midground: 0.5,     // Moyen
    foreground: 1.0,     // Normal
    content: 1.0        // Texte toujours fixe
};

// Délai de fade pour entrée
const FADE_DELAYS = {
    fast: 0.1,
    medium: 0.2,
    slow: 0.4
};
```

---

### Motion Effect A: Slow Drift
**Usage** : Éléments décoratifs subtils
**Effet** : Mouvement latéral très lent

```css
@keyframes slow-drift {
    0% {
        transform: translateX(0) translateY(0);
        opacity: 0.3;
    }
    50% {
        transform: translateX(20px) translateY(-10px);
        opacity: 0.5;
    }
    100% {
        transform: translateX(0) translateY(0);
        opacity: 0.3;
    }
}

.drift-element {
    animation: slow-drift 20s ease-in-out infinite;
}
```

**Valeurs** :
- Durée : `20s` (très lent)
- Déplacement : `20px` max
- Opacité : `0.3 → 0.5 → 0.3`

---

### Motion Effect B: Gentle Fade In
**Usage** : Contenu qui entre dans le viewport
**Effet** : Apparition douce et progressive

```css
@keyframes gentle-fade-in {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-element {
    animation: gentle-fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: var(--delay, 0s);
}
```

**Valeurs** :
- Durée : `0.8s`
- Déplacement : `20px`
- Easing : `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 6. LIGHT & SHADOW SYSTEM

### Lighting Preset 1: Top Heavy (Zones Supérieures)
**Usage** : Hero, sections sombres
**Caractéristiques** : Ombres fortes, contraste élevé

```css
.lighting-top-heavy {
    /* Ombres multiples pour profondeur */
    box-shadow: 
        0 12px 32px rgba(10, 21, 32, 0.25),  /* Ombre principale profonde */
        0 6px 16px rgba(10, 21, 32, 0.15),  /* Ombre moyenne */
        0 2px 4px rgba(10, 21, 32, 0.1);    /* Ombre fine */
    
    /* Texte avec ombre pour lisibilité */
    text-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 1px 4px rgba(0, 0, 0, 0.2);
}

/* Valeurs */
- Shadow blur: 32px, 16px, 4px
- Shadow opacity: 0.25, 0.15, 0.1
- Text shadow: 8px blur, 0.3 opacity
```

---

### Lighting Preset 2: Balanced (Zones Intermédiaires)
**Usage** : Sections services, processus
**Caractéristiques** : Équilibre ombre/lumière

```css
.lighting-balanced {
    box-shadow: 
        0 8px 24px rgba(10, 21, 32, 0.12),
        0 4px 12px rgba(10, 21, 32, 0.08),
        0 1px 3px rgba(10, 21, 32, 0.04);
    
    text-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Valeurs */
- Shadow blur: 24px, 12px, 3px
- Shadow opacity: 0.12, 0.08, 0.04
- Text shadow: 3px blur, 0.1 opacity
```

---

### Lighting Preset 3: Bottom Light (Zones Inférieures)
**Usage** : Sections finales, contact
**Caractéristiques** : Ombres légères, lumière douce

```css
.lighting-bottom-light {
    box-shadow: 
        0 4px 16px rgba(10, 21, 32, 0.08),
        0 2px 8px rgba(10, 21, 32, 0.05),
        0 1px 2px rgba(10, 21, 32, 0.02);
    
    text-shadow: none; /* Pas d'ombre sur texte clair */
}

/* Valeurs */
- Shadow blur: 16px, 8px, 2px
- Shadow opacity: 0.08, 0.05, 0.02
- Text shadow: none
```

---

### Light Intensity Fade (Vertical)
**Règle** : L'intensité de la lumière augmente du haut vers le bas

```css
/* Calcul dynamique selon position scroll */
:root {
    --light-intensity-top: 0.25;    /* Haut : ombres fortes */
    --light-intensity-mid: 0.12;    /* Milieu : ombres moyennes */
    --light-intensity-bottom: 0.08;  /* Bas : ombres légères */
}

.section-top {
    --shadow-opacity: var(--light-intensity-top);
}

.section-mid {
    --shadow-opacity: var(--light-intensity-mid);
}

.section-bottom {
    --shadow-opacity: var(--light-intensity-bottom);
}
```

---

## 7. TYPOGRAPHY DEPTH RULES

### Headline Shadows (H1, H2)
**Règle** : Ombres subtiles pour profondeur, jamais agressives

```css
/* H1 - Hero (sur fond sombre) */
h1 {
    text-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.3),
        0 1px 2px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.03em;
}

/* H2 - Sections (sur fond clair) */
h2 {
    text-shadow: 
        0 2px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.05);
    letter-spacing: -0.02em;
}

/* H3 - Sous-titres (ombres très légères) */
h3 {
    text-shadow: 
        0 1px 2px rgba(0, 0, 0, 0.05);
    letter-spacing: -0.01em;
}
```

**Valeurs** :
- H1 : Triple ombre (12px, 6px, 2px blur)
- H2 : Double ombre (6px, 3px blur)
- H3 : Ombre simple (2px blur)

---

### Soft Text Embossing
**Usage** : Textes sur surfaces glassmorphism
**Effet** : Légère profondeur sans être 3D

```css
.text-embossed {
    text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.8),    /* Highlight */
        0 -1px 0 rgba(0, 0, 0, 0.1);        /* Shadow */
    color: var(--color-primary);
}

/* Application */
.ice-card h3 {
    text-shadow: 
        0 1px 0 rgba(255, 255, 255, 0.6),
        0 -1px 0 rgba(10, 21, 32, 0.08);
}
```

---

### Hierarchy Rules for Contrast + Depth

**Règle 1** : Plus le fond est sombre, plus l'ombre de texte est forte
```css
.dark-bg h1 {
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.light-bg h1 {
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
```

**Règle 2** : Hiérarchie par taille ET profondeur
```css
h1 { font-size: 3rem; text-shadow: 0 4px 12px rgba(0,0,0,0.4); }
h2 { font-size: 2rem; text-shadow: 0 2px 6px rgba(0,0,0,0.2); }
h3 { font-size: 1.5rem; text-shadow: 0 1px 3px rgba(0,0,0,0.1); }
```

**Règle 3** : Contraste minimum pour lisibilité
- Fond sombre + Texte clair : Ratio 4.5:1 minimum
- Fond clair + Texte sombre : Ratio 4.5:1 minimum

---

## 8. IMAGE TREATMENT GUIDELINES

### Treatment A: Soft Portrait Breakthrough
**Usage** : Images de personnes, équipes
**Effet** : Image qui "sort" légèrement du conteneur

```css
.image-breakthrough {
    border-radius: 20px;
    overflow: visible;
    position: relative;
}

.image-breakthrough img {
    border-radius: 20px;
    box-shadow: 
        0 12px 32px rgba(10, 21, 32, 0.2),
        0 6px 16px rgba(10, 21, 32, 0.15);
    transform: translateY(-8px);
    transition: transform var(--transition-smooth);
}

.image-breakthrough:hover img {
    transform: translateY(-12px);
    box-shadow: 
        0 16px 48px rgba(10, 21, 32, 0.25),
        0 8px 24px rgba(10, 21, 32, 0.2);
}
```

**Valeurs** :
- Déplacement : `-8px` (par défaut), `-12px` (hover)
- Shadow blur : `32px, 16px`
- Border radius : `20px`

---

### Treatment B: Layer Masks for Depth
**Usage** : Images sur gradients
**Effet** : Image qui se fond dans le fond

```css
.image-layer-mask {
    position: relative;
    overflow: hidden;
}

.image-layer-mask::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(180deg,
        transparent 0%,
        rgba(248, 250, 252, 0.6) 50%,
        rgba(248, 250, 252, 1) 100%
    );
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Hauteur du mask : `40%` de l'image
- Opacité : `0 → 0.6 → 1`
- Position : `bottom: 0`

---

### Treatment C: Bleed Over Gradients
**Usage** : Images qui débordent sur les gradients
**Effet** : Continuité visuelle, pas de coupure nette

```css
.image-bleed {
    margin: -40px -20px 0 -20px; /* Débordement */
    border-radius: 0 0 20px 20px; /* Coins arrondis bas seulement */
    overflow: hidden;
    position: relative;
}

.image-bleed img {
    width: calc(100% + 40px);
    height: auto;
    display: block;
    object-fit: cover;
}

/* Gradient overlay pour fusion */
.image-bleed::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(180deg,
        rgba(248, 250, 252, 1) 0%,
        rgba(248, 250, 252, 0.8) 30%,
        transparent 100%
    );
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Débordement : `-40px` haut, `-20px` côtés
- Overlay hauteur : `30%` de l'image
- Opacité : `1 → 0.8 → 0`

---

### Treatment D: Frosted Glass Overlay
**Usage** : Images avec texte par-dessus
**Effet** : Texte lisible sans masquer complètement l'image

```css
.image-frosted-overlay {
    position: relative;
}

.image-frosted-overlay::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.7) 100%
    );
    backdrop-filter: blur(8px);
    pointer-events: none;
    z-index: 1;
}
```

**Valeurs** :
- Hauteur : `50%` de l'image
- Backdrop blur : `8px`
- Opacité : `0 → 0.3 → 0.7`

---

## 📐 RÈGLES D'APPLICATION GLOBALES

### Règle 1: Continuité Verticale
- **Jamais** de fond blanc brut sans gradient
- **Toujours** une transition progressive entre sections
- **Utiliser** les gradient bridges pour les transitions

### Règle 2: Profondeur Cohérente
- **Toujours** utiliser les 3 niveaux de depth (low, medium, high)
- **Respecter** la hiérarchie : éléments importants = depth élevé
- **Hover** augmente toujours d'un niveau

### Règle 3: Motion Subtile
- **Vitesse max** : 0.1 pour background parallax
- **Durée min** : 0.8s pour animations
- **Jamais** d'animations flashy ou rapides

### Règle 4: Lisibilité Avant Tout
- **Contraste minimum** : 4.5:1
- **Text shadows** sur fonds complexes
- **Backdrop blur** pour surfaces glassmorphism

### Règle 5: Cohérence Visuelle
- **Même** système d'ombres partout
- **Même** border radius (16px, 20px, 24px)
- **Même** transitions (cubic-bezier(0.4, 0, 0.2, 1))

---

## 🎯 CHECKLIST D'APPLICATION

Pour chaque nouvelle section :

- [ ] Gradient approprié selon zone (A/B/C)
- [ ] Texture subtile appliquée
- [ ] Depth container au bon niveau
- [ ] Transition fluide avec section précédente
- [ ] Parallax configuré si nécessaire
- [ ] Lighting preset appliqué
- [ ] Typography shadows selon fond
- [ ] Images traitées selon guidelines
- [ ] Hover states définis
- [ ] Mobile responsive vérifié

---

**Ce système garantit une expérience immersive avec profondeur spatiale constante, continuité visuelle fluide et cohésion totale, similaire à erco.ca.**

