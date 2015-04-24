FROM python

MAINTAINER Bryson Reynolds <bryson@brysonreynolds.com>

## Scraping Family
RUN pip install beautifulsoup4 requests
RUN pip install scrapy service-identity ScrapyElasticSearch

RUN mkdir /scraper

ADD ./ar15/ /scraper/ar15/

WORKDIR /

CMD scrapy runspider /scraper/ar15/spiders/ar15_spider.py
