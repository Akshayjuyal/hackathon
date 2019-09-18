#!/usr/bin/env python
# coding: utf-8
from datetime import datetime
import time
import bs4
import requests
import html

from es_ingester import ESDataIngester

import logging 

logging.basicConfig(level = logging.INFO)
log = logging.getLogger(__name__)



class CompanyDetailCrawler():
    def __init__(self):
        pass

    def escape_text(self, param):
        return param.replace('\xa0', ' ')

    def data_cleanup(self, data):
        if '\n' in data:
            return list(filter(lambda x: x!='', data.split('\n')))
        else:
            return data

    def get_data(self, name):
        name = name.replace(' ', '_')
        url = f"https://en.wikipedia.org/wiki/{name}"
        res = requests.get(url)
        html = res.text
        soup = bs4.BeautifulSoup(html, "html.parser")
        
        data = {'name' : name.lower()}
        for table in soup.find_all('table'):
            if(' '.join(table.get('class', [])) == 'infobox vcard'):
                data['logo'] = bs4.BeautifulSoup(str(table))("tr")[0]('td')[0].a.find_all('img')[0]['src']
                for row in bs4.BeautifulSoup(str(table))("tr"):
                    if(len(row("th")) and len(row("td"))):
                        if(row("th")[0].text == 'Website'):
                            data[self.escape_text(row("th")[0].text)] = self.escape_text(row("td")[0].a['href'])
                        elif(row("th")[0].text in ['Formerly', 'Products', 'Divisions', 'Services', 'Traded as']):
                            listData = []
                            for txt in row("td")[0].find_all('li'):
                                listData.append(self.escape_text(txt.text))
                            data[self.escape_text(row("th")[0].text)] = listData
                        else:
                            data[self.escape_text(row("th")[0].text)] = self.data_cleanup(self.escape_text(row("td")[0].text))
        return data



if __name__ == "__main__":
    company_detail_crawler = CompanyDetailCrawler()
    company_details = []
    #This list would be retrieved from the backend datastore
    company_list = ['Walmart', 'Berkshire Hathaway', 'Apple Inc', 'Exxon Mobil', 'McKesson Corporation', 
          'UnitedHealth Group', 'CVS Health', 'General Motors', 'Ford']

    source_target_column_mapping = {"Area served": "area_served", "Divisions": "divisions", "Formerly": "formerly", "Founded": "founded", "Founders": "founder", "Founder": "founder", "Headquarters": "headquarters", "ISIN": "ISIN", "Industry": "industry", "Key people": "key_people", "Net income": "net_income", "Number of employees": "employee_count", "Number of locations": "location_count","Predecessor":"predecessor",
                  "Operating income": "operating_income", "Owner": "owner", "Products": "product", "Revenue": "revenue", "Services": "services", "Subsidiaries": "subsidiares", "Total assets": "total_assets", "Total equity": "total_equity", "Traded as": "traded_as", "Type": "type", "Website": "website", "logo": "logo", "name": "company_name", "Production output":"production_output", "Owners": "owners"}

    for company in company_list:
        company_details.append(company_detail_crawler.get_data(company))


    for detail in company_details:
        for key,value in source_target_column_mapping.items():
            if detail.get(key) is not None:
                detail[value] = detail.pop(key)
        detail['created_date'] =  datetime.now()

    ES_INDEX = 'company_details'
    host = '10.40.0.9'
    port = '9200'
    es_ingester = ESDataIngester(ES_INDEX, host, port)

    for document in company_details:
        es_ingester.ingest(document, document.get('company_name'))

#res = es.get(index="test-index", doc_type='tweet', id=1)
#print(res['_source'])

#es.indices.refresh(index="test-index")

#res = es.search(index="test-index", body={"query": {"match_all": {}}})
#print("Got %d Hits:" % res['hits']['total']['value'])
#for hit in res['hits']['hits']:
#    print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])
