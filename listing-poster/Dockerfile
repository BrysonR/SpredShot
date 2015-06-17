FROM java:openjdk-7

WORKDIR /root

RUN curl https://downloads.gradle.org/distributions/gradle-2.4-bin.zip -o gradle.zip && \
    unzip -q gradle.zip -d /usr/local/bin && \
    rm gradle.zip

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD ./build.gradle ./
ADD ./src ./src

RUN /usr/local/bin/gradle-2.4/bin/gradle assemble

CMD java -jar ./build/libs/app-1.0.jar
