import json
import logging
from sentiment_analyser import AZCognitiveTextService
from es_ingester import ESDataIngester

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

path = r"C:\Users\hackathonuser1\Documents\news_ingester\news_data.json"


with open(path,'r') as fi:
    data = json.load(fi)

cog_client = AZCognitiveTextService()
es_client = ESDataIngester(index='news_topic')

for document in data:
    full_text = ''
    if document.get('content'):
        full_text += document.get('content')
    if document.get('headline'):
        full_text += document.get('headline')
    if document.get('description'):
        full_text += document.get('description')
    
    entities = cog_client.entity_extraction(full_text)
    if entities:
        document['entities'] = entities
    
    sentiment = cog_client.sentiment_extraction(full_text)
    if sentiment:
        document['sentiment_score'] = sentiment
    
    key_phrases = cog_client.phrase_extraction(full_text)
    if key_phrases:
        document['key_phrases'] = key_phrases
    
    
    #es_client.ingest(document)

with open('final_news_json_with_entities','w') as fo:
    fo.write(json.dumps(data))    
    #print(document)
