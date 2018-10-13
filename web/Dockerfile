FROM node:9.4.0

MAINTAINER Bryson Reynolds

RUN npm install debug express path elasticsearch@8.0.1 react-dom@0.14.3 literalify forever node-jsx react@0.14.3 gulp-babel babelify@6.4.0 vinyl-source-stream gulp-nodemon nodemon gulp-sass@2.0.4 jquery amqplib when body-parser gulp-autoprefixer passport@0.2.2 passport-local mongoose@4.0 bcrypt-nodejs express-session node-uuid gulp-uglify vinyl-buffer @babel/core gulp-sourcemaps

RUN npm --global install browserify gulp

RUN npm link gulp

RUN npm link browserify

RUN mkdir /spredshot

WORKDIR /spredshot

ADD ./src ./

EXPOSE 3069

CMD gulp --gulpfile /spredshot/gulpfile.js
