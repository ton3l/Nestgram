FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/dist/ ./

RUN mv prisma.config.js prisma.config.mjs

CMD ["node", "src/main.js"]
