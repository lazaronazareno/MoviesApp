FROM node

ENV NODE_ENV=movieapp

WORKDIR /movie-app/src/movie-server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run tsc

CMD ["sh", "-c", "npm run dev"]
