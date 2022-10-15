ARG node_version=17-alpine3.12

FROM node:17-alpine3.12 as builder

ENV SERVICE_NAME = "tms"

WORKDIR /tms/
COPY . .

RUN apk update && apk add build-base git curl
RUN npm install && \
    npm run build

ENTRYPOINT npm start

