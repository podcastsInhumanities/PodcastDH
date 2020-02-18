const axios = require('axios').default;
const fs = require('fs');
const sortFunc = function(a, b) {return b.total - a.total}

const genresUrl = "https://listen-api.listennotes.com/api/v2/genres"
const bestPodcastsUrl = "https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id="
const apiKey = {'X-ListenAPI-Key': '3b4d510018c947b09ed063f697c53ce7'}

axios.get(genresUrl, {headers: apiKey}).then(
    (genresRes) => {
        let genres = genresRes.data.genres
        Promise.all(
            genres.map(genre => axios.get(bestPodcastsUrl + genre.id, {headers: apiKey}))).then(
                arr => {
                    let genresMap = arr.map(podcastsRes => {
                        let data = podcastsRes.data
                        return {genre: data.name, total: data.total}
                    }).sort(sortFunc)
                    fs.writeFileSync('genres.json', JSON.stringify(genresMap));

                    let smaller = genresMap.filter(element => element.total > 150);
                    smaller.sort(sortFunc);
                    fs.writeFileSync('smallerGenres.json', JSON.stringify(smaller));

        }
    )}
)
