FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm ci --only=production \
    && apk del .gyp

COPY . .

EXPOSE 80

CMD ["node", "src/app.js"]