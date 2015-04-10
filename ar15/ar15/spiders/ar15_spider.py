from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.selector import Selector
from ar15.items import AR15Item
import uuid
import re

class AR15_Spider(CrawlSpider):
  name = "AR15"
  allowed_domains = ["ar15.com"]
  start_urls = ["http://www.ar15.com/forums/b/7_Equipment_Exchange.html"]

  rules = (
    Rule(LinkExtractor(unique=True, allow=('forums/f_7/*'), restrict_xpaths='//node()[preceding-sibling::div[@class="contentHeader"][4]][following-sibling::div[@class="contentHeader"][3]]/div[@class="forumBox"]/div[@class="floatLeft"]/a'), follow=True),
    Rule(LinkExtractor(unique=True, allow=('forums/f_7/*'), restrict_xpaths='//a[@class="floatPage"]'), follow=True),
    Rule(LinkExtractor(unique=True, allow=('forums/t_7*')), callback='parse_item'),
  )

  def parse_item(self, response):
    sel = Selector(response)
    item = AR15Item()
    title = ''.join(sel.xpath('//div[@class="mainBarLeft"]/a/text()').extract())
    imageUrl = ''.join(sel.xpath('//div[@class="forumTextBody"]/a[1]/img/@src').extract())
    description = ''.join(sel.xpath('//div[@class="forumTextBody"]/text()').extract())
    priceList = sel.xpath('//div[@class="forumTextBody"]/text()').re('(\$[0-9,]+(\.[0-9]{2})?)')

    if not len(priceList) > 0:
      return

    price = priceList[0]

    if "?Sold?" in title:
      return
    if imageUrl == '':
      return
    if price is None:
      return
    item['title'] = title
    item['link'] = response.url
    item['imageUrl'] = imageUrl
    item['price'] = price
    item['description'] = description
    item['guid'] = str(uuid.uuid4())
    yield item
