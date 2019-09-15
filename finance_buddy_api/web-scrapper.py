from bs4 import BeautifulSoup
import requests
import csv

company_data = {

}

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "DNT": "1", "Connection": "close", "Upgrade-Insecure-Requests": "1"}
url = 'https://www.crunchbase.com/organization/infosys#section-overview'

html_file = requests.get(url, headers=headers).text
soup = BeautifulSoup(html_file, "html5lib")

print(soup)
import ipdb; ipdb.set_trace()

# company_data['numberOfAcqui'] 
# print("------------------")
# section1_data = soup.findAll('div', {'class': 'layout-wrap layout-row'})[0].getText()
# section2_data  = soup.findAll('div', {'class': 'layout-wrap layout-row'})[1].getText()
# section3_data  = soup.findAll('div', {'class': 'layout-wrap layout-row'})[2].getText()
# section4_data  = soup.findAll('div', {'class': 'layout-wrap layout-row'})[3].getText()

# get 1st sectipon data
soup.findAll('section-layout', { 'data-theme-id': 'overview' })[0].getText()

#get ipo data
soup.findAll('section-layout', { 'data-theme-id': 'ipo' })[0].getText()

#get funding data
soup.findAll('section-layout', { 'data-theme-id': 'funding' })[0].getText()

#get investor data
soup.findAll('section-layout', { 'data-theme-id': 'investor' })[0].getText()

#get aquisization data
soup.findAll('section-layout', { 'data-theme-id': 'acquisition' })[0].getText()


