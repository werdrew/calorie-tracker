#!/usr/bin/env python3
from bs4 import BeautifulSoup
import urllib.request
import re

SCHEMA = 'cs3200_project'
EXERCISE_TABLE  = 'exercise'
EXERCISE_TYPE_TABLE = 'exercise_type'
CALORIES_BURNED_TABLE = 'calories_burned'

def _debug(msg):
    print(msg, flush=True)

def _parse_page(url):
    req = urllib.request.Request(url)
    page = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(page, 'html.parser')
    return soup

def _compile_to_sql(exercise_name, exercise_type, cals_burned_at):
    exercise_type_sql = f'INSERT IGNORE INTO {SCHEMA}.{EXERCISE_TYPE_TABLE} (type)' \
f' VALUES ("{exercise_type}");'

    exercise_sql = f'INSERT INTO {SCHEMA}.{EXERCISE_TABLE} (type_id, name) ' \
f'SELECT et.id, "{exercise_name}"' \
f' FROM {EXERCISE_TYPE_TABLE} et' \
f' WHERE type = "{exercise_type}";'

    at_130 = cals_burned_at['130']
    at_155 = cals_burned_at['155']
    at_180 = cals_burned_at['180']
    at_205 = cals_burned_at['205']

    cals_burned_at_sql = f'INSERT INTO {SCHEMA}.{CALORIES_BURNED_TABLE} ' \
'SELECT ' \
f'e.id, ' \
f'{at_130}, ' \
f'{at_155}, ' \
f'{at_180}, ' \
f'{at_205} ' \
f' FROM {SCHEMA}.{EXERCISE_TABLE} e ' \
f' WHERE e.name = "{exercise_name}"' \
f' AND e.type_id = (SELECT id FROM {EXERCISE_TYPE_TABLE} WHERE type = "{exercise_type}");'
    return exercise_type_sql + '\n' + exercise_sql + '\n' + cals_burned_at_sql


if __name__ == '__main__':
    base_url = 'https://www.nutristrategy.com/caloriesburned.htm'
    soup = _parse_page(base_url)

    table = soup.find('table', attrs={ 'border': 1, 'bordercolor': '#0000FF' })
    rows = table.find_all('tr')[1:]
    with open('./data/insert_exercise.sql', '+w') as f:
        for row in rows:
            cells = row.find_all('td')
            exercise_info = cells[0].font.getText().strip()
            if ', ' in exercise_info:
                on = ' ' if '(' in exercise_info else ', '
                exercise_info = exercise_info.split(on)
                exercise_type = ' '.join(exercise_info[0].split()).strip()
                exercise_name = ' '.join(exercise_info[1:]).strip()
            else:
                exercise_name = ' '.join(exercise_info.split()).strip()
                exercise_type = 'Other'
            cals_burned_at = {
                '130': ' '.join(cells[1].font.getText().split()).strip(),
                '155': ' '.join(cells[2].font.getText().split()).strip(),
                '180': ' '.join(cells[3].font.getText().split()).strip(),
                '205': ' '.join(cells[4].font.getText().split()).strip(),
            }

            sql = _compile_to_sql(exercise_name, exercise_type, cals_burned_at)

            f.write(sql)
            f.write('\n')