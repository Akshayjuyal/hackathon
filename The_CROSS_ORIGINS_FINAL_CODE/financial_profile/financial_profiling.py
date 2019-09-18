import sqlite3
from sqlite3 import Error
import os
import requests
import json
 

dir_path = os.path.dirname(os.path.realpath(__file__)) 
print (dir_path)
URL = "https://financialmodelingprep.com/api/v3/financials/income-statement/"
URL1 = "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/"
URL2 = "https://financialmodelingprep.com/api/v3/financial-ratios/"
URL3 = "https://financialmodelingprep.com/api/v3/enterprise-value/"
URL4 = "https://financialmodelingprep.com/api/v3/financial-statement-growth/"
# URL5 = "https://financialmodelingprep.com/api/v3/company/rating/"
URL6 = "https://financialmodelingprep.com/api/v3/historical-price-full/"
def financial_api():
    company_data=""
    old_data=""
    with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'r') as company_old:
        old_data=json.load(company_old)


    with open (os.path.join(dir_path,"company_data","companyList.json"),'r') as company:
        company_data=json.load(company)
        print(company_data)
        tickers = company_data.keys()
        
        for index,value in enumerate(tickers):
            
            print("+++++++++++++++++++++++++++++>>>>>>>>>>>>>>>>",value)
# ==================== Financial data======================

            quaterly_data = requests.get(url = URL+value+"?period=quarter")
            annual_data = requests.get(url = URL+value)
            quaterly_values=quaterly_data.json()
            annual_values=annual_data.json()
            quaterly_profile=quaterly_values['financials']
            annual_profile=annual_values['financials']
            # annual_profile_val={'annual_profile':annual_profile}
            # quaterly_profile_val={'quaterly_profile':quaterly_profile}
            # company_data[value]["financial"]
            # company_data[value]["financial"]['quaterly_profile']=quaterly_profile
# ==================== cashflow data======================

            quaterly_cashflow = requests.get(url = URL1+value+"?period=quarter")
            annual_cashflow = requests.get(url = URL1+value)
            quaterly_cashflow_values=quaterly_cashflow.json()
            annual_cashflow_values=annual_cashflow.json()
            quaterly_cash_profile=quaterly_cashflow_values['financials']
            annual_cash_profile=annual_cashflow_values['financials']            
            # company_data[value]["financial"]['annual_cashflow_profile']=annual_cash_profile
            # company_data[value]["financial"]['quaterly_cashflow_profile']=quaterly_cash_profile

# ==================== Financial ratios======================

            annual_financial_ratios = requests.get(url = URL2+value)
            annual_financial_values=annual_financial_ratios.json()
            annual_financial_profile=annual_financial_values['ratios']
            # company_data[value]["financial"]['annual_financial_ratio_profile']=annual_financial_profile

# ==================== Enterprise Values ratios======================

            quaterly_enterprise = requests.get(url = URL3+value+"?period=quarter")
            annual_enterprise = requests.get(url = URL3+value)
            quaterly_enterprise_values=quaterly_enterprise.json()
            annual_enterprise_values=annual_enterprise.json()
            quaterly_enterprise_profile=quaterly_enterprise_values['enterpriseValues']
            annual_enterprise_profile=annual_enterprise_values['enterpriseValues']            
            # company_data[value]["financial"]['annual_enterprise_profile']=annual_enterprise_profile
            # company_data[value]["financial"]['quaterly_enterprise_profile']=quaterly_enterprise_profile

# ==================== Financial Growth Values ratios======================

            quaterly_financial_growth = requests.get(url = URL4+value+"?period=quarter")
            annual_financial_growth = requests.get(url = URL4+value)
            quaterly_financial_growth_values=quaterly_financial_growth.json()
            annual_financial_growth_values=annual_financial_growth.json()
            quaterly_financial_growth_profile=quaterly_financial_growth_values['growth']
            annual_financial_growth_profile=annual_financial_growth_values['growth']            
            # company_data[value]["financial"]['annual_financial_growth_profile']=annual_financial_growth_profile
            # company_data[value]["financial"]['quaterly_financial_growth_profile']=quaterly_financial_growth_profile


# ==================== company Rating======================
            # company_rating = requests.get(url = URL5+value)
            # company_rating_values=company_rating.json()
            # company_rating_profile=company_rating_values['ratios']
            # company_data[value]["financial"]['company_rating']=company_rating_profile
# ==================== company Rating======================

            company_hist_growth = requests.get(url = URL6+value+"?serietype=line")
            company_hist_growth_values=company_hist_growth.json()
            company_hist_growth_profile=company_hist_growth_values['historical']
            # company_data[value]["financial"]['company_hist_growth']=company_hist_growth_profile
            
            old_data[value].update({"financial":{'annual_profile':annual_profile,
                                              'quaterly_profile':quaterly_profile,
                                              'annual_cashflow_profile':annual_cash_profile,
                                              'quaterly_cashflow_profile':quaterly_cash_profile,
                                              'annual_financial_ratio_profile':annual_financial_profile,
                                              'annual_enterprise_profile':annual_enterprise_profile,
                                              'quaterly_enterprise_profile':quaterly_enterprise_profile,
                                              'annual_financial_growth_profile':annual_financial_growth_profile,
                                              'quaterly_financial_growth_profile':quaterly_financial_growth_profile,
                                              'company_hist_growth':company_hist_growth_profile
                                              }})
        with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'w') as new_company:
            json.dump(old_data,new_company)
# financial_api()