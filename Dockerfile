FROM node:19.5.0-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build
CMD ["npm","start"]