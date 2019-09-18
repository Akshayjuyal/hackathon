import os
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials

import logging

log = logging.getLogger(__name__)

SUBSCRIPTION_KEY_ENV_NAME = "f24192d3c7ea4c138a0bf5676434d772"
TEXTANALYTICS_LOCATION = os.environ.get(
    "TEXTANALYTICS_LOCATION", "westcentralus")


class AZCognitiveTextService(object):
    def __init__(self, subscription_key=SUBSCRIPTION_KEY_ENV_NAME, location=TEXTANALYTICS_LOCATION):
        self.subscription_key = subscription_key
        self.location = location
        credentials = CognitiveServicesCredentials(subscription_key)
        text_analytics_url = "https://{}.api.cognitive.microsoft.com".format(
            TEXTANALYTICS_LOCATION)
        self.cog_client = TextAnalyticsClient(
            endpoint=text_analytics_url, credentials=credentials)

    def entity_extraction(self, document):
        entities = []
        documents = [{"id":1 , "text":document}]
        try:
            response = self.cog_client.entities(documents=documents)
            if response.documents:
                for entity in response.documents[0].entities:
                    entities.append({'name':entity.name, 'entity_type':entity.type,'entity_sub_type':entity.sub_type})
                
        except Exception as err:
            log.error("Encountered exception. {}".format(err))
        return entities

    def phrase_extraction(self, document):
        phrases = []
        documents = [{"id":1 , "text":document}]
        try:
            response = self.cog_client.key_phrases(documents=documents)
            if response.documents:
                phrases = response.documents[0].key_phrases
        except Exception as err:
            log.error("Encountered exception. {}".format(err))
        return phrases

    def sentiment_extraction(self, document):
        sentiment = []
        documents = [{"id":1 , "text":document}]
        
        try:
            response = self.cog_client.sentiment(documents=documents)
            if response.documents:
                sentiment = response.documents[0].score
        except Exception as err:
            log.error("Encountered exception. {}".format(err))
        return sentiment
