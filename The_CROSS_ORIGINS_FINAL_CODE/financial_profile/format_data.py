import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__)) 


def clean_data():
    with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'r') as company_old:
        old_data=json.load(company_old)
        mainkeys = old_data.keys()
        # new_dict=old_data
        for index,values in enumerate(mainkeys):
            print("++++++++++++")
            dict_vals=old_data[values]['discription']['profile']
            dict_vals={key.lower(): val for key, val in dict_vals.items()}
            old_data[values]['discription']['profile']=dict_vals
            inner_keys = old_data[values]["financial"].keys()
            
            for inner_index,inner_val in enumerate(inner_keys):
                for inner_inner_ins,iner_inner_val in enumerate(old_data[values]["financial"][inner_val]):
                    # if inner_val == "annual_financial_ratio_profile":
                    #     old_data[values]["financial"][inner_val][inner_inner_ins]['investmentvaluationratios']={k.lower().replace(" / ","/").replace(" ",""): v for k, v in old_data[values]["financial"][inner_val][inner_inner_ins]['investmentvaluationratios'].items()}
                    # else:
                    old_data[values]["financial"][inner_val][inner_inner_ins]={k.lower().replace(" / ","/").replace(" ",""): v for k, v in old_data[values]["financial"][inner_val][inner_inner_ins].items()}

        with open (os.path.join(dir_path,"company_data","companyList_Ticker.json"),'w') as new_company:
            json.dump(old_data,new_company)

# clean_data()