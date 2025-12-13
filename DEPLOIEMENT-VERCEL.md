# 🚀 Guide de Déploiement sur Vercel

## Étape 1 : Connecter le dépôt GitHub à Vercel

1. **Allez sur [vercel.com](https://vercel.com)** et connectez-vous avec votre compte GitHub

2. **Cliquez sur "Add New Project"** ou "New Project"

3. **Importez le dépôt**
   - Recherchez `maximegiguere1one/deneigementnordique`
   - Cliquez sur "Import"

## Étape 2 : Configuration du projet

Vercel détectera automatiquement :
- ✅ Framework Preset: **Other** (site statique)
- ✅ Root Directory: `.` (racine)
- ✅ Build Command: `npm run vercel-build` (défini dans vercel.json)
- ✅ Output Directory: `.` (défini dans vercel.json)

**Vous pouvez laisser les paramètres par défaut** car tout est déjà configuré dans `vercel.json`.

## Étape 3 : Configurer le domaine personnalisé

1. **Après le premier déploiement**, allez dans **Settings** → **Domains**

2. **Ajoutez votre domaine**
   - Cliquez sur "Add Domain"
   - Entrez : `deneigementnordique.com`
   - Cliquez sur "Add"

3. **Configurez les DNS**
   Vercel vous donnera des enregistrements DNS à ajouter :
   
   **Type A** :
   ```
   Name: @
   Value: 76.76.21.21
   TTL: Auto
   ```
   
   **Type CNAME** (si vous utilisez www) :
   ```
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

4. **Où configurer les DNS ?**
   - Allez chez votre registrar de domaine (ex: GoDaddy, Namecheap, etc.)
   - Trouvez la section "DNS Management" ou "Zone DNS"
   - Ajoutez les enregistrements fournis par Vercel
   - Attendez la propagation DNS (peut prendre jusqu'à 48h, généralement quelques minutes)

## Étape 4 : Déploiement automatique

✅ **C'est tout !** Chaque fois que vous poussez du code sur la branche `main` de GitHub, Vercel déploiera automatiquement votre site.

## 🔧 Configuration actuelle

Le fichier `vercel.json` contient :
- ✅ Configuration pour site statique
- ✅ Headers de sécurité (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Cache optimisé pour les assets (images, CSS, JS)
- ✅ Routes configurées

## 📝 Commandes utiles

### Vérifier le statut du déploiement
- Allez sur votre dashboard Vercel
- Cliquez sur votre projet
- Vous verrez l'historique des déploiements

### Déployer manuellement
Si besoin, vous pouvez déclencher un déploiement manuel depuis le dashboard Vercel.

### Voir les logs
Dans chaque déploiement, cliquez sur "View Function Logs" pour voir les logs de build.

## 🐛 Résolution de problèmes

### Le site ne se déploie pas
1. Vérifiez que le dépôt GitHub est bien connecté
2. Vérifiez les logs de build dans Vercel
3. Assurez-vous que `vercel.json` est présent à la racine

### Le domaine ne fonctionne pas
1. Vérifiez que les DNS sont bien configurés (utilisez [whatsmydns.net](https://www.whatsmydns.net))
2. Attendez la propagation DNS (jusqu'à 48h)
3. Vérifiez dans Vercel → Settings → Domains que le domaine est "Valid"

### Erreur de build
- Vérifiez que `package.json` contient bien la commande `vercel-build`
- Les sites statiques ne nécessitent généralement pas de build complexe

## 📞 Support

Pour toute question sur Vercel :
- Documentation : [vercel.com/docs](https://vercel.com/docs)
- Support : [vercel.com/support](https://vercel.com/support)

