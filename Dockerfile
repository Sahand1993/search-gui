FROM node:14.7.0

COPY . .

RUN npm run build
RUN npm install -g serve
ENTRYPOINT ["serve", "-s", "build"]

