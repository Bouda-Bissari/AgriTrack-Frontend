# Étape 1 : Base Node.js pour le développement
FROM node:22-alpine

# Définition du dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par Next.js
EXPOSE 3000

# Démarrer Next.js en mode développement avec hot-reloading
CMD ["npm", "run", "dev"]
