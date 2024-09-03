FROM node:18-alpine

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "index.js"]