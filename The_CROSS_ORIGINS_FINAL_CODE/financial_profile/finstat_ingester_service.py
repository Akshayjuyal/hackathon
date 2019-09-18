import json
import os
from es_ingester import ESDataIngester

dir_path = os.path.dirname(os.path.realpath(__file__)) 
print (dir_path)

with open (os.path.join(dir_path,"company_data","companyList_Ticker.json")) as company:
        company_data=json.load(company) 
        tickers = company_data.keys()
    
final_financial_cols = ['annual_profile', 'annual_financial_ratio_profile', 'annual_enterprise_profile','annual_financial_growth_profile']

final_company_profile = []
for key,value in company_data.items():
    final_dict = dict()
    for fkey,fvalue in value.items():
        if fkey == 'company_name':
            final_dict['company_name'] = fvalue.lower().replace(' ', '_')
        if fkey == 'discription':
            final_dict['description'] = fvalue
        if fkey == 'financial':
            for akey,avalue in fvalue.items():
                if akey in final_financial_cols:
                    final_dict[akey] = avalue
    final_company_profile.append(final_dict)


es_client = ESDataIngester(host='10.40.0.9', port='9200', index='financial_stats_v1' )
for company in final_company_profile:
    es_client.ingest(company, company.get('company_name'))
    