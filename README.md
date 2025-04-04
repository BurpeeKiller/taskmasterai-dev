# TaskMasterAI

<p align="center">
  <img src="public/vite.svg" alt="TaskMasterAI Logo" width="100" />
</p>

TaskMasterAI est une application moderne de gestion de tâches et de productivité, conçue pour vous aider à organiser votre travail et maximiser votre efficacité. Avec une interface utilisateur élégante et des fonctionnalités alimentées par l'IA, TaskMasterAI transforme votre façon de gérer vos projets et vos tâches quotidiennes.

## ✨ Fonctionnalités principales

- **Tableau de bord personnalisé** : Visualisez vos tâches, votre productivité et vos prochaines échéances en un coup d'œil
- **Gestion des tâches avancée** : Créez, organisez et suivez vos tâches avec un système de glisser-déposer intuitif
- **Timer Pomodoro intégré** : Améliorez votre concentration avec la technique Pomodoro
- **Widgets météo** : Restez informé des conditions météorologiques sans quitter l'application
- **Mode Focus** : Éliminez les distractions et concentrez-vous sur ce qui compte
- **Assistant IA** : Obtenez des suggestions intelligentes pour optimiser votre productivité
- **Thème sombre/clair** : Choisissez le mode qui convient le mieux à votre environnement de travail
- **Responsive design** : Utilisez l'application sur tous vos appareils

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/taskmasterai.git
cd taskmasterai

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🛠️ Technologies utilisées

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **Vite** - Outil de build ultrarapide pour le développement moderne
- **Tailwind CSS** - Framework CSS utilitaire pour un design personnalisé
- **Supabase** - Backend as a Service pour l'authentification et la base de données
- **dnd-kit** - Bibliothèque de glisser-déposer pour React
- **Lucide React** - Icônes SVG pour React
- **React Router** - Routage côté client pour React

## 📝 Structure du projet

```
src/
├── assets/        # Ressources statiques (images, etc.)
├── components/    # Composants React réutilisables
│   ├── ui/        # Composants d'interface utilisateur de base
│   └── ...        # Autres composants spécifiques
├── contexts/      # Contextes React pour la gestion d'état global
├── lib/           # Utilitaires, hooks personnalisés et configuration
├── pages/         # Composants de page pour chaque route
└── styles/        # Styles globaux et configurations CSS
```

## 🔧 Configuration

Pour configurer l'application avec votre propre backend Supabase :

1. Créez un compte sur [Supabase](https://supabase.io/)
2. Créez un nouveau projet
3. Copiez les clés API dans un fichier `.env.local` à la racine du projet :

```
VITE_SUPABASE_URL=votre-url-supabase
VITE_SUPABASE_ANON_KEY=votre-clé-anonyme-supabase
```

## 📱 Déploiement

L'application peut être déployée sur diverses plateformes comme Vercel, Netlify ou GitHub Pages :

```bash
# Construire pour la production
npm run build

# Prévisualiser la version de production localement
npm run preview
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Développé avec ❤️ par [Votre Nom]

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
