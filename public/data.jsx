/* Portfolio data — swap in real content as needed. */

const PROFILE = {
  name: "Xavier Pardoue",
  role: "Développeur Ruby on Rails",
  location: "Paris, France",
  baseline: "Je construis des applications web robustes, lisibles, et qui durent.",
  email: "pardoue.xavier@gmail.com",
  github: "github.com/Xavier-Prd",
  linkedin: "linkedin.com/in/xavier-pardoue",
};

const STACK = [
  { name: "Ruby", level: "core" },
  { name: "Rails", level: "core" },
  { name: "Hotwire", level: "core" },
  { name: "PostgreSQL", level: "core" },
  { name: "Stimulus", level: "core" },
  { name: "Tailwind", level: "tools" },
  { name: "Sidekiq", level: "tools" },
  { name: "Redis", level: "tools" },
  { name: "Docker", level: "tools" },
  { name: "RSpec", level: "tools" },
];

const PROJECTS = [
  {
    id: "orbit",
    name: "Orbit",
    tagline: "Outil de suivi de candidatures avec extension Chrome.",
    year: "2025",
    status: "En production",
    stack: ["Rails 7.2", "Hotwire", "PostgreSQL", "Sidekiq"],
    github: "github.com/lmoreau/orbit",
    live: "orbit-app.fr",
    cover: "eclipse",
    context: "Pendant ma recherche d'alternance, j'avais 40+ candidatures éparpillées dans 3 outils différents. Orbit centralise tout : statut, relances automatiques, notes par entretien, et une extension Chrome qui détecte les offres LinkedIn / Welcome to the Jungle pour les enregistrer en un clic.",
    challenges: [
      {
        title: "Synchronisation extension ↔ app",
        body: "L'extension Chrome doit pouvoir poster une candidature sans demander à l'utilisateur de se reconnecter à chaque fois. J'ai mis en place un token API à durée de vie longue (60 jours) côté Rails, stocké dans le storage de l'extension, avec rotation transparente quand il approche de l'expiration.",
      },
      {
        title: "Relances sans spammer",
        body: "Je voulais que les rappels soient utiles, pas un bruit de fond. Sidekiq programme une relance à J+7 si pas de réponse, et l'utilisateur peut snoozer une relance à un clic. La file est idempotente — relancer un déploiement ne réenvoie pas les emails déjà partis.",
      },
      {
        title: "Parsing d'offres hétérogènes",
        body: "Chaque site structure ses offres différemment. J'ai préféré des extracteurs spécifiques par domaine (un par site) plutôt qu'un parser générique fragile. Plus de code, mais beaucoup plus fiable et facile à corriger.",
      },
    ],
    decisions: [
      "Hotwire plutôt que React : moins de code, navigation native, parfait pour un dashboard à 80% lecture.",
      "PostgreSQL + une seule table pour les events au lieu d'event sourcing complet — assez pour reconstruire un historique sans la complexité.",
      "Pas de framework CSS sur l'extension Chrome ; juste du CSS scoped, parce que Tailwind dans une extension c'est 80kb pour rien.",
    ],
    metric: { value: "1.2k", label: "candidatures suivies" },
  },
  {
    id: "nimbus",
    name: "Nimbus",
    tagline: "Plateforme de réservation pour un studio de yoga local.",
    year: "2024",
    status: "Client actif",
    stack: ["Rails 7.1", "Stripe", "Turbo", "Tailwind"],
    github: "github.com/lmoreau/nimbus",
    live: "nimbus-yoga.fr",
    cover: "fractal",
    context: "Le studio fonctionnait avec un Google Sheet partagé et des SMS. La prof voulait pouvoir afficher le planning, encaisser les cartes de 10 séances, et gérer les annulations sans répondre à 30 messages par semaine.",
    challenges: [
      {
        title: "Gérer les cartes de séances",
        body: "Une carte de 10 séances n'est pas un produit Stripe classique. Je l'ai modélisée comme un Pack avec un compteur de séances restantes, lié au User. Chaque réservation décrémente ; chaque annulation à plus de 24h rend le crédit. Tout est en transaction pour éviter les double-débits.",
      },
      {
        title: "Annulations en cascade",
        body: "Si la prof annule un cours, il faut prévenir tous les inscrits, leur rendre leur crédit, et leur proposer un autre créneau. J'ai fait ça avec un job Sidekiq qui itère, et un email Action Mailer avec lien direct vers les créneaux compatibles.",
      },
    ],
    decisions: [
      "Stripe Checkout hosted plutôt que custom — la conformité PCI faite par eux, je touche pas à un numéro de carte.",
      "Pas d'app mobile, juste une PWA responsive. Les utilisatrices sont à 90% sur téléphone, ça suffit largement.",
      "Le planning est cacheable 5 minutes côté Rails ; ça divise les queries par 20 aux heures de pointe (vendredi soir).",
    ],
    metric: { value: "300+", label: "réservations / mois" },
  },
  {
    id: "halcyon",
    name: "Halcyon",
    tagline: "Lecteur RSS minimaliste avec digest hebdomadaire par email.",
    year: "2024",
    status: "Side project",
    stack: ["Rails 7.1", "Action Mailer", "Resend"],
    github: "github.com/lmoreau/halcyon",
    live: null,
    cover: "eclipse",
    context: "J'ai arrêté de lire les flux RSS parce que j'avais 200 articles non lus en permanence et que ça me culpabilisait. Halcyon ne te montre rien par défaut — il t'envoie un email le dimanche avec les 10 articles les plus susceptibles de t'intéresser, basé sur ce que tu as lu jusqu'au bout.",
    challenges: [
      {
        title: "Scoring d'articles sans ML",
        body: "Je voulais éviter l'overkill du machine learning. Le scoring est un simple TF-IDF entre les articles non lus et ceux que tu as ouverts et lus plus de 30 secondes. Naïf, mais en pratique le top 10 est très pertinent.",
      },
    ],
    decisions: [
      "Pas de feed reader temps réel — un cron quotidien fetch les nouveaux articles, c'est largement assez.",
      "Resend pour l'envoi : API simple, prix correct, et les webhooks de delivery me suffisent.",
      "Stockage en plain text pour le contenu, full-text search via PostgreSQL tsvector — pas besoin d'Elastic pour quelques milliers d'articles.",
    ],
    metric: { value: "12", label: "utilisateurs (dont moi)" },
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "API privée pour archiver les pages web qui m'inspirent.",
    year: "2023",
    status: "Side project",
    stack: ["Rails 7.0", "Mercury Parser", "S3"],
    github: "github.com/lmoreau/ember",
    live: null,
    cover: "fractal",
    context: "Je collectionnais des bookmarks dans Notion, mais les pages disparaissaient ou changeaient. Ember archive le HTML, extrait le texte propre, prend un screenshot, et stocke tout dans S3. Une CLI me permet d'ajouter une URL depuis le terminal.",
    challenges: [
      {
        title: "Screenshots fiables",
        body: "Lancer Chrome headless dans un job Sidekiq était instable (memory leak après 200 captures). J'ai externalisé vers un microservice Puppeteer séparé, redémarré toutes les 50 captures.",
      },
    ],
    decisions: [
      "Pas d'interface web — j'utilise ça via une CLI Ruby. Personne d'autre n'est censé l'utiliser.",
      "Mercury Parser plutôt que ma propre extraction — c'est résolu depuis 2018, pas besoin de réinventer.",
    ],
    metric: { value: "470", label: "pages archivées" },
  },
];

const TIMELINE = [
  { year: "2025", title: "Freelance Rails", body: "Missions ponctuelles pour des PME et associations. Refonte de back-offices, migrations Rails, automatisations métier." },
  { year: "2024", title: "Le Wagon — Bootcamp Rails", body: "9 semaines intensives. Projet final : Nimbus (plateforme de réservation, encore utilisée aujourd'hui par le studio client)." },
  { year: "2022–2023", title: "Chargé de projet, ESN", body: "Coordination de projets web pour des clients grands comptes. Ça m'a donné le goût du code après avoir vu la dette technique de l'intérieur." },
  { year: "2020", title: "Master Sciences Cognitives", body: "Université Paris Cité. Mémoire sur les interfaces conversationnelles. C'est là que j'ai commencé à coder, en Python." },
];

window.PROFILE = PROFILE;
window.STACK = STACK;
window.PROJECTS = PROJECTS;
window.TIMELINE = TIMELINE;
