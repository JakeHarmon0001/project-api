FROM node:16.15.0-alpine

WORKDIR /srv/jharmon-api
ENV NODE_ENV=production

RUN apk add --no-cache bash

COPY package*.json ./
RUN npm install --production

COPY . .

#COPY ./config/production.json ./config/production.json
#RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]