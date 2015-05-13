FROM node:latest

RUN npm install debug express path browserify elasticsearch forever node-jsx react reactify gulp-changed gulp-babel gulp-sourcemaps

RUN npm --global install browserify gulp

RUN npm link gulp

RUN mkdir /gunsnfun

ADD ./ /gunsnfun

EXPOSE 3069

CMD browserify --transform reactify /gunsnfun/app.js --outfile /gunsnfun/public/js/src/bundle.js && gulp --gulpfile /gunsnfun/public/gulpfile.js build:js && node /gunsnfun/server.js

