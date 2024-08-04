const parse = require('csv-parse');
const fs = require('fs');

function getJsonArray(readArray) {
  const result = [];
  const headers = readArray[0];
  const cols = headers.length;
  for (let i = 1; i < readArray.length; i += 1) {
    const row = readArray[i];
    const obj = {};
    for (let col = 0; col < cols; col += 1) {
      obj[headers[col]] = row[col];
    }
    result.push(obj);
  }
  return result;
}

async function translateCSV(filename) {
  return new Promise((resolve) => {
    const arr = [];
    fs.createReadStream(`${__dirname}/csvData/${filename}.csv`)
      .pipe(
        parse({
          delimiter: ',',
        })
      )
      .on('data', (dataRow) => {
        arr.push(dataRow);
      })
      .on('end', () => {
        console.log(filename, ': ', arr.length);
        resolve(arr);
      });
  });
}

async function writeJsonToFile(jsonObj) {
  const jsonString = JSON.stringify(jsonObj, null, 2);
  fs.writeFile('jsonData.json', jsonString, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File has been written successfully');
    }
  });
}

const readCsvFn = async () => {
  try {
    const csvData = {};

    const csvFileNames = [
      'assignments',
      'attendances',
      'courses',
      'coursetypes',
      'coursetype_items',
      'credits',
      'employments',
      'instructors',
      'items',
      'parents',
      'sessions',
      'signups',
      'students',
      'users',
    ];

    for (idx in csvFileNames) {
      const key = csvFileNames[idx];
      const readArray = await translateCSV(key);
      csvData[key] = getJsonArray(readArray);
    }

    console.log('----- going to return -----');
    // console.log(csvData.courses[1]);
    // console.log(csvData.students[1][0]);
    // console.log(csvData.students[1][1]);
    // console.log(csvData.students[1][2]);
    // console.log(csvData.students[1][3]);
    // console.log('----------------------');
    // console.log(typeof csvData.students[1][2]);
    // console.log(new Date(csvData.students[1][2]));
    // console.log(new Date(csvData.students[1][3]));
    writeJsonToFile(csvData);
    // console.log(csvData);
    return csvData;
  } catch (error) {
    console.log(error);
  }
};

// readCsvFn();

module.exports = readCsvFn;
