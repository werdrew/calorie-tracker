#!/usr/bin/env python3
from bs4 import BeautifulSoup
import urllib.request
import re

SCHEMA = 'cs3200_project'
FOOD_TABLE  = 'food'
FOOD_TYPE_TABLE = 'food_type'

def _debug(msg):
    print(msg, flush=True)

def _parse_page(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    page = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(page, 'html.parser')
    return soup

def _compile_to_sql(name, food_type, grams_per_serving, calories_per_100g):
    food_type_sql = f'INSERT IGNORE INTO {SCHEMA}.{FOOD_TYPE_TABLE} (type)' \
f' VALUES ("{food_type}");'

    food_sql = f'INSERT INTO {SCHEMA}.{FOOD_TABLE} (type_id, name, grams_per_serving, calories_per_100g)' \
f' SELECT ft.id, "{name}", {grams_per_serving}, {calories_per_100g} ' \
f' FROM {FOOD_TYPE_TABLE} ft' \
f' WHERE ft.type = "{food_type}";'

    return food_type_sql + '\n' + food_sql

if __name__ == '__main__':
    base_url = 'https://www.calories.info/'
    soup = _parse_page(base_url)

    # Get all links on the front page.
    regex = re.compile('calorie-link')
    a_elements = soup.find_all('a', href=True, attrs={'class': regex})
    links = []
    for link in a_elements:
        links.append(link['href'])

    for link in links:
        soup = _parse_page(link)
        regex = re.compile('^kt-row')
        rows = soup.find_all('tr', attrs={'class': regex})
        link_arr = link.split('/')
        food_type = link_arr[len(link_arr) - 1]
        with open(f'./data/insert_food.sql', 'a+') as f:
            for row in rows:
                cells = row.find_all('td')
                name = cells[0].a.getText()
                
                serving = cells[2].getText()
                g_str = re.compile('[0-9]+ g|[0-9]+ ml')
                num_val = re.compile('[0-9]+')
                grams_per_serving = re.search(num_val, re.search(g_str, serving).group()).group()

                cal_str = cells[4].getText()
                calories_per_100g = re.search(num_val, cal_str).group()

                sql = _compile_to_sql(name, food_type, grams_per_serving, calories_per_100g)

                f.write(sql)
                f.write('\n')