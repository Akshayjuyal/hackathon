# -*- coding: utf-8 -*-
import os
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials

SUBSCRIPTION_KEY_ENV_NAME = "f24192d3c7ea4c138a0bf5676434d772"
TEXTANALYTICS_LOCATION = os.environ.get(
    "TEXTANALYTICS_LOCATION", "westcentralus")


def language_extraction(subscription_key):
    """Language extraction.

    This example detects the language of several strings. 
    """
    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics_url = "https://{}.api.cognitive.microsoft.com".format(
        TEXTANALYTICS_LOCATION)
    text_analytics = TextAnalyticsClient(
        endpoint=text_analytics_url, credentials=credentials)

    try:
        documents = [
            {'id': '1', 'text': 'This is a document written in English.'},
            {'id': '2', 'text': 'Este es un document escrito en Español.'},
            {'id': '3', 'text': '这是一个用中文写的文件'}
        ]
        response = text_analytics.detect_language(documents=documents)

        for document in response.documents:
            print("Document Id: ", document.id, ", Language: ",
                  document.detected_languages[0].name)

    except Exception as err:
        print("Encountered exception. {}".format(err))


def key_phrases(subscription_key,documents):
    """Key-phrases.

    Returns the key talking points in several text examples.
    """
    print("key - phrases")
    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics_url = "https://{}.api.cognitive.microsoft.com".format(
        TEXTANALYTICS_LOCATION)
    text_analytics = TextAnalyticsClient(
        endpoint=text_analytics_url, credentials=credentials)

    try:
        
        for document in documents:
            print(
                "Asking key-phrases on '{}' (id: {})".format(document['text'], document['id']))

        response = text_analytics.key_phrases(documents=documents)

        for document in response.documents:
            print("Document Id: ", document.id)
            print("\tKey Phrases:")
            for phrase in document.key_phrases:
                print("\t\t", phrase)

    except Exception as err:
        print("Encountered exception. {}".format(err))


def sentiment(subscription_key,documents):
    """Sentiment.

    Scores close to 1 indicate positive sentiment, while scores close to 0 indicate negative sentiment.
    """
    print("Sentiment - 0 to 1 ")
    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics_url = "https://{}.api.cognitive.microsoft.com".format(
        TEXTANALYTICS_LOCATION)
    text_analytics = TextAnalyticsClient(
        endpoint=text_analytics_url, credentials=credentials)

    try:
       

        response = text_analytics.sentiment(documents=documents)
        for document in response.documents:
            print("Document Id: ", document.id, ", Sentiment Score: ",
                  "{:.2f}".format(document.score))

    except Exception as err:
        print("Encountered exception. {}".format(err))


def entity_extraction(subscription_key,documents):
    """EntityExtraction.

    Extracts the entities from sentences and prints out their properties.
    """
    print("EntityExtraction")
    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics_url = "https://{}.api.cognitive.microsoft.com".format(
        TEXTANALYTICS_LOCATION)
    text_analytics = TextAnalyticsClient(
        endpoint=text_analytics_url, credentials=credentials)

    try:
      
        response = text_analytics.entities(documents=documents)

        for document in response.documents:
            print("Document Id: ", document.id)
            print("\tKey Entities:")
            for entity in document.entities:
                print("\t\t", "NAME: ", entity.name, "\tType: ",
                      entity.type, "\tSub-type: ", entity.sub_type)
                for match in entity.matches:
                    print("\t\t\tOffset: ", match.offset, "\tLength: ", match.length, "\tScore: ",
                          "{:.2f}".format(match.entity_type_score))

    except Exception as err:
        print("Encountered exception. {}".format(err))


if __name__ == "__main__":
    documents = [{"id": "1", "language": "en", "text": "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800."},{"id": "2", "language": "es","text": "La sede principal de Microsoft se encuentra en la ciudad de Redmond, a 21 kilómetros de Seattle."}]
      

    #sys.path.append(os.path.abspath(os.path.join(__file__, "..", "..")))
    #from tools import execute_samples
    subscription_key = "f24192d3c7ea4c138a0bf5676434d772"
    entity_extraction(subscription_key,documents)
    sentiment(subscription_key,documents)
    key_phrases(subscription_key,documents)