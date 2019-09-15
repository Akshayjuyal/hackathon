from elasticsearch import Elasticsearch

ES_HOST = '10.40.0.9:9200'

es = Elasticsearch(ES_HOST)
Elasticsearch()

def get_company_details(company_name):
    query = {"query": {"term": {"_id": {"value": "{0}".format(company_name)} } } }
    res = es.search(index='company_details', body= query )
    return res['hits']['hits']

