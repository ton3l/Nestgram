FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY prisma ./prisma

COPY dist .

RUN mv prisma.config.js prisma.config.mjs

CMD ["node", "src/main.js"]
