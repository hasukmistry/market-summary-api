FROM node:16.13

LABEL maintainer="Hasmukh Mistry"

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19000 19001 19002

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:/app/node_modules/.bin/:$PATH
RUN npm i -g npm@latest

# Essentials
RUN apt-get -y install wget curl gnupg gcc make autoconf libc-dev pkg-config

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE $API_PORT

CMD [ "npm", "start" ]