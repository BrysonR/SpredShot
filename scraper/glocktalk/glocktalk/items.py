from scrapy.item import Item, Field


class GlockTalkItem(Item):
  title = Field()
  link = Field()
  imageUrl = Field()
  price = Field()
  guid = Field()
  description = Field()
