#!/bin/bash

# Script pour créer des versions responsive des images AVIF
# Nécessite: ImageMagick ou libavif-tools

cd "$(dirname "$0")/images"

echo "🖼️  Création des versions responsive AVIF..."

# Fonction pour créer les versions responsive
create_responsive() {
    local input="$1"
    local basename="${input%.avif}"
    
    echo "  📸 Traitement de: $input"
    
    # Vérifier si ImageMagick est disponible
    if command -v magick &> /dev/null; then
        echo "    ✅ Utilisation ImageMagick"
        
        # Mobile: 768px max-width
        magick "$input" -resize 768x\> -quality 80 "${basename}-mobile.avif" 2>/dev/null && echo "    ✅ Mobile créé (768px)" || echo "    ❌ Erreur mobile"
        
        # Tablet: 1280px max-width
        magick "$input" -resize 1280x\> -quality 85 "${basename}-tablet.avif" 2>/dev/null && echo "    ✅ Tablet créé (1280px)" || echo "    ❌ Erreur tablet"
        
        # Desktop: 1920px max-width (si l'original est plus grand)
        magick "$input" -resize 1920x\> -quality 90 "${basename}-desktop.avif" 2>/dev/null && echo "    ✅ Desktop créé (1920px)" || echo "    ❌ Erreur desktop"
        
    # Vérifier si avifenc est disponible
    elif command -v avifenc &> /dev/null; then
        echo "    ✅ Utilisation avifenc"
        
        # Convertir d'abord en PNG temporaire pour redimensionner
        if command -v convert &> /dev/null; then
            # Mobile
            convert "$input" -resize 768x\> "${basename}-mobile-tmp.png" 2>/dev/null
            avifenc -c libaom -s 4 -q 80 "${basename}-mobile-tmp.png" "${basename}-mobile.avif" 2>/dev/null && echo "    ✅ Mobile créé" || echo "    ❌ Erreur mobile"
            rm -f "${basename}-mobile-tmp.png"
            
            # Tablet
            convert "$input" -resize 1280x\> "${basename}-tablet-tmp.png" 2>/dev/null
            avifenc -c libaom -s 4 -q 85 "${basename}-tablet-tmp.png" "${basename}-tablet.avif" 2>/dev/null && echo "    ✅ Tablet créé" || echo "    ❌ Erreur tablet"
            rm -f "${basename}-tablet-tmp.png"
            
            # Desktop
            convert "$input" -resize 1920x\> "${basename}-desktop-tmp.png" 2>/dev/null
            avifenc -c libaom -s 4 -q 90 "${basename}-desktop-tmp.png" "${basename}-desktop.avif" 2>/dev/null && echo "    ✅ Desktop créé" || echo "    ❌ Erreur desktop"
            rm -f "${basename}-desktop-tmp.png"
        fi
        
    else
        echo "    ⚠️  Aucun outil trouvé. Installation requise:"
        echo "       macOS: brew install imagemagick"
        echo "       Linux: apt-get install imagemagick"
        echo "       Ou: npm install -g sharp-cli"
        return 1
    fi
}

# Traiter les 3 images principales
if [ -f "equipe entrain de deneiger(3personenes).avif" ]; then
    create_responsive "equipe entrain de deneiger(3personenes).avif"
fi

if [ -f "4 deneigeurs sur toit plat .avif" ]; then
    create_responsive "4 deneigeurs sur toit plat .avif"
fi

if [ -f "4 deneigeur sur toit plat avec mordure.avif" ]; then
    create_responsive "4 deneigeur sur toit plat avec mordure.avif"
fi

echo ""
echo "✅ Traitement terminé!"
echo ""
echo "📋 Fichiers créés:"
ls -lh *-mobile.avif *-tablet.avif *-desktop.avif 2>/dev/null | awk '{print "  " $9, "-", $5}'

