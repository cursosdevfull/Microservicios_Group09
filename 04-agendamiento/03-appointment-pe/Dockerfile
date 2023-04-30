FROM node:alpine3.17 as builder

ARG BASE_DIR

WORKDIR /build

COPY ${BASE_DIR}/package.json ./

RUN npm install

COPY ${BASE_DIR} ./

RUN npm run build

FROM node:alpine3.17

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

CMD ["npm", "run", "start"]