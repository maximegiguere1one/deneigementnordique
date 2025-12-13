# 🔧 SCRIPT POUR AJOUTER LIENS RESTANTS
## Guide Rapide pour Compléter le Maillage Interne

---

## ✅ PAGES DÉJÀ COMPLÉTÉES

### Phase 1 - Piliers (7/7) ✅
- ✅ index.html
- ✅ services/deneigement-toit-commercial.html
- ✅ services/deneigement-toit-industriel.html
- ✅ services/deneigement-toit-institutionnel.html
- ✅ services/gestion-charge-neige.html
- ✅ services/securite-conformite-cnesst.html
- ✅ services/inspection-hivernale-toitures.html

### Phase 2 - Services Spécifiques (3/8) ✅
- ✅ services/deneigement-manuel-toits-commerciaux.html
- ✅ services/deneigement-toit-urgence-24-7.html
- ✅ services/contrat-saisonnier-deneigement-toit.html

---

## ⏳ PAGES RESTANTES À MODIFIER

### Services Spécifiques (5 pages)
1. `services/deneigement-apres-tempete-majeure.html`
2. `services/enlevement-glace-deglacage-toiture.html`
3. `services/deneigement-securitaire-unites-mecaniques.html`
4. `services/deneigement-preventif-toiture.html`
5. `services/inspection-rapport-conformite-toiture.html`

**Template à appliquer :**
```html
<!-- Dans le premier paragraphe principal, ajouter : -->
Ce service fait partie de notre offre de <a href="deneigement-toit-industriel.html" style="color: #1F7A4D; font-weight: 600; text-decoration: underline;">déneigement de toits industriels</a> 
et s'intègre avec notre <a href="gestion-charge-neige.html" style="color: #1F7A4D; font-weight: 600; text-decoration: underline;">gestion de la charge de neige</a>.

<!-- Avant le CTA final, ajouter : -->
<!-- Services Connexes -->
<section class="related-services" style="background: #F4F6F8; padding: 3rem 2rem; margin-top: 4rem; border-radius: 12px;">
    <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #1F3A56;">Services Connexes</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
        <div>
            <h3 style="color: #1F7A4D; margin-bottom: 0.5rem; font-size: 1.2rem;">Service Principal</h3>
            <ul style="list-style: none; padding: 0; line-height: 2;">
                <li><a href="[PILIER_PRINCIPAL].html" style="color: #1F3A56; text-decoration: none;">→ [Nom du pilier]</a></li>
            </ul>
            <h3 style="color: #1F7A4D; margin-bottom: 0.5rem; font-size: 1.2rem; margin-top: 1.5rem;">Services Complémentaires</h3>
            <ul style="list-style: none; padding: 0; line-height: 2;">
                <li><a href="[SERVICE_1].html" style="color: #1F3A56; text-decoration: none;">→ [Nom service]</a></li>
                <li><a href="[SERVICE_2].html" style="color: #1F3A56; text-decoration: none;">→ [Nom service]</a></li>
            </ul>
        </div>
        <div>
            <h3 style="color: #1F7A4D; margin-bottom: 0.5rem; font-size: 1.2rem;">Zone Desservie</h3>
            <ul style="list-style: none; padding: 0; line-height: 2;">
                <li><a href="../zones/[PAGE_LOCALE].html" style="color: #1F3A56; text-decoration: none;">→ [Nom zone]</a></li>
            </ul>
        </div>
    </div>
</section>
```

### Problèmes/Risques (6 pages)
**Template :**
- Lien vers service correspondant dans introduction
- Lien vers pilier principal
- Lien vers page locale
- Lien vers page réglementation

### Réglementation (4 pages)
**Template :**
- Lien vers pilier sécurité dans introduction
- 1-2 liens vers pages problèmes
- 1 lien vers page locale

### Types de Bâtiments (8 pages)
**Template :**
- Lien vers pilier correspondant dans introduction
- 1-2 liens vers pages support
- 1 lien vers page locale

### Types de Toits (6 pages)
**Template :**
- Lien vers pilier commercial dans introduction
- 1-2 liens vers pages support

### Locales (20 pages)
**Template :**
- Lien vers pilier commercial dans introduction
- 2-3 liens vers villes proches
- 1 lien vers page réglementation
- 1 lien vers page problème/risque

---

## 📋 RÉFÉRENCE RAPIDE PAR PAGE

Consultez `STRATEGIE-MAILLAGE-INTERNE.md` pour les détails complets de chaque page.

---

**Note :** Ce script sert de guide. Les modifications doivent être faites manuellement selon la stratégie définie.

