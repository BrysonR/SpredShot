FROM ubuntu
MAINTAINER Bryson reynolds <bryson@brysonreynolds.com>

RUN echo deb http://archive.ubuntu.com/ubuntu precise universe >> /etc/apt/sources.list
RUN apt-get update

## Python Family
RUN apt-get install -qy python python-dev python-distribute python-pip ipython

## Scraping Family
RUN pip install beautifulsoup4 requests
RUN apt-get install -qy libffi-dev libxml2-dev libxslt-dev lib32z1-dev libssl-dev
RUN pip install scrapy service-identity ScrapyElasticSearch

RUN mkdir /scraper

ADD ./ /scraper

RUN cd /scraper/ar15 && scrapy runspider ar15/spiders/ar15_spider.py
