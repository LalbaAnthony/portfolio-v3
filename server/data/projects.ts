const projectsData: Project[] = [
  {
    "slug": "nova-dashboard",
    "title": "Nova Dashboard",
    "abstract": {
      "en": "Analytics dashboard for SaaS metrics with real-time charts, cohort analysis, and role-based access control.",
      "fr": "Tableau de bord analytique pour métriques SaaS avec graphiques en temps réel, analyse de cohorte et contrôle d'accès par rôle."
    },
    "description": {
      "en": "Analytics dashboard for SaaS metrics with real-time charts, cohort analysis, and role-based access control.",
      "fr": "Tableau de bord analytique pour métriques SaaS avec graphiques en temps réel, analyse de cohorte et contrôle d'accès par rôle."
    },
    "technologies": [
      "Nuxt",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
      "PostgreSQL"
    ],
    "year": 2025,
    "featured": true,
    "url": "https://nova-dashboard.dev",
    "repository": "https://github.com/LalbaAnthony/nova-dashboard"
  },
  {
    "slug": "cartflow",
    "title": "CartFlow",
    "abstract": {
      "en": "Headless e-commerce engine with a composable checkout pipeline, Stripe integration, and inventory webhooks.",
      "fr": "Moteur e-commerce headless avec pipeline de paiement composable, intégration Stripe et webhooks d'inventaire."
    },
    "description": {
      "en": "Headless e-commerce engine with a composable checkout pipeline, Stripe integration, and inventory webhooks.",
      "fr": "Moteur e-commerce headless avec pipeline de paiement composable, intégration Stripe et webhooks d'inventaire."
    },
    "technologies": [
      "Node.js",
      "TypeScript",
      "Fastify",
      "Stripe",
      "Redis",
      "MySQL"
    ],
    "year": 2024,
    "featured": true,
    "repository": "https://github.com/LalbaAnthony/cartflow"
  },
  {
    "slug": "lexify",
    "title": "Lexify",
    "abstract": {
      "en": "Vocabulary learning app with spaced-repetition scheduling, progress tracking, and a PWA-first offline mode.",
      "fr": "Application d'apprentissage du vocabulaire avec répétition espacée, suivi des progrès et mode hors-ligne PWA."
    },
    "description": {
      "en": "Vocabulary learning app with spaced-repetition scheduling, progress tracking, and a PWA-first offline mode.",
      "fr": "Application d'apprentissage du vocabulaire avec répétition espacée, suivi des progrès et mode hors-ligne PWA."
    },
    "technologies": [
      "Vue 3",
      "TypeScript",
      "IndexedDB",
      "Workbox"
    ],
    "year": 2024,
    "featured": false,
    "url": "https://lexify.app",
    "repository": "https://github.com/LalbaAnthony/lexify"
  },
  {
    "slug": "infra-pulse",
    "title": "InfraPulse",
    "abstract": {
      "en": "Self-hosted server monitoring tool that collects CPU, memory, and disk metrics via agents and exposes a REST API.",
      "fr": "Outil de surveillance de serveurs auto-hébergé collectant métriques CPU, mémoire et disque via des agents avec API REST."
    },
    "description": {
      "en": "Self-hosted server monitoring tool that collects CPU, memory, and disk metrics via agents and exposes a REST API.",
      "fr": "Outil de surveillance de serveurs auto-hébergé collectant métriques CPU, mémoire et disque via des agents avec API REST."
    },
    "technologies": [
      "Go",
      "Docker",
      "Prometheus",
      "SQLite"
    ],
    "year": 2024,
    "featured": true,
    "repository": "https://github.com/LalbaAnthony/infra-pulse"
  },
  {
    "slug": "collab-board",
    "title": "CollabBoard",
    "abstract": {
      "en": "Real-time collaborative whiteboard with infinite canvas, shape primitives, and multi-cursor presence via WebSockets.",
      "fr": "Tableau blanc collaboratif en temps réel avec canvas infini, primitives de formes et présence multi-curseurs via WebSockets."
    },
    "description": {
      "en": "Real-time collaborative whiteboard with infinite canvas, shape primitives, and multi-cursor presence via WebSockets.",
      "fr": "Tableau blanc collaboratif en temps réel avec canvas infini, primitives de formes et présence multi-curseurs via WebSockets."
    },
    "technologies": [
      "React",
      "TypeScript",
      "Konva.js",
      "Socket.io",
      "Node.js"
    ],
    "year": 2023,
    "featured": true,
    "url": "https://collab-board.io"
  },
  {
    "slug": "docship",
    "title": "DocShip",
    "abstract": {
      "en": "CLI tool that generates API documentation from OpenAPI specs and deploys static sites to Cloudflare Pages.",
      "fr": "Outil CLI qui génère la documentation API depuis des specs OpenAPI et déploie des sites statiques sur Cloudflare Pages."
    },
    "description": {
      "en": "CLI tool that generates API documentation from OpenAPI specs and deploys static sites to Cloudflare Pages.",
      "fr": "Outil CLI qui génère la documentation API depuis des specs OpenAPI et déploie des sites statiques sur Cloudflare Pages."
    },
    "technologies": [
      "Node.js",
      "TypeScript",
      "Commander.js",
      "Cloudflare Workers"
    ],
    "year": 2023,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/docship"
  },
  {
    "slug": "menu-planner",
    "title": "Menu Planner",
    "abstract": {
      "en": "Weekly meal planning app with automated shopping list generation, nutritional breakdown, and recipe import via URL.",
      "fr": "Application de planification hebdomadaire des repas avec génération automatique de liste de courses et import de recettes par URL."
    },
    "description": {
      "en": "Weekly meal planning app with automated shopping list generation, nutritional breakdown, and recipe import via URL.",
      "fr": "Application de planification hebdomadaire des repas avec génération automatique de liste de courses et import de recettes par URL."
    },
    "technologies": [
      "Nuxt",
      "TypeScript",
      "Tailwind CSS",
      "Supabase"
    ],
    "year": 2023,
    "featured": false,
    "url": "https://menu-planner.fr"
  },
  {
    "slug": "ticketops",
    "title": "TicketOps",
    "abstract": {
      "en": "Internal helpdesk system with SLA tracking, auto-assignment rules, and a Slack bot for ticket lifecycle notifications.",
      "fr": "Système de helpdesk interne avec suivi des SLA, règles d'affectation automatique et bot Slack pour les notifications de tickets."
    },
    "description": {
      "en": "Internal helpdesk system with SLA tracking, auto-assignment rules, and a Slack bot for ticket lifecycle notifications.",
      "fr": "Système de helpdesk interne avec suivi des SLA, règles d'affectation automatique et bot Slack pour les notifications de tickets."
    },
    "technologies": [
      "Laravel",
      "PHP",
      "Vue 3",
      "MySQL",
      "Slack API"
    ],
    "year": 2022,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/ticketops"
  },
  {
    "slug": "codewatch",
    "title": "CodeWatch",
    "abstract": {
      "en": "GitHub Actions dashboard that aggregates workflow runs across repos, highlights flaky tests, and tracks mean time to recovery.",
      "fr": "Tableau de bord GitHub Actions agrégeant les workflows sur plusieurs dépôts, détectant les tests instables et suivant le temps moyen de rétablissement."
    },
    "description": {
      "en": "GitHub Actions dashboard that aggregates workflow runs across repos, highlights flaky tests, and tracks mean time to recovery.",
      "fr": "Tableau de bord GitHub Actions agrégeant les workflows sur plusieurs dépôts, détectant les tests instables et suivant le temps moyen de rétablissement."
    },
    "technologies": [
      "Next.js",
      "TypeScript",
      "GitHub API",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "year": 2022,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/codewatch"
  },
  {
    "slug": "linkvault",
    "title": "LinkVault",
    "abstract": {
      "en": "Self-hosted bookmark manager with full-text search, tag-based organisation, and a browser extension for one-click saving.",
      "fr": "Gestionnaire de favoris auto-hébergé avec recherche plein texte, organisation par tags et extension navigateur pour sauvegarde en un clic."
    },
    "description": {
      "en": "Self-hosted bookmark manager with full-text search, tag-based organisation, and a browser extension for one-click saving.",
      "fr": "Gestionnaire de favoris auto-hébergé avec recherche plein texte, organisation par tags et extension navigateur pour sauvegarde en un clic."
    },
    "technologies": [
      "Symfony",
      "PHP",
      "Vue 3",
      "TypeScript",
      "SQLite"
    ],
    "year": 2021,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/linkvault"
  },
  {
    "slug": "promptforge",
    "title": "PromptForge",
    "abstract": {
      "en": "Prompt management platform for LLM pipelines with version control, A/B testing, and latency/cost tracking per model.",
      "fr": "Plateforme de gestion de prompts pour pipelines LLM avec versionnage, tests A/B et suivi de latence et coût par modèle."
    },
    "description": {
      "en": "Prompt management platform for LLM pipelines with version control, A/B testing, and latency/cost tracking per model.",
      "fr": "Plateforme de gestion de prompts pour pipelines LLM avec versionnage, tests A/B et suivi de latence et coût par modèle."
    },
    "technologies": [
      "Nuxt",
      "TypeScript",
      "Tailwind CSS",
      "Fastify",
      "PostgreSQL"
    ],
    "year": 2025,
    "featured": true,
    "repository": "https://github.com/LalbaAnthony/promptforge"
  },
  {
    "slug": "deploykit",
    "title": "DeployKit",
    "abstract": {
      "en": "Zero-config deployment toolkit that bundles multi-stage Docker builds, health checks, and rollback scripts into a single CLI.",
      "fr": "Boîte à outils de déploiement sans configuration regroupant builds Docker multi-étapes, vérifications de santé et scripts de rollback en une seule CLI."
    },
    "description": {
      "en": "Zero-config deployment toolkit that bundles multi-stage Docker builds, health checks, and rollback scripts into a single CLI.",
      "fr": "Boîte à outils de déploiement sans configuration regroupant builds Docker multi-étapes, vérifications de santé et scripts de rollback en une seule CLI."
    },
    "technologies": [
      "Node.js",
      "TypeScript",
      "Docker",
      "Commander.js",
      "Shell"
    ],
    "year": 2025,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/deploykit"
  },
  {
    "slug": "formcraft",
    "title": "FormCraft",
    "abstract": {
      "en": "Drag-and-drop form builder with conditional logic, multi-step flows, and a webhook-based submission pipeline.",
      "fr": "Constructeur de formulaires en glisser-déposer avec logique conditionnelle, flux multi-étapes et pipeline de soumission par webhook."
    },
    "description": {
      "en": "Drag-and-drop form builder with conditional logic, multi-step flows, and a webhook-based submission pipeline.",
      "fr": "Constructeur de formulaires en glisser-déposer avec logique conditionnelle, flux multi-étapes et pipeline de soumission par webhook."
    },
    "technologies": [
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "MySQL"
    ],
    "year": 2024,
    "featured": false,
    "url": "https://formcraft.dev",
    "repository": "https://github.com/LalbaAnthony/formcraft"
  },
  {
    "slug": "auditlog",
    "title": "AuditLog",
    "abstract": {
      "en": "Append-only audit trail service with tamper-evident hashing, structured event schema, and a searchable read API.",
      "fr": "Service de journal d'audit en ajout seul avec hachage inviolable, schéma d'événements structuré et API de lecture avec recherche."
    },
    "description": {
      "en": "Append-only audit trail service with tamper-evident hashing, structured event schema, and a searchable read API.",
      "fr": "Service de journal d'audit en ajout seul avec hachage inviolable, schéma d'événements structuré et API de lecture avec recherche."
    },
    "technologies": [
      "Go",
      "PostgreSQL",
      "Docker",
      "gRPC"
    ],
    "year": 2023,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/auditlog"
  },
  {
    "slug": "notifhub",
    "title": "NotifHub",
    "abstract": {
      "en": "Multi-channel notification gateway that routes events to email, SMS, and push with per-user preference management.",
      "fr": "Passerelle de notifications multicanal routant les événements vers email, SMS et push avec gestion des préférences par utilisateur."
    },
    "description": {
      "en": "Multi-channel notification gateway that routes events to email, SMS, and push with per-user preference management.",
      "fr": "Passerelle de notifications multicanal routant les événements vers email, SMS et push avec gestion des préférences par utilisateur."
    },
    "technologies": [
      "Node.js",
      "TypeScript",
      "Redis",
      "BullMQ",
      "PostgreSQL"
    ],
    "year": 2022,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/notifhub"
  },
  {
    "slug": "pricepilot",
    "title": "PricePilot",
    "abstract": {
      "en": "E-commerce price tracker that monitors competitor listings, detects drops via scraping, and sends configurable alerts.",
      "fr": "Outil de suivi des prix e-commerce surveillant les annonces concurrentes, détectant les baisses par scraping et envoyant des alertes configurables."
    },
    "description": {
      "en": "E-commerce price tracker that monitors competitor listings, detects drops via scraping, and sends configurable alerts.",
      "fr": "Outil de suivi des prix e-commerce surveillant les annonces concurrentes, détectant les baisses par scraping et envoyant des alertes configurables."
    },
    "technologies": [
      "Python",
      "Playwright",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    "year": 2021,
    "featured": false,
    "repository": "https://github.com/LalbaAnthony/pricepilot"
  }
]

export default projectsData