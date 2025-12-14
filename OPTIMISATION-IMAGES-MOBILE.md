# 🖼️ Guide d'Optimisation des Images pour Mobile

## Problème Identifié par PageSpeed Insights

Les images JPEG sont trop lourdes pour mobile :
- **Total : 1,898.4 KiB** (1.9 MB)
- **Économies possibles : 1,708.3 KiB** (1.7 MB)
- **Problème principal :** Images trop grandes pour les dimensions affichées

## Solutions Recommandées

### 1. Conversion en WebP/AVIF (Priorité HAUTE)

Les formats modernes réduisent la taille de 30-50% :
- **WebP** : Supporté par 95%+ des navigateurs
- **AVIF** : Encore meilleur, mais support limité

**Images à convertir :**
1. `equipe entrain de deneiger(3personenes).jpeg` (749.6 KiB → ~250 KiB en WebP)
2. `4 deneigeur sur toit plat avec mordure.jpeg` (593.2 KiB → ~200 KiB en WebP)
3. `4 deneigeurs sur toit plat .jpeg` (555.6 KiB → ~185 KiB en WebP)

### 2. Créer des Versions Responsives

Pour chaque image, créer 3 versions :
- **Mobile** : max-width 768px (qualité 75%)
- **Tablet** : max-width 1280px (qualité 80%)
- **Desktop** : max-width 1920px (qualité 85%)

### 3. Utiliser `<picture>` avec Fallback

```html
<picture>
  <source srcset="images/equipe-mobile.webp" media="(max-width: 768px)" type="image/webp">
  <source srcset="images/equipe-tablet.webp" media="(max-width: 1280px)" type="image/webp">
  <source srcset="images/equipe-desktop.webp" type="image/webp">
  <img src="images/equipe entrain de deneiger(3personenes).jpeg" 
       alt="Équipe de déneigement" 
       width="1920" 
       height="1080"
       loading="eager"
       fetchpriority="high">
</picture>
```

### 4. Outils de Conversion

**En ligne :**
- [Squoosh.app](https://squoosh.app/) - Google
- [CloudConvert](https://cloudconvert.com/)

**En ligne de commande :**
```bash
# Installer cwebp
brew install webp  # macOS
apt-get install webp  # Linux

# Convertir en WebP
cwebp -q 80 input.jpeg -o output.webp

# Créer versions responsive
cwebp -q 75 -resize 768 0 input.jpeg -o input-mobile.webp
cwebp -q 80 -resize 1280 0 input.jpeg -o input-tablet.webp
cwebp -q 85 input.jpeg -o input-desktop.webp
```

### 5. Compression JPEG Optimale

Si vous gardez JPEG :
- **Qualité : 75-80%** pour mobile
- **Progressive JPEG** activé
- **Dimensions réduites** selon viewport

## Actions Immédiates

1. ✅ **Fait** : Ajout de `sizes` sur toutes les images
2. ⏳ **À faire** : Convertir images en WebP
3. ⏳ **À faire** : Créer versions responsive (mobile/tablet/desktop)
4. ⏳ **À faire** : Implémenter `<picture>` avec fallback

## Impact Attendu

- **Réduction taille :** 1.7 MB → ~600 KB (70% de réduction)
- **Amélioration LCP :** -500ms à -1s
- **Score PageSpeed Mobile :** +20 à +30 points

