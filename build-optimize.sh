#!/bin/bash

# Script d'optimisation pour build production
# Minifie CSS et JS pour réduire la taille

echo "🚀 Optimisation des fichiers pour production..."

# Minifier CSS
if command -v cssnano &> /dev/null; then
    echo "📦 Minification CSS..."
    for css in styles*.css; do
        if [ -f "$css" ]; then
            cssnano "$css" "$css.min" --no-autoprefixer 2>/dev/null || echo "⚠️  cssnano non disponible, CSS non minifié"
        fi
    done
else
    echo "⚠️  cssnano non installé. Installation: npm install -g cssnano-cli"
fi

# Minifier JS
if command -v terser &> /dev/null; then
    echo "📦 Minification JavaScript..."
    terser script.js -o script.min.js -c -m --comments false 2>/dev/null || echo "⚠️  terser non disponible, JS non minifié"
else
    echo "⚠️  terser non installé. Installation: npm install -g terser"
fi

echo "✅ Optimisation terminée!"
echo ""
echo "📊 Taille des fichiers:"
du -sh styles*.css script.js 2>/dev/null | sort -h

