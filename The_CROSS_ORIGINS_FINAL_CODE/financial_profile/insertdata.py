import sqlite3
from sqlite3 import Error
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__)) 
print (dir_path)
db_path=os.path.join(dir_path,"sqlite","db","company.db")

try:
    conn = sqlite3.connect(r'{db_path}'.format(db_path=db_path))
    print("connection to Database made")
except Error as e:
    print(e)

cursorObj = conn.cursor()
# def sql_table():
#     cursorObj.execute("drop table company_master")
#     cursorObj.execute("CREATE TABLE company_master(id INTEGER PRIMARY KEY, ticker TEXT,name TEXT,discription text)")
 
#     conn.commit()
 
# sql_table()

def insert_data():
    with open (os.path.join(dir_path,"company_data","companyList_Ticker.json")) as company:
        company_data=json.load(company) 
        tickers = company_data.keys()
        max_id = cursorObj.execute("select max(id)from company_master")
        last_id=max_id.fetchall()[0][0]
        print("==================",last_id)
        if last_id==None:
            max_id=0
        
        for index,value in enumerate(tickers):
            data=(max_id,value,company_data[value]["company_name"],str(company_data[value]["discription"]),str(company_data[value]["financial"]))
            cursorObj.execute('Insert into company_master(id,ticker,name,discription,financials)VALUES(?, ?, ?, ?, ?)',data) 
            conn.commit()
            max_id+=1

# if __name__=="__main__":
#     insert_data()
#     conn.close()
