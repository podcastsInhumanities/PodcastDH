const csvParser = require('csv-parser');
const fs = require('fs')

let lengthMap = new Map();

function addOrCreate(len) {
    let oldValue = lengthMap.get(len)
    let newValue = (oldValue === undefined) ? 1 : oldValue + 1

    lengthMap.set(len, newValue)
}

function getLengthCategory(len) {
    if (len < 600) return 'up to 10 minutes'
    else if (len < 1200) return '10-20 minutes'
    else if (len < 2100) return '20-35 minutes'
    else if (len < 3600) return '35 minutes - 1 hour'
    else if (len < 7200) return '1-2 hours'
    else return '2 hours and up'
}

const path = './csvs/episodes.csv';
let rowCount = 0;

fs.createReadStream(path)
.pipe(csvParser())
.on('data', (row) => {
    let len = row.audio_length;
    let lenCategory = getLengthCategory(len);
    addOrCreate(lenCategory);
    rowCount++;
}).on('end', () => {
    console.log('length:', lengthMap);
    console.log('count:', rowCount);
})
