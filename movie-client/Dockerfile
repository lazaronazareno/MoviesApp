FROM node

ENV NODE_ENV=movieapp

WORKDIR /movie-app/src/movie-client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start"]