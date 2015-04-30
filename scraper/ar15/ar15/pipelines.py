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
    def __init__(self, host_name, port, userid, password, virtual_host):
        self.q_connection = Connection('amqp://rabbit')
        dispatcher.connect(self.spider_opened, signals.spider_opened)
        dispatcher.connect(self.spider_closed, signals.spider_closed)
 
    @classmethod
    def from_settings(cls, settings):
        host_name = settings.get('BROKER_HOST')
        port = settings.get('BROKER_PORT')
        userid = settings.get('BROKER_USERID')
        password = settings.get('BROKER_PASSWORD')
        virtual_host = settings.get('BROKER_VIRTUAL_HOST')
        encoder_class = settings.get('MESSAGE_Q_SERIALIZER', ScrapyJSONEncoder)
        return cls(host_name, port, userid, password, virtual_host)
 
    def spider_opened(self, spider):
        self.producer = self.q_connection.Producer(serializer='json')
        self.exchange = Exchange('scraper.ar15', 'direct', durable=True)
 
    def spider_closed(self, spider):
        self.publisher.close()
 
    def process_item(self, item, spider):
        return deferToThread(self._process_item, item, spider)
 
    def _process_item(self, item, spider):
        self.producer.publish(dict(item), exchange=self.exchange)
        return item

        
class Ar15Pipeline(object):
    def process_item(self, item, spider):
        return item
