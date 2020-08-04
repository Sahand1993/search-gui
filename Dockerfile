FROM node:14.7.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm install
ENTRYPOINT ["npm", "start"]

