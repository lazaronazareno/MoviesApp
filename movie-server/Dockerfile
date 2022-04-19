FROM node

ENV NODE_ENV=movieapp

WORKDIR /movie-app/src/movie-server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run tsc

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD ["npm run dev"]
