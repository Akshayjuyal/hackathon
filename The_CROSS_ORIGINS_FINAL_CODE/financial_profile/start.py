import details_profiling
import financial_profiling
import format_data
import format_data_second
import insertdata

if __name__=="__main__":
    print("---------------process started---------------")
    details_profiling.description_api()
    financial_profiling.financial_api()
    format_data.clean_data()
    format_data_second.clean_data()
    insertdata.insert_data()
    print("---------------process finished---------------")
