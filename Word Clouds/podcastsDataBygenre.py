import requests
import csv
import json

print("start")
HEADER = {'X-ListenAPI-Key': '1767064f08d94ae98e04b63f0355ac8e'}
podcasts_of_genre = []

genre_id = 93
page_number = 1
has_next = True


def getPodcastsByGenre():
    global has_next
    while (has_next):
        URL = 'https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id={0}&page={1}&safe_mode=1' \
            .format(genre_id, page_number)
        r = requests.get(URL, headers=HEADER)
        genre_data = r.json()
        genre_podcasts = genre_data["podcasts"]
        podcasts_of_genre.extend(genre_podcasts)
        has_next = genre_data["has_next"]
        page_number += 1
        print(page_number)
        if page_number >= 40:
            has_next = False
    with open('podcast_of_business_json.txt', 'w') as outfile:
        json.dump(podcasts_of_genre, outfile)


# creates a json of all the titles and decriptions of a podcast_of_<genre>_json.txt
def prepareForWordClouad():
    all_data = []
    description_data = []
    with open('podcast_of_tech_json.txt', 'r') as input:
        data = json.load(input)

    for pod in data:
        # can change to description or title
        description_data.append(pod['title'])

    with open('tech_podcast_title_json.txt', 'w') as output:
        json.dump(description_data, output)
