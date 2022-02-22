FROM node:16-alpine

WORKDIR /app

COPY package.json tsconfig.build.json tsconfig.json ./

RUN yarn

COPY src .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]