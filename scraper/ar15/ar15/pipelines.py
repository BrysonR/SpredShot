# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

# project_name/pipelines.py
 
from scrapy import signals
from scrapy.utils.serialize import ScrapyJSONEncoder
from scrapy.xlib.pydispatch import dispatcher
 
from kombu import Connection, Exchange
 
from twisted.internet.threads import deferToThread
 
import json as simplejson
import settings
 
class MessageQueuePipeline(object):
    """Emit processed items to a RabbitMQ exchange/queue"""
    def __init__(self, host_name, exchange_name):
        self.q_connection = Connection('amqp://' + host_name)
        self.q_exchange = Exchange(exchange_name, 'direct', durable=True)
        dispatcher.connect(self.spider_opened, signals.spider_opened)
        dispatcher.connect(self.spider_closed, signals.spider_closed)
 
    @classmethod
    def from_settings(cls, settings):
        host_name = settings.get('BROKER_HOST')
        exchange_name = settings.get('EXCHANGE_NAME')
        return cls(host_name, exchange_name)
 
    def spider_opened(self, spider):
        self.producer = self.q_connection.Producer(serializer='json', exchange=self.q_exchange)
 
    def spider_closed(self, spider):
        self.producer.close()
 
    def process_item(self, item, spider):
        return deferToThread(self._process_item, item, spider)
 
    def _process_item(self, item, spider):
        self.producer.publish(dict(item))
        return item

        
class Ar15Pipeline(object):
    def process_item(self, item, spider):
        return item
