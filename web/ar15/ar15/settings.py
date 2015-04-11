# -*- coding: utf-8 -*-

# Scrapy settings for ar15 project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'ar15'

SPIDER_MODULES = ['ar15.spiders']
NEWSPIDER_MODULE = 'ar15.spiders'

ITEM_PIPELINES = [
  'scrapyelasticsearch.scrapyelasticsearch.ElasticSearchPipeline',
]

ELASTICSEARCH_SERVER = 'http://brentmills.cloudapp.net'
ELASTICSEARCH_PORT = 9200
ELASTICSEARCH_INDEX = 'ar15'
ELASTICSEARCH_TYPE = 'listing'
ELASTICSEARCH_UNIQ_KEY = 'guid'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'ar15 (+http://www.yourdomain.com)'
