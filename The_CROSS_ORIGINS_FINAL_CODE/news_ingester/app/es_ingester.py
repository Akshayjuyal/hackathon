from elasticsearch import Elasticsearch
import logging 

log = logging.getLogger(__name__)

class ESDataIngester(object):
    def __init__(self, index, host='10.40.0.9', port='9200'):
        es_endpoint = "{0}:{1}".format(host, port)
        self.es = Elasticsearch(es_endpoint)
        self.index = index
    
    def ingest(self, document, _id=None):
        if _id:
            res = self.es.index(index=self.index, id=_id, body=document)
        elif _id is None:
            res = self.es.index(index=self.index, body=document)
        log.info((res['result']))
