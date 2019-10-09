FROM node:10.13.0-alpine

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN apk update && apk upgrade
RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json /usr/app
COPY package-lock.json /usr/app

RUN npm install

COPY . .