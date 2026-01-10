FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install --production

COPY dist .

ENV DATABASE_URL=mysql://localhost:3306/nestgram

CMD ["node", "src/main.js"]
