#!/bin/bash

# Script de build production complet
# Minifie CSS/JS, optimise les assets, prépare pour déploiement

set -e

echo "🚀 Build Production - Déneigement Nordique Expert"
echo "=================================================="
echo ""

# Créer dossier dist si n'existe pas
mkdir -p dist
mkdir -p dist/images
mkdir -p dist/videos

# 1. Minifier CSS
echo "📦 Minification CSS..."
if command -v cssnano &> /dev/null || [ -f node_modules/.bin/cssnano ]; then
    for css in styles*.css; do
        if [ -f "$css" ]; then
            echo "  → Minifying $css..."
            if [ -f node_modules/.bin/cssnano ]; then
                node_modules/.bin/cssnano "$css" "dist/${css%.css}.min.css" --no-autoprefixer 2>/dev/null || cp "$css" "dist/$css"
            else
                cssnano "$css" "dist/${css%.css}.min.css" --no-autoprefixer 2>/dev/null || cp "$css" "dist/$css"
            fi
        fi
    done
    echo "  ✅ CSS minifié"
else
    echo "  ⚠️  cssnano non disponible, copie des fichiers CSS originaux"
    cp styles*.css dist/ 2>/dev/null || true
fi

# 2. Minifier JavaScript
echo "📦 Minification JavaScript..."
if command -v terser &> /dev/null || [ -f node_modules/.bin/terser ]; then
    echo "  → Minifying script.js..."
    if [ -f node_modules/.bin/terser ]; then
        node_modules/.bin/terser script.js -o dist/script.min.js \
            -c passes=2,drop_console=true,drop_debugger=true \
            -m toplevel=true,safari10=true \
            --comments false \
            --compress unsafe=true,unsafe_math=true \
            2>/dev/null || cp script.js dist/script.js
    else
        terser script.js -o dist/script.min.js \
            -c passes=2,drop_console=true,drop_debugger=true \
            -m toplevel=true,safari10=true \
            --comments false \
            --compress unsafe=true,unsafe_math=true \
            2>/dev/null || cp script.js dist/script.js
    fi
    echo "  ✅ JavaScript minifié"
else
    echo "  ⚠️  terser non disponible, copie du fichier JS original"
    cp script.js dist/ 2>/dev/null || true
fi

# 3. Copier fichiers statiques
echo "📁 Copie des fichiers statiques..."
cp index.html dist/ 2>/dev/null || true
cp sw.js dist/ 2>/dev/null || true
cp robots.txt dist/ 2>/dev/null || true
cp sitemap.xml dist/ 2>/dev/null || true
cp vercel.json dist/ 2>/dev/null || true
cp -r images/* dist/images/ 2>/dev/null || true
cp -r videos/* dist/videos/ 2>/dev/null || true
cp -r services dist/ 2>/dev/null || true
cp -r zones dist/ 2>/dev/null || true
cp -r types-batiments dist/ 2>/dev/null || true
cp -r types-toits dist/ 2>/dev/null || true
cp -r problemes-risques dist/ 2>/dev/null || true
cp -r reglementation dist/ 2>/dev/null || true
echo "  ✅ Fichiers copiés"

# 4. Créer version production de index.html avec fichiers minifiés
echo "🔧 Création index.html production..."
if [ -f dist/index.html ]; then
    # Remplacer les références CSS/JS par versions minifiées
    sed -i.bak 's/styles\.css/styles.min.css/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/styles\.css/styles.min.css/g' dist/index.html 2>/dev/null || true
    
    sed -i.bak 's/styles-greenora\.css/styles-greenora.min.css/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/styles-greenora\.css/styles-greenora.min.css/g' dist/index.html 2>/dev/null || true
    
    sed -i.bak 's/styles-nav-premium\.css/styles-nav-premium.min.css/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/styles-nav-premium\.css/styles-nav-premium.min.css/g' dist/index.html 2>/dev/null || true
    
    sed -i.bak 's/styles-clean-design\.css/styles-clean-design.min.css/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/styles-clean-design\.css/styles-clean-design.min.css/g' dist/index.html 2>/dev/null || true
    
    sed -i.bak 's/styles-greenora-exact\.css/styles-greenora-exact.min.css/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/styles-greenora-exact\.css/styles-greenora-exact.min.css/g' dist/index.html 2>/dev/null || true
    
    sed -i.bak 's/script\.js/script.min.js/g' dist/index.html 2>/dev/null || \
    sed -i '' 's/script\.js/script.min.js/g' dist/index.html 2>/dev/null || true
    
    rm -f dist/index.html.bak 2>/dev/null || true
    echo "  ✅ index.html optimisé"
fi

# 5. Statistiques
echo ""
echo "📊 Statistiques Build:"
echo "======================"
if [ -d dist ]; then
    echo "Taille totale dist/:"
    du -sh dist/ | awk '{print "  " $1}'
    echo ""
    echo "Fichiers CSS:"
    ls -lh dist/*.css 2>/dev/null | awk '{print "  " $9 " - " $5}' || echo "  Aucun fichier CSS"
    echo ""
    echo "Fichiers JS:"
    ls -lh dist/*.js 2>/dev/null | awk '{print "  " $9 " - " $5}' || echo "  Aucun fichier JS"
fi

echo ""
echo "✅ Build production terminé!"
echo "📦 Dossier dist/ prêt pour déploiement"

