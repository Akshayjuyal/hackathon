from flask import Flask, jsonify, request
from flask_cors import CORS
from data_service import get_company_name_list
from es_data_service import ESDataService

app = Flask(__name__)
CORS(app)

es_client = ESDataService()


@app.route('/getCompanyList', methods=['GET'])
def get_company_list():
    return jsonify(get_company_name_list())


@app.route('/getCompanyDetails/<company_name>', methods=['GET', 'POST'])
def get_company_detail(company_name):
    company_details = es_client.get_company_details(company_name)
    return jsonify(company_details)


@app.route('/getCompanyInvestments/<company_name>', methods=['GET', 'POST'])
def get_company_investments(company_name):
    company_investments = es_client.get_company_investments_acquisitions(
        company_name)
    return jsonify(company_investments)


@app.route('/getCompanyNews/<company_name>', methods=['GET', 'POST'])
def get_company_news(company_name):
    company_news = es_client.get_company_news(company_name)
    return jsonify(company_news)


@app.route('/getCompanyFinancials/<company_name>', methods=['GET', 'POST'])
def get_company_financials(company_name):
    company_financials = es_client.get_company_financials(company_name)
    return jsonify(company_financials)


@app.route('/getCompanyDescription/<company_name>', methods=['GET', 'POST'])
def get_company_description(company_name):
    company_description = es_client.get_company_description(company_name)
    return jsonify(company_description)

@app.route('/getNewsWordCloud/<company_name>', methods=['GET', 'POST'])
def get_news_word_cloud(company_name):
    word_cloud = es_client.get_news_word_cloud(company_name)
    return jsonify({'word_cloud':word_cloud})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
