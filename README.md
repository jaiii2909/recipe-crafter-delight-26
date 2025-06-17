# Recipe Crafter Delight

A web application for discovering, crafting, and saving delicious recipes. This project is built using modern web development technologies and provides a seamless user experience for food enthusiasts to explore and manage their favorite recipes.

> **Note:** This README is based on the repository structure as of June 2025. Some files and folders may not be listed due to GitHub API pagination limits. For the full list, please browse the repo directly:  
> [View all files in GitHub](https://github.com/jaiii2909/recipe-crafter-delight-26/tree/main)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File & Folder Structure](#file--folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Recipe Crafter Delight** lets users browse, search, and manage recipes with an intuitive interface. It features categorized recipes, ingredient management, step-by-step guides, and more.

---

## Features

- Browse featured and trending recipes
- Create, edit, and delete personal recipes
- Categorize recipes (e.g., breakfast, lunch, dessert)
- Search and filter recipes by ingredient or name
- Responsive and mobile-friendly UI
- Persistent storage (local or server, depending on backend integration)
- Custom hooks and context for state management

---

## Tech Stack

- **Frontend:** React (TypeScript)
- **Styling:** Tailwind CSS, PostCSS
- **Build Tool:** Vite
- **Linting:** ESLint
- **Package Manager:** Bun (with lockfile `bun.lockb`)
- **Others:** Custom hooks, contexts, modular components

---

## File & Folder Structure

Here’s a summary of the main files and folders:

```
├── .gitignore               # Specifies files to ignore in git
├── README.md                # Project documentation (this file)
├── bun.lockb                # Bun package manager lock file
├── components.json          # Component metadata/registry
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Project metadata and scripts
├── package-lock.json        # NPM lock file (if Bun not used)
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.app.json        # TypeScript config for app
├── tsconfig.json            # Root TypeScript config
├── tsconfig.node.json       # TypeScript config for Node
├── vite.config.ts           # Vite build config
├── public/                  # Static assets (images, icons, etc.)
└── src/                     # Source code
    ├── App.css              # Global styles for the app
    ├── App.tsx              # Main React App component
    ├── index.css            # Entry CSS file (Tailwind base)
    ├── main.tsx             # React DOM entry point
    ├── vite-env.d.ts        # Vite/TypeScript environment types
    ├── components/          # UI components (buttons, cards, etc.)
    ├── contexts/            # React contexts (global state providers)
    ├── hooks/               # Custom React hooks
    ├── lib/                 # Shared libraries/utilities
    ├── pages/               # Page-level components (routes)
    └── utils/               # Utility/helper functions
```

> **Note:** Only the first 10 items per directory are listed here.  
> For the full file tree, [browse `/src`](https://github.com/jaiii2909/recipe-crafter-delight-26/tree/main/src).

---

## Getting Started

### Prerequisites

- **Node.js** (Recommended: v18+)
- **Bun** (Recommended: latest; for alternative, use npm/yarn but see notes below)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/jaiii2909/recipe-crafter-delight-26.git
   cd recipe-crafter-delight-26
   ```

2. **Install dependencies**
   - Using Bun (recommended):
     ```sh
     bun install
     ```
   - Or, if using npm:
     ```sh
     npm install
     ```

### Running the Project

- **Start the development server:**
  - With Bun:
    ```sh
    bun run dev
    ```
  - With npm:
    ```sh
    npm run dev
    ```

- The app will be available at `http://localhost:5173/` (or as shown in your terminal).

---

## Available Scripts

- `dev` - Start the development server
- `build` - Build the app for production
- `preview` - Preview the production build
- `lint` - Run ESLint on the codebase

Run scripts via Bun or npm, e.g.:
```sh
bun run build
# or
npm run build
```

---

## Configuration

- **Tailwind:** Configured via `tailwind.config.ts`
- **PostCSS:** See `postcss.config.js`
- **ESLint:** See `eslint.config.js`
- **TypeScript:** See `tsconfig*.json`

You can customize these files as needed for your development workflow.

---

## Contributing

Pull requests are welcome! To contribute:
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Links

- [Live Demo (if available)](https://github.com/jaiii2909/recipe-crafter-delight-26)
