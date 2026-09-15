FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV PORT=6000
EXPOSE 6000

CMD ["node", "server.js"]
