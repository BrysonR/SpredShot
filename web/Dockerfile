FROM node:latest

MAINTAINER Bryson Reynolds

RUN npm install debug express path elasticsearch literalify forever node-jsx react gulp-sourcemaps gulp-babel babelify vinyl-source-stream gulp-nodemon gulp-sass jquery amqplib when body-parser gulp-autoprefixer passport passport-local mongoose bcrypt-nodejs express-session node-uuid gulp-uglify vinyl-buffer

RUN npm --global install browserify gulp nodemon

RUN npm link gulp

RUN npm link browserify

RUN npm link nodemon

RUN mkdir /gunsnfun

EXPOSE 3069

CMD gulp --gulpfile /gunsnfun/gulpfile.js
