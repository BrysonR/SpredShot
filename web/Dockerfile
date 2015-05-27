FROM node:latest

RUN npm install debug express path elasticsearch literalify forever node-jsx react gulp-sourcemaps gulp-babel babelify vinyl-source-stream gulp-nodemon gulp-sass jquery

RUN npm --global install browserify gulp nodemon

RUN npm link gulp

RUN npm link browserify

RUN npm link nodemon

RUN mkdir /gunsnfun

EXPOSE 3069

CMD gulp --gulpfile /gunsnfun/static/gulpfile.js
