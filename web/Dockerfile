FROM node:latest

RUN npm install express browserify elasticsearch forever node-jsx react reactify

RUN mkdir /gunsnfun

ADD ./ /gunsnfun

EXPOSE 3069

CMD node /gunsnfun/server.js

