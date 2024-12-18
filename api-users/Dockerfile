FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY src/ ./src
COPY tsconfig.json ./
COPY .env ./

RUN npm run build

EXPOSE 64001

CMD ["npm", "run", "start:prod"]
