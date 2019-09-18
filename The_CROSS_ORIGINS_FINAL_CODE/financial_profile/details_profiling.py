import sqlite3
from sqlite3 import Error
import os
import requests
import json
 

dir_path = os.path.dirname(os.path.realpath(__file__)) 
print (dir_path)
URL = "https://financialmodelingprep.com/api/v3/company/profile/"
def description_api():
    company_data=""
    old_data=""
    with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'r') as company_old:
        old_data=json.load(company_old)
    with open (os.path.join(dir_path,"company_data","companyList.json"),'r') as company:
        company_data=json.load(company)
        print(company_data)
        tickers = company_data.keys()
        
        for index,value in enumerate(tickers):
            data = requests.get(url = URL+value)
            values=data.json()
            old_data[value].update({"discription":values})

        with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'w') as new_company:
            json.dump(old_data,new_company)
# description_api()