FROM docker.artifactory.tapsi.tech/node:10

ARG BUILD_ENV

RUN npm install pm2 -g

WORKDIR /usr/src/app

#make yarn install cachable by docker
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .npmrc .npmrc


RUN yarn install
COPY . .

RUN npm run build-$BUILD_ENV
EXPOSE 3000
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]