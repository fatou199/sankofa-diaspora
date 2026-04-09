# Aliniosié Africa - Monorepo

Bienvenue dans le projet **Aliniosié Africa**. Cette structure permet de gérer à la fois le backend, l'application web et l'application mobile.

## Structure du projet

- **/backend** : Application Next.js. Elle contient :
    - L'**API** (`app/api`) qui sert de cerveau au projet.
    - La **Base de données** (`prisma/`).
    - L'**Interface Web** (Frontend Next.js).
- **/mobile** : Application mobile native développée avec **Expo** (React Native).

## Lancement rapide

### 1. Lancer le Backend (API + Web)
```bash
cd backend
npm run dev
```

### 2. Lancer l'Application Mobile
```bash
cd mobile
npm install
npx expo start
```
