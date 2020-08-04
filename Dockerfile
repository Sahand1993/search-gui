FROM node:12.18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN ls
COPY . ./
RUN ls

RUN npm install
RUN npm run build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "--listen", "tcp://0.0.0.0:80"]

