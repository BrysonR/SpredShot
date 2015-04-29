FROM node

MAINTAINER BMills

RUN mkdir -p /node/data/

# install base packages for node in the correct directory
RUN npm install amqplib when

# add our .js files to directory
ADD ./src /node/data/

WORKDIR /node/data/

# exposing different port
#EXPOSE 80

# run our app
CMD node pub.js
