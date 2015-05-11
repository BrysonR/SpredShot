# -*- coding: utf-8 -*-

# Scrapy settings for ar15 project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

import os

BOT_NAME = 'ar15'

SPIDER_MODULES = ['ar15.spiders']
NEWSPIDER_MODULE = 'ar15.spiders'

try:
    BROKER_HOST = os.environ['BROKER_HOST']
except KeyError:
    BROKER_HOST = 'rabbit'

try:
    EXCHANGE_NAME = os.environ['EXCHANGE_NAME']
except KeyError:
    EXCHANGE_NAME = 'scraper.ar15'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'ar15 (+http://www.yourdomain.com)'
