# 📋 PLAN D'IMPLÉMENTATION - MAILLAGE INTERNE
## Guide d'Exécution Étape par Étape

---

## 🎯 OBJECTIF
Implémenter la stratégie de maillage interne définie dans `STRATEGIE-MAILLAGE-INTERNE.md` de manière systématique et vérifiable.

---

## 📊 STRUCTURE DE TRAVAIL

### Fichiers à Modifier (par Priorité)

#### PRIORITÉ 1 - Pages Piliers (6 fichiers)
1. `services/deneigement-toit-commercial.html`
2. `services/deneigement-toit-industriel.html`
3. `services/deneigement-toit-institutionnel.html`
4. `services/gestion-charge-neige.html`
5. `services/securite-conformite-cnesst.html`
6. `services/inspection-hivernale-toitures.html`

#### PRIORITÉ 2 - Page d'Accueil
7. `index.html`

#### PRIORITÉ 3 - Pages Services Spécifiques (8 fichiers)
8. `services/deneigement-manuel-toits-commerciaux.html`
9. `services/deneigement-toit-urgence-24-7.html`
10. `services/contrat-saisonnier-deneigement-toit.html`
11. `services/deneigement-apres-tempete-majeure.html`
12. `services/enlevement-glace-deglacage-toiture.html`
13. `services/deneigement-securitaire-unites-mecaniques.html`
14. `services/deneigement-preventif-toiture.html`
15. `services/inspection-rapport-conformite-toiture.html`

#### PRIORITÉ 4 - Pages Problèmes/Risques (6 fichiers)
16-21. Toutes les pages dans `problemes-risques/`

#### PRIORITÉ 5 - Pages Réglementation (4 fichiers)
22-25. Toutes les pages dans `reglementation/`

#### PRIORITÉ 6 - Pages Types de Bâtiments (8 fichiers)
26-33. Toutes les pages dans `types-batiments/`

#### PRIORITÉ 7 - Pages Types de Toits (6 fichiers)
34-39. Toutes les pages dans `types-toits/`

#### PRIORITÉ 8 - Pages Locales (20 fichiers)
40-59. Toutes les pages dans `zones/`

---

## 🔧 TEMPLATE DE LIEN INTERNE

### Format Standard
```html
<a href="../services/deneigement-toit-commercial.html" title="Déneigement de toit commercial au Lac-Saint-Jean">déneigement de toit commercial</a>
```

### Emplacement Recommandé
- **Dans le contenu principal** : Intégré naturellement dans les paragraphes
- **Section "Services connexes"** : Liste structurée en fin de page
- **Section "En savoir plus"** : Liens contextuels

---

## 📝 EXEMPLES DE SECTIONS À AJOUTER

### Section "Services Connexes" (à ajouter avant le footer)

```html
<section class="related-services" style="background: #F4F6F8; padding: 3rem 2rem; margin-top: 4rem; border-radius: 12px;">
    <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #1F3A56;">Services Connexes</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
        <a href="../services/deneigement-toit-commercial.html" style="color: #1F7A4D; text-decoration: none; font-weight: 600;">
            → Déneigement de toit commercial
        </a>
        <a href="../services/gestion-charge-neige.html" style="color: #1F7A4D; text-decoration: none; font-weight: 600;">
            → Gestion de la charge de neige
        </a>
        <!-- Ajouter autres liens selon stratégie -->
    </div>
</section>
```

### Section "Zones Desservies" (pour pages services)

```html
<section class="served-areas" style="margin-top: 3rem; padding: 2rem; background: white; border-radius: 8px;">
    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #1F3A56;">Zones Desservies</h3>
    <p style="color: #555; margin-bottom: 1rem;">
        Nous offrons ce service dans toute la région du Lac-Saint-Jean, incluant 
        <a href="../zones/deneigement-toit-commercial-alma.html" style="color: #1F7A4D;">Alma</a>, 
        <a href="../zones/deneigement-toit-commercial-roberval.html" style="color: #1F7A4D;">Roberval</a>, 
        <a href="../zones/deneigement-toit-commercial-dolbeau-mistassini.html" style="color: #1F7A4D;">Dolbeau-Mistassini</a>, 
        et <a href="../zones/deneigement-toit-commercial-lac-saint-jean.html" style="color: #1F7A4D;">toute la région</a>.
    </p>
</section>
```

---

## ✅ CHECKLIST PAR PAGE TYPE

### Pour Chaque Page Pilier
- [ ] Section "Services Connexes" avec 8-12 liens
- [ ] Liens intégrés dans le contenu (3-5 liens)
- [ ] Section "Zones Desservies" avec 3-5 liens locaux
- [ ] Liens vers pages problèmes/risques pertinentes
- [ ] Liens vers pages réglementation pertinentes

### Pour Chaque Page Service Spécifique
- [ ] Lien vers pilier principal (dans introduction)
- [ ] Lien vers pilier secondaire (dans contenu)
- [ ] 2-3 liens vers pages support
- [ ] 1 lien vers page locale

### Pour Chaque Page Problème/Risque
- [ ] Lien vers service correspondant
- [ ] Lien vers pilier principal
- [ ] Lien vers page locale
- [ ] Lien vers page réglementation

### Pour Chaque Page Locale
- [ ] Lien vers pilier commercial
- [ ] 2-3 liens vers villes proches
- [ ] 1 lien vers page réglementation
- [ ] 1 lien vers page problème/risque

---

## 🎯 MÉTRIQUES DE SUCCÈS

### Avant Implémentation
- Pages orphelines : À vérifier
- Liens internes moyens par page : ~2-3
- Profondeur maximale : À mesurer

### Après Implémentation
- Pages orphelines : 0
- Liens internes moyens par page : 8-12
- Profondeur maximale : 3 clics max
- Liens vers piliers : 20-30 par pilier

---

## 🚀 COMMANDES DE VÉRIFICATION

### Vérifier Pages Orphelines
```bash
# Trouver pages sans liens internes sortants
grep -L "href=\"\.\./" services/*.html types-*/*.html problemes-*/*.html
```

### Compter Liens par Page
```bash
# Compter liens internes dans chaque page
for file in services/*.html; do echo "$file: $(grep -o 'href="\.\./' "$file" | wc -l)"; done
```

### Vérifier Liens vers Piliers
```bash
# Vérifier présence de liens vers piliers
grep -r "deneigement-toit-commercial.html" services/ types-*/ problemes-*/ zones/
```

---

## 📋 PROCHAINES ÉTAPES

1. **Réviser ce plan** avec l'équipe
2. **Implémenter Phase 1** (Pages piliers + index.html)
3. **Vérifier résultats** avec outils SEO
4. **Implémenter Phase 2** (Pages support)
5. **Audit complet** de maillage interne
6. **Optimisation continue** basée sur données

---

**Ce plan garantit une implémentation méthodique et vérifiable du maillage interne.**

