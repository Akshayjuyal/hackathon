#!/usr/bin/env python
from datetime import datetime
import json
from newsapi import NewsApiClient
from es_ingester import ESDataIngester

newsapi = NewsApiClient(api_key='1129f3d85dc54b1ca36d29c635e4d2ef')

ingester = ESDataIngester('news_topic', '10.40.0.9', '9200')

data = []
all_articles=[]
def get_news_article(name):
    all_articles = newsapi.get_everything(q=name,
                                      from_param='2019-08-15',
                                      to='2019-09-14',
                                      language='en',
                                      sort_by='publishedAt',
                                      page_size=50,
                                      page=2)
    from pprint import pprint as print
    print(all_articles)
    for article in all_articles['articles']:
        item = {
            'date': article['publishedAt'],
            'headline': article['title'],
            'description': article['description'],
            'content': article['content'],
            'source': article['source']['name'],
            'url': article['url'],
            'urlToImage': article['urlToImage'],
            'name': name.replace(' ', '_').lower(),
            'created_date': str(datetime.now().date())
        }
        data.append(item)


c_list = ['Walmart', 'Berkshire Hathaway', 'Apple Inc', 'Exxon Mobil', 'McKesson Corporation', 
          'UnitedHealth Group', 'CVS Health', 'General Motors', 'Ford']


for c_name in c_list:
    get_news_article(c_name)


data

with open('news_data.json', 'w') as fo:
    fo.write(json.dumps(data))

#for item in data:
#    ingester.ingest(item)