from scrapy.item import Item, Field

    
class AR15Item(Item):
  title = Field()
  link = Field()
  imageUrl = Field()
  price = Field()
  guid = Field()
  description = Field()
