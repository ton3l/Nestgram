FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY dist .

CMD ["node", "src/main.js"]
