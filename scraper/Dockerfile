FROM python:2.7

MAINTAINER Bryson Reynolds

## Scraping Family
RUN pip install --upgrade pip
RUN pip install beautifulsoup4 requests librabbitmq
RUN pip install scrapy service-identity kombu

RUN apt-get update
RUN apt-get -y install vim

RUN mkdir /scraper

ADD ./ar15/ /scraper/ar15/

WORKDIR /scraper/ar15/

CMD sleep 20 && scrapy runspider ar15/spiders/ar15_spider.py
