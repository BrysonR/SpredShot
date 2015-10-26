FROM node:0.12.7

MAINTAINER Bryson Reynolds

RUN npm install debug express path elasticsearch react-dom literalify forever node-jsx react gulp-babel babelify vinyl-source-stream gulp-nodemon nodemon@1.4.1 gulp-sass jquery amqplib when body-parser gulp-autoprefixer passport@0.2.2 passport-local mongoose@4.0 bcrypt-nodejs express-session node-uuid gulp-uglify vinyl-buffer babel-core gulp-sourcemaps

RUN npm --global install browserify gulp

RUN npm link gulp

RUN npm link browserify

RUN mkdir /gunsnfun

EXPOSE 3069

CMD gulp --gulpfile /gunsnfun/gulpfile.js
