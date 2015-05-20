FROM node:0.10.38

RUN npm install debug express path elasticsearch forever node-jsx react gulp-sourcemaps gulp-babel babelify vinyl-source-stream gulp-sass

RUN npm --global install browserify gulp

RUN npm link gulp

RUN npm link browserify

RUN mkdir /gunsnfun

ADD ./ /gunsnfun

EXPOSE 3069

CMD gulp --gulpfile /gunsnfun/static/gulpfile.js && node /gunsnfun/server.js
