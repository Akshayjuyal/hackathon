from elasticsearch import Elasticsearch
import logging 

log = logging.getLogger(__name__)

class ESDataIngester(object):
    def __init__(self, index, host, port):
        es_endpoint = "{0}:{1}".format(host, port)
        self.es = Elasticsearch(es_endpoint)
        self.index = index
    
    def ingest(self, document, _id):
        res = self.es.index(index=self.index, id=_id, body=document)
        log.info((res['result']))
