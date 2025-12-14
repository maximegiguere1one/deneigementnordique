#!/bin/bash

# Script pour créer des versions responsive des images AVIF avec ffmpeg
# Nécessite: ffmpeg avec support AVIF

cd "$(dirname "$0")/images"

echo "🖼️  Création des versions responsive AVIF avec ffmpeg..."

# Fonction pour créer les versions responsive
create_responsive() {
    local input="$1"
    local basename="${input%.avif}"
    
    echo "  📸 Traitement de: $input"
    
    # Obtenir les dimensions de l'image originale
    local width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$input" 2>/dev/null)
    
    if [ -z "$width" ]; then
        echo "    ⚠️  Impossible de lire les dimensions, utilisation de valeurs par défaut"
        width=1920
    fi
    
    echo "    📏 Largeur originale: ${width}px"
    
    # Mobile: 768px max-width
    if [ "$width" -gt 768 ]; then
        ffmpeg -i "$input" -vf "scale=768:-1" -c:v libaom-av1 -crf 30 -b:v 0 "${basename}-mobile.avif" -y 2>/dev/null && \
        echo "    ✅ Mobile créé (768px)" || echo "    ❌ Erreur mobile"
    else
        echo "    ⏭️  Image déjà < 768px, copie pour mobile"
        cp "$input" "${basename}-mobile.avif" 2>/dev/null
    fi
    
    # Tablet: 1280px max-width
    if [ "$width" -gt 1280 ]; then
        ffmpeg -i "$input" -vf "scale=1280:-1" -c:v libaom-av1 -crf 28 -b:v 0 "${basename}-tablet.avif" -y 2>/dev/null && \
        echo "    ✅ Tablet créé (1280px)" || echo "    ❌ Erreur tablet"
    else
        echo "    ⏭️  Image déjà < 1280px, copie pour tablet"
        cp "$input" "${basename}-tablet.avif" 2>/dev/null
    fi
    
    # Desktop: 1920px max-width (si l'original est plus grand)
    if [ "$width" -gt 1920 ]; then
        ffmpeg -i "$input" -vf "scale=1920:-1" -c:v libaom-av1 -crf 26 -b:v 0 "${basename}-desktop.avif" -y 2>/dev/null && \
        echo "    ✅ Desktop créé (1920px)" || echo "    ❌ Erreur desktop"
    else
        echo "    ⏭️  Image déjà < 1920px, copie pour desktop"
        cp "$input" "${basename}-desktop.avif" 2>/dev/null
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
ls -lh *-mobile.avif *-tablet.avif *-desktop.avif 2>/dev/null | awk '{print "  " $9, "-", $5}' || echo "  Aucun fichier créé"

