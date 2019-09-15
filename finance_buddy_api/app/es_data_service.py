from elasticsearch import Elasticsearch


class ESDataService(object):
    def __init__(self, host='10.40.0.9', port='9200'):
        self.es_endpoint = "{0}:{1}".format(host, port)
        self.es = Elasticsearch(self.es_endpoint)

    def get_company_details(self, company_name):
        query = {
            "query": {"term": {"_id": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(index='company_details', body=query)
        return res['hits']['hits']

    def get_company_investments_acquisitions(self, company_name):
        query = {
            "query": {"term": {"_id": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(
            index='acquisition_investment_details_v1', body=query)
        return res['hits']['hits']

    def get_company_news(self, company_name):
        query = {"size": 50,
                 "sort": [
                     {
                         "date": {
                             "order": "desc"
                         }
                     }
                 ], "query": {"term": {"name": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(index='news_topic', body=query)
        return res['hits']['hits']

    def get_company_financials(self, company_name):
        query = {
            "query": {"term": {"_id": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(
            index='financial_stats', body=query)
        return res['hits']['hits']

    def get_company_description(self, company_name):
        query = {"_source": "description.profile.description",
                 "query": {"term": {"_id": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(
            index='financial_stats', body=query)
        if res:
            try:
                description = res['hits']['hits'][0]['_source']['description']['profile']['description']
            except Exception:
                description = ''
        return {"description": description}

    def get_news_word_cloud(self, company_name):
        query = {"size": 50,
                 "query": {"term": {"name": {"value": "{0}".format(company_name)}}}}
        res = self.es.search(index='news_topic', body=query)
        content = res['hits']['hits']
        from nltk.tokenize import word_tokenize
        from nltk.corpus import stopwords
        from collections import Counter
        import re
        words = []
        if content:
            for item in content:
                item = item.get('_source')
                words.extend(word_tokenize(
                    re.sub(r"(^|\W)\d+", "", item.get('content').replace('.', ' ').lower())))
                words.extend(word_tokenize(
                    re.sub(r"(^|\W)\d+", "", item.get('headline').replace('.', ' ').lower())))
                words.extend(word_tokenize(
                    re.sub(r"(^|\W)\d+", "", item.get('description').replace('.', ' ').lower())))
        stop_words = set(stopwords.words('english'))
        extra_stop_words = ['chars','said','would']
        for word in extra_stop_words:
            stop_words.add(word)
        words = [
            word for word in words if word not in stop_words and len(word) > 2]
        #words_freq = Counter(words)
        #print(words_freq.most_common())
        return words


if __name__ == "__main__":
    ec = ESDataService()
    ec.get_news_word_cloud('exxon_mobil')
