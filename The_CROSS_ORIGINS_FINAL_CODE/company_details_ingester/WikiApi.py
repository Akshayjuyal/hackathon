#!/usr/bin/env python
# coding: utf-8

# In[87]:


import time
import bs4
import requests
import html

def escape_text(param):
    return param.replace('\xa0', ' ')

def data_cleanup(data):
    if '\n' in data:
        return list(filter(lambda x: x!='', data.split('\n')))
    else:
        return data

def get_data(name):
    name = name.replace(' ', '_')
    url = f"https://en.wikipedia.org/wiki/{name}"
    res = requests.get(url)
    html = res.text
    soup = bs4.BeautifulSoup(html, "html.parser")
    
    data = {'name' : name}
    for table in soup.find_all('table'):
        if(' '.join(table.get('class', [])) == 'infobox vcard'):
            data['logo'] = bs4.BeautifulSoup(str(table))("tr")[0]('td')[0].a.find_all('img')[0]['src']
            for row in bs4.BeautifulSoup(str(table))("tr"):
                if(len(row("th")) and len(row("td"))):
                    if(row("th")[0].text == 'Website'):
                        data[escape_text(row("th")[0].text)] = escape_text(row("td")[0].a['href'])
                    elif(row("th")[0].text in ['Formerly', 'Products', 'Divisions', 'Services', 'Traded as']):
                        listData = []
                        for txt in row("td")[0].find_all('li'):
                            listData.append(escape_text(txt.text))
                        data[escape_text(row("th")[0].text)] = listData
                    else:
                        data[escape_text(row("th")[0].text)] = data_cleanup(escape_text(row("td")[0].text))
    return data

data = []
c_list = ['Walmart', 'Berkshire Hathaway', 'Apple Inc', 'Exxon Mobil', 'McKesson Corporation', 
          'UnitedHealth Group', 'CVS Health', 'General Motors', 'Ford']
# c_list = ['Walmart']
for c_name in c_list:
    data.append(get_data(c_name))


# In[88]:


from pprint import pprint as print
print(data)


# In[ ]:





# In[ ]:




