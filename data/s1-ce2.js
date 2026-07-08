/* =========================================================================
   Séance : Semaine 1 – CE2 — Taux d'évolution, coefficient multiplicateur, indices
   Source : S1_CE2_Taux_evolution_indices.pdf
   ========================================================================= */

window.SESSION_DATA = {
  title: "Semaine 1 – Séance CE2",
  subtitle: "Taux d'évolution, coefficient multiplicateur, indices",

  slides: [
    {
      type: "title",
      kicker: "Terminale STMG · Mathématiques",
      title: "Taux d'évolution, coefficient multiplicateur, indices",
      subtitle: "Semaine 1 — Séance CE2",
      footer: "De nouveaux automatismes à débloquer ⚡",
    },

    {
      type: "objectif",
      title: "Objectif de la séance",
      icon: "🎯",
      text: "Consolider le calcul d'un taux d'évolution et du coefficient multiplicateur associé, et découvrir la notion d'indice base 100.",
    },

    {
      type: "flash",
      title: "Automatismes — 5 questions flash",
      subtitle: "On chronomètre ! ⏱️ Un point par bonne réponse.",
      questions: [
        {
          q: "1. Un prix passe de 80 € à 92 €. Le prix a-t-il augmenté ou diminué ? De combien d'euros ?",
          a: "Il a augmenté de 12 €",
        },
        {
          q: "2. Une quantité augmente de 10 %. Par quel nombre faut-il la multiplier ?",
          a: "1,10",
        },
        {
          q: "3. Une quantité diminue de 20 %. Par quel nombre faut-il la multiplier ?",
          a: "0,80",
        },
        {
          q: "4. Calculer 15 % de 340.",
          a: "51",
        },
        {
          q: "5. 150 × 1,08 = ?",
          a: "162",
        },
      ],
    },

    {
      type: "cours",
      title: "Cours — Taux d'évolution et coefficient multiplicateur",
      subtitle: "À recopier sur la fiche",
      blocks: [
        {
          label: "Taux d'évolution",
          paragraphs: [
            {
              segments: [
                "Lorsqu'une quantité passe d'une valeur initiale Vi (non nulle) à une valeur finale Vf, le taux d'évolution t (souvent exprimé en %) est défini par :",
              ],
            },
            {
              big: true,
              segments: ["t = (Vf − ", { b: "Vi" }, ") ÷ ", { b: "Vi" }],
            },
            {
              segments: [
                "Si t > 0, il s'agit d'une ",
                { b: "hausse (augmentation)" },
                " ; si t < 0, il s'agit d'une ",
                { b: "baisse (diminution)" },
                ".",
              ],
            },
          ],
        },
        {
          label: "Coefficient multiplicateur",
          paragraphs: [
            {
              segments: [
                "Le coefficient multiplicateur CM associé à une évolution de taux t (en proportion, t non exprimé en %) vérifie :",
              ],
            },
            {
              big: true,
              segments: ["Vf = CM × ", { b: "Vi" }, "   avec   CM = 1 + ", { b: "t" }],
            },
            {
              segments: [
                "Exemple : une hausse de 8 % correspond au coefficient multiplicateur CM = 1 + ",
                { b: "0,08" },
                " = ",
                { b: "1,08" },
                ".",
              ],
            },
            {
              segments: [
                "Exemple : une baisse de 8 % correspond au coefficient multiplicateur CM = 1 − ",
                { b: "0,08" },
                " = ",
                { b: "0,92" },
                ".",
              ],
            },
          ],
        },
        {
          label: "Indice base 100",
          paragraphs: [
            {
              segments: [
                "Pour comparer l'évolution d'une grandeur au cours du temps, on choisit une date (ou valeur) de référence, à laquelle on associe l'indice ",
                { b: "100" },
                ".",
              ],
            },
            {
              big: true,
              segments: ["I = V ÷ ", { b: "Vréf" }, " × ", { b: "100" }],
            },
            {
              segments: [
                "Un indice de 108 signifie une évolution de ",
                { b: "8" },
                " % par rapport à la référence.",
              ],
            },
          ],
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 1",
      tag: "Application",
      context: "Le chiffre d'affaires d'une entreprise passe de 250 000 € en 2024 à 270 000 € en 2025.",
      questions: [
        {
          text: "a) Calculer le taux d'évolution du chiffre d'affaires entre 2024 et 2025 (en %, arrondi à 0,1 %).",
          answer: "(270 000 − 250 000) ÷ 250 000 = 0,08 → 8,0 %",
        },
        {
          text: "b) En déduire le coefficient multiplicateur associé.",
          answer: "CM = 1,08",
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 2",
      tag: "Application",
      context: "Un salarié gagnait 1 850 € nets par mois. Il obtient une augmentation de 3 %.",
      questions: [
        {
          text: "a) Calculer le coefficient multiplicateur associé à cette augmentation.",
          answer: "CM = 1,03",
        },
        {
          text: "b) En déduire son nouveau salaire mensuel.",
          answer: "1 850 × 1,03 = 1 905,50 €",
        },
      ],
    },

    {
      type: "exercice",
      title: "Exercice 3",
      tag: "Indices",
      context:
        "Indice base 100 en 2015 du prix d'un panier de consommation courante — Année 2015 : indice 100 · 2018 : 104,2 · 2021 : 108,7 · 2024 : 116,3.",
      questions: [
        {
          text: "a) Quel est le taux d'évolution du prix du panier entre 2015 et 2024 ?",
          answer: "(116,3 − 100) ÷ 100 = 16,3 %",
        },
        {
          text: "b) Le prix du panier était de 42 € en 2015. Estimer son prix en 2024.",
          answer: "42 × 1,163 ≈ 48,85 €",
        },
      ],
    },

    {
      type: "bilan",
      title: "Bilan — Ce qu'il faut retenir",
      items: [
        {
          segments: ["Taux d'évolution : t = (Vf − Vi) ÷ ", { b: "Vi" }, "."],
        },
        {
          segments: [
            "Coefficient multiplicateur d'une hausse de t % : CM = ",
            { b: "1 + t/100" },
            ".",
          ],
        },
        {
          segments: [
            "Coefficient multiplicateur d'une baisse de t % : CM = ",
            { b: "1 − t/100" },
            ".",
          ],
        },
        {
          segments: ["Indice base 100 : I = V ÷ Vréf × ", { b: "100" }, "."],
        },
      ],
    },

    {
      type: "fin",
      autoCelebrate: true,
      title: "Séance terminée !",
      subtitle: "Bravo, tu maîtrises taux d'évolution et indices 🎉",
      recap: [
        "Taux d'évolution : t = (Vf − Vi) ÷ Vi",
        "Coefficient multiplicateur : CM = 1 + t (hausse) ou 1 − t (baisse)",
        "Indice base 100 : I = (V ÷ Vréf) × 100",
        "Un indice de 108 = évolution de +8 % par rapport à la référence",
      ],
      footer: "À la prochaine séance — garde ta fiche, elle te servira à réviser !",
    },
  ],
};
