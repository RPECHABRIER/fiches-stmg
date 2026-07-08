/* =========================================================================
   Séance : Semaine 1 – CE1 — Bienvenue en Terminale STMG !
   Source : S1_CE1_Diagnostic_automatismes.pdf
   ========================================================================= */

window.SESSION_DATA = {
  title: "Semaine 1 – Séance CE1",
  subtitle: "Bienvenue en Terminale STMG !",

  slides: [
    {
      type: "title",
      kicker: "Terminale STMG · Mathématiques",
      title: "Bienvenue en Terminale STMG !",
      subtitle: "Semaine 1 — Séance CE1",
      footer: "On démarre l'année ensemble ⚡",
    },

    {
      type: "objectif",
      title: "Objectif de la séance",
      icon: "🎯",
      text: "Faire connaissance avec le fonctionnement de l'année (organisation des séances, évaluations) et se remémorer les savoir-faire sur les proportions et les pourcentages, indispensables tout au long de l'année.",
    },

    {
      type: "organisation",
      title: "Comment fonctionne l'année ?",
      cards: [
        {
          icon: "📄",
          title: "Une fiche par séance",
          text: "Chaque cours donne lieu à une fiche à compléter, avec l'essentiel à retenir et des exercices d'application.",
        },
        {
          icon: "⏱️",
          title: "Évaluation courte",
          text: "Toutes les 2 semaines, pour vérifier régulièrement les acquis sur les dernières notions vues.",
        },
        {
          icon: "📝",
          title: "Évaluation longue",
          text: "1 à 2 par trimestre, sur un chapitre plus large, pour consolider sur la durée.",
        },
      ],
    },

    {
      type: "flash",
      title: "Automatismes — 5 questions flash",
      subtitle: "On chronomètre ! ⏱️ Un point par bonne réponse.",
      questions: [
        {
          q: "1. Dans une classe de 32 élèves, 12 sont des filles. Donner la proportion de filles sous forme de fraction irréductible.",
          a: "12/32 = 3/8",
        },
        {
          q: "2. Écrire 3/8 sous forme de pourcentage.",
          a: "37,5 %",
        },
        {
          q: "3. Calculer 25 % de 60 €.",
          a: "15 €",
        },
        {
          q: "4. Une salle de 200 places compte 150 places occupées. Quel est le pourcentage de places occupées ?",
          a: "75 %",
        },
        {
          q: "5. Calculer les deux tiers de 90.",
          a: "60",
        },
      ],
    },

    {
      type: "cours",
      title: "Rappels — Proportions et pourcentages",
      subtitle: "Classe de 1ʳᵉ — à recopier sur la fiche",
      blocks: [
        {
          label: "Proportion",
          paragraphs: [
            {
              segments: [
                "La proportion (ou fréquence) d'une sous-population B dans une population A est le nombre obtenu en divisant l'effectif de ",
                { b: "B" },
                " par l'effectif de ",
                { b: "A" },
                " :",
              ],
            },
            {
              big: true,
              segments: ["proportion de B dans A = effectif de ", { b: "B" }, " ÷ effectif de ", { b: "A" }],
            },
            {
              segments: ["Cette proportion est un nombre compris entre ", { b: "0" }, " et ", { b: "1" }, "."],
            },
          ],
        },
        {
          label: "Pourcentage",
          paragraphs: [
            {
              segments: [
                "Pour exprimer une proportion en pourcentage, on décale la ",
                { b: "virgule" },
                " de ",
                { b: "2" },
                " crans vers la ",
                { b: "droite" },
                ".",
              ],
            },
          ],
        },
        {
          label: "Exemple",
          paragraphs: [
            {
              segments: [
                "Une entreprise emploie 240 salariés, dont 84 sont en télétravail au moins un jour par semaine.",
              ],
            },
            {
              segments: ["Proportion de salariés en télétravail : 84 ÷ 240 = ", { b: "0,35" }],
            },
            {
              segments: ["Soit en pourcentage : ", { b: "35" }, " %"],
            },
          ],
        },
        {
          label: "Calculer une partie à partir d'un pourcentage",
          paragraphs: [
            { segments: ["Calculer t % d'une quantité Q, c'est calculer :"] },
            { big: true, segments: [{ b: "t/100" }, " × Q"] },
          ],
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 1",
      tag: "Application",
      context:
        "D'après l'Insee, la France comptait en 2023 environ 68 000 000 d'habitants, dont environ 4 200 000 vivaient dans un département d'outre-mer (Dom).",
      questions: [
        {
          text: "a) Calculer la proportion de la population des Dom dans la population totale (arrondir à 10⁻³).",
          answer: "4 200 000 ÷ 68 000 000 ≈ 0,062",
        },
        {
          text: "b) Exprimer ce résultat en pourcentage, arrondi à 0,1 %.",
          answer: "≈ 6,2 %",
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 2",
      tag: "Application",
      context: "Un lycée compte 900 élèves, dont 40 % sont en filière technologique.",
      questions: [
        {
          text: "a) Combien d'élèves sont en filière technologique ?",
          answer: "900 × 0,40 = 360 élèves",
        },
        {
          text: "b) Parmi les élèves de filière technologique, 60 % sont en série STMG. Combien d'élèves cela représente-t-il ?",
          answer: "360 × 0,60 = 216 élèves",
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 3",
      tag: "À chercher",
      context:
        "Un laboratoire a testé 150 modèles de téléphones. 36 d'entre eux ont obtenu une note supérieure à 4 étoiles sur 5.",
      questions: [
        {
          text: "a) Calculer la proportion, sous forme fractionnaire puis décimale, de modèles ayant obtenu plus de 4 étoiles.",
          answer: "36/150 = 6/25 = 0,24",
        },
        {
          text: "b) Exprimer cette proportion en pourcentage.",
          answer: "24 %",
        },
      ],
    },

    {
      type: "bilan",
      title: "Bilan — Ce qu'il faut retenir",
      items: [
        {
          segments: [
            "Une proportion se calcule en divisant l'effectif de la ",
            { b: "sous-population" },
            " par l'effectif de la ",
            { b: "population totale" },
            ".",
          ],
        },
        {
          segments: [
            "Pour l'exprimer en pourcentage, on décale la ",
            { b: "virgule" },
            " de 2 rangs vers la droite pour l'exprimer en ",
            { b: "centièmes" },
            ".",
          ],
        },
        {
          segments: ["t % d'une quantité Q vaut ", { b: "(t/100) × Q" }, "."],
        },
      ],
    },

    {
      type: "fin",
      autoCelebrate: true,
      title: "Séance terminée !",
      subtitle: "Bravo, vous avez déjà les bases pour toute l'année 🎉",
      recap: [
        "Proportion = effectif de la sous-population ÷ effectif de la population totale",
        "Pourcentage = proportion avec la virgule décalée de 2 rangs à droite",
        "t % de Q = (t/100) × Q",
        "1 fiche par séance · 1 éval courte toutes les 2 semaines · 1 à 2 évals longues par trimestre",
      ],
      footer: "À la prochaine séance — garde ta fiche, elle te servira à réviser !",
    },
  ],
};
