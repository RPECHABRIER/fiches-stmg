# Fiches interactives — Terminale STMG

Présentation interactive pour vidéoprojeter tes séances : cours à trous révélés au clic, automatismes chronométrés, exercices avec correction masquée, et une slide finale animée pour le bilan de fin d'heure.

## Voir la séance 1 en local

Comme le site charge les contenus via des balises `<script>`, tu peux ouvrir les fichiers `.html` **directement en double-cliquant dessus** (pas besoin de serveur). Si un jour un navigateur bloque le chargement en local, lance un petit serveur :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

- `index.html` → page d'accueil listant toutes les séances
- `seance.html?s=s1-ce1` → ouvre directement la séance 1

## Pendant le cours

| Touche | Action |
|---|---|
| `→` / `Espace` / clic sur le fond | Révèle le prochain trou/élément, sinon passe à la slide suivante |
| `←` | Slide précédente |
| Clic sur un trou précis | Révèle **cette** réponse en particulier (pratique pour interroger un·e élève au hasard) |
| `R` | Révèle tout d'un coup sur la slide en cours |
| `F` | Plein écran |
| `Home` / `End` | Première / dernière slide |

La dernière slide (bilan de fin de séance) se déclenche automatiquement avec une animation de confettis quand tu l'atteins.

## Créer une nouvelle séance

Le moteur (`assets/engine.js` + `assets/style.css`) est générique : il ne contient aucun contenu de cours. Pour une nouvelle fiche :

1. Duplique `data/s1-ce1.js` → `data/s2-xxx.js` (choisis un identifiant court, sans espace).
2. Modifie le contenu à l'intérieur (voir les types de slides ci-dessous).
3. Ajoute une ligne dans `data/manifest.js` pour que la séance apparaisse sur la page d'accueil.
4. Ouvre `seance.html?s=s2-xxx` pour vérifier, puis pousse sur GitHub.

### Types de slides disponibles

- **`title`** — page de garde (kicker, titre, sous-titre, phrase d'accroche).
- **`objectif`** — objectif de la séance, avec une icône.
- **`organisation`** — cartes animées (ex. fonctionnement de l'année : fiches / évaluations courtes / évaluations longues). Modifie la liste `cards`.
- **`flash`** — questions flash chronométrées, une liste `questions` de `{ q, a }`.
- **`cours`** — cours avec des trous à révéler. Chaque `block` a un `label` et des `paragraphs`. Dans un `paragraph`, `segments` est un tableau où :
  - une chaîne de caractères = texte normal,
  - `{ b: "réponse" }` = un trou cliquable qui révèle "réponse".
  - `big: true` sur un paragraphe = affichage centré et plus gros (utile pour une formule).
- **`exercice`** — un `context` (énoncé) + une liste `questions` de `{ text, answer }` (la correction reste masquée jusqu'au clic).
- **`bilan`** — liste `items`, chacun avec des `segments` (même syntaxe que pour `cours`).
- **`fin`** — slide de clôture animée (confettis automatiques). `recap` est une liste de phrases affichées en cascade.

### Exemple minimal d'un trou

```js
{
  segments: [
    "La proportion se calcule en divisant l'effectif de la ",
    { b: "sous-population" },
    " par l'effectif de la ",
    { b: "population totale" },
    ".",
  ],
}
```

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub (public ou privé selon ton établissement) et pousse tout ce dossier.
2. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/ (root)`.
3. Ton site sera accessible à une adresse du type `https://<ton-compte>.github.io/<nom-du-repo>/`.
4. Pour projeter une séance précise en cours, utilise directement le lien `.../seance.html?s=s1-ce1`.

## Personnaliser le style

Toutes les couleurs et animations sont centralisées dans `assets/style.css` (variables CSS en haut du fichier : `--indigo`, `--orange`, `--pink`, etc.). Change ces couleurs une fois et toutes les séances suivent automatiquement.
