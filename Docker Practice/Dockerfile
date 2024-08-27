FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN mkdir -p /src
RUN npm i

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "src/index.js"]