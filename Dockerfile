## base
FROM node:13-alpine AS base
WORKDIR /var/www/taskmanagement_api
ENV NODE_ENV=production
EXPOSE 8000
COPY package*.json ./
# Makes sure we're doing a clean install of our dependencies 
# and if dependencies in the package lock do not match those in package.json, npm ci will exit with an error, instead of updating the package lock.
RUN npm ci --ignore-script && npm cache clean --force

## dev
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --ignore-script --only=development
CMD [ "npm", "run", "start:dev" ]

## build
FROM dev as build
COPY . .
RUN npm run build

## pre-production
FROM build as pre-prod
RUN rm -rf ./__tests__ && rm -rf ./test && rm -rf ./node_modules && rm -rf ./src && rm -rf ./documentation && rm -rf ./coverage && rm -rf ./terraform && rm -rf ./images

## test
FROM dev AS test
COPY . .
ENV NODE_ENV=test
RUN npm run lint:src
CMD [ "npm", "run", "test:e2e" ]

## audit
FROM test AS audit
RUN npm audit fix
RUN npm doctor

FROM base AS prod
COPY --from=pre-prod /var/www/api /var/www/api
CMD ["node", "./dist/main.js"]

USER node