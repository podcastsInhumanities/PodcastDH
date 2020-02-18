const fs = require('fs');
const removeStopWords = require('./stringOps.js');

const path = './descriptions/tech_podcast_description_json.json'
const fileName = "techChart.json"
let descriptions = JSON.parse(fs.readFileSync(path)).descs;

let wordsMap = new Map();
let all = ""

function addOrCreate(key) {
    let oldValue = wordsMap.get(key)
    let newValue = (oldValue === undefined) ? 1 : oldValue + 1

    wordsMap.set(key, newValue)
}

descriptions.forEach(desc => {
    let clean = desc
    .removeStopWords()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .removeStopWords()
    .toLowerCase(); // Remove punctuation
    let arr = clean.split(' ');
    arr.forEach(addOrCreate)
});

let sorted = new Map([...wordsMap.entries()].sort((a, b) => b[1] - a[1]));
let data = new Array;
sorted.forEach((key, value) => {
    if (key > 5) data.push({"x": value, "value": key})
    
});
fs.writeFileSync(fileName, JSON.stringify(data));