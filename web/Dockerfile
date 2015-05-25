FROM node:0.10.38

RUN npm install debug express path elasticsearch forever node-jsx react gulp-sourcemaps gulp-babel babelify vinyl-source-stream gulp-sass

RUN npm --global install browserify gulp nodemon

RUN npm link gulp

RUN npm link browserify

RUN npm link nodemon

RUN mkdir /gunsnfun

EXPOSE 3069

CMD gulp --gulpfile /gunsnfun/static/gulpfile.js && nodemon /gunsnfun/server.js && gulp --gulpfile /gunsnfun/static/gulpfile.js watch
