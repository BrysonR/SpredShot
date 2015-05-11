from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.selector import Selector, SelectorList
import uuid
import re

from glocktalk.items import GlockTalkItem


class GlockTalk_Spider(CrawlSpider):
    name = 'GlockTalk'
    allowed_domains = ['glocktalk.com']
    start_urls = ['http://glocktalk.com/forums/forumdisplay.php?f=39']

    rules = (
        Rule(LinkExtractor(unique=True, allow=('showthread.php'), restrict_xpaths=('//tbody[@id="threadbits_forum_39"]/tr/td[2]/div/a')), callback='parse_item'),
        Rule(LinkExtractor(allow=('forumdisplay.php'), restrict_xpaths=('//a[starts-with(@title, "Next Page")]')), follow=True),
    )

    def parse_item(self, response):
        sel = Selector(response)
        item = GlockTalkItem()
        title = ''.join(sel.xpath('//div[@class="smallfont"]/strong/text()').extract()[0])
        imageUrl = ''.join(sel.xpath('//div[starts-with(@id, "post_message_")]/a[1]/img/@src').extract())
        description = ''.join(sel.xpath('//div[starts-with(@id, "post_message_")]').extract()[0])
        priceList = sel.xpath('//div[starts-with(@id, "post_message_")]').re('(\$[0-9,]+(\.[0-9]{2})?)')

        if not len(priceList) > 0:
          return

        if imageUrl == '':
          return

        price = priceList[0]

        item['title'] = title
        item['link'] = response.url
        item['imageUrl'] = imageUrl
        item['price'] = price
        item['description'] = description
        item['guid'] = str(uuid.uuid4())

        yield item
