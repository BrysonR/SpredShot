FROM alpine

RUN apk update
RUN apk add curl

ADD ./loader.sh ./
ADD ./sample.json ./

RUN chmod 755 ./loader.sh

CMD ./loader.sh
