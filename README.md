# GeekPage

Site statique de recherche et de veille sur les jeux vidéo.

## Publier le site

1. Créer un dépôt GitHub, par exemple `geekpage`.
2. Envoyer tous les fichiers de ce dossier sur la branche `main`.
3. Dans GitHub, ouvrir **Settings > Pages**.
4. Dans **Build and deployment**, choisir **GitHub Actions**.
5. Attendre la fin du workflow **Publier GeekPage**.

L’adresse sera généralement :

```text
https://<nom-utilisateur>.github.io/<nom-du-depot>/
```

Le workflow `.github/workflows/deploy-pages.yml` republie le site à chaque modification de la branche `main`. Le workflow `weekly-update.yml` peut mettre à jour la veille automatiquement chaque lundi.
