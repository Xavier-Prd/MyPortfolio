# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (Rails + Tailwind watcher)
bin/dev

# Rails server only
bin/rails server

# Database
bin/rails db:create db:migrate

# Tests
bin/rails test
bin/rails test test/models/user_test.rb  # single file

# Linting
bundle exec rubocop
bundle exec rubocop -a  # auto-correct

# Security
bundle exec brakeman
bundle exec bundler-audit
```

## Architecture

**Stack:** Ruby 3.3.5 · Rails 8.1 · PostgreSQL · Tailwind CSS + DaisyUI · Hotwire (Turbo + Stimulus) · Devise · Solid Cache / Queue / Cable · Kamal (déploiement)

### Frontend : portfolio statique dans `public/`

Le portfolio visible est une **app React vanilla** servie comme fichier statique — Rails ne fait pas de rendu côté serveur pour ces pages. Les fichiers sont dans `public/` :

- `public/index.html` — entrée unique, charge React 18 + Babel standalone via CDN
- `public/data.jsx` — toutes les données (PROFILE, STACK, PROJECTS, TIMELINE) ; **c'est ici qu'on touche pour mettre à jour le contenu**
- `public/pages.jsx` — les 5 composants de page (HomePage, ProjectsPage, ProjectDetailPage, AboutPage, ContactPage)
- `public/app.jsx` — router hash + composant Nav + bootstrap React
- `public/image-slot.js` — web component custom pour les photos uploadables

Les fichiers `.jsx` sont transpilés **dans le navigateur** par Babel standalone (`type="text/babel"`). Pas de build step, pas de `node_modules`.

### Backend Rails

Minimal pour l'instant. Le seul endpoint actif côté Rails est le formulaire de contact :

- `POST /messages` → `MessagesController#create` → `ContactMailer#new_message` → Gmail SMTP
- L'envoi est asynchrone via Solid Queue (`deliver_later`)
- CSRF désactivé sur `MessagesController` (formulaire statique sans token Rails)

**Devise** est installé avec un modèle `User` (email + password). Pas encore utilisé dans l'interface publique.

### Mail (production)

Livraison via Gmail SMTP. Variables d'environnement requises :
- `GMAIL_USER` — pardoue.xavier@gmail.com
- `GMAIL_APP_PASSWORD` — App Password Gmail (pas le mot de passe du compte)

En développement, les emails ne sont pas envoyés (delivery method `:test` par défaut).

## Style de code

- **Lisibilité avant tout** : le code doit être compréhensible par un développeur junior en quelques secondes. Noms de variables explicites, logique linéaire, pas d'astuce cryptique.
- **Commenter systématiquement** : chaque bloc non trivial doit avoir un commentaire qui explique ce qu'il fait et pourquoi. Ne pas supposer que le lecteur connaît le contexte.

### Données à personnaliser

Tout le contenu du portfolio est dans `public/data.jsx` :
- `PROFILE` — nom, rôle, localisation, email, GitHub, LinkedIn
- `STACK` — technologies affichées sur la home
- `PROJECTS` — projets avec contexte, défis, décisions techniques
- `TIMELINE` — parcours affiché sur la page About
