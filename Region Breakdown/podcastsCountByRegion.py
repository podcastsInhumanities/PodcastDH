import requests
import csv
import json
a = 5
print(a)
URL = 'https://listen-api.listennotes.com/api/v2/regions'
HEADER = {'X-ListenAPI-Key': '1767064f08d94ae98e04b63f0355ac8e'}
number_of_podcasts_in_region = []
r = requests.get(URL, headers=HEADER)
data = r.json()
region_csv = open('podcast_region_data.csv', 'w')

for region_id, region_name in data["regions"].items():
    page_number = 1
    pod_count = 0
    # has_next = True
    # while(has_next):
    r = requests.get('https://listen-api.listennotes.com/api/v2/best_podcasts?page={0}&region={1}&safe_mode=1'
                 .format(page_number, region_id), headers = HEADER)
    region_data = r.json()
    pod_count = region_data["total"]
    number_of_podcasts_in_region.append({"Name": region_name, "count": pod_count})

print(number_of_podcasts_in_region)

with open('podcast_region_json.txt', 'w') as outfile:
    json.dump(number_of_podcasts_in_region, outfile)

csvwriter = csv.writer(region_csv)
count = 0
for reg in number_of_podcasts_in_region:
    if count == 0:
        header = reg.keys()
        csvwriter.writerow(header)
        count += 1
    csvwriter.writerow(reg.values())
region_csv.close()