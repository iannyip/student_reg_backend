const parse = require('csv-parse');
const fs = require('fs');

async function translateCSV(filename) {
  return new Promise((resolve) => {
    const arr = [];
    fs.createReadStream(`${__dirname}/${filename}.csv`)
      .pipe(
        parse({
          delimiter: ',',
        }),
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

const readCsvFn = async () => {
  try {
    const csvData = {};

    const csvFileNames = ['assignments', 'attendances', 'courses', 'coursetypes', 'coursetype_items', 'credits', 'employments', 'instructors', 'items', 'parents', 'sessions', 'signups', 'students', 'users'];

    for (idx in csvFileNames) {
      const key = csvFileNames[idx];
      csvData[key] = await translateCSV(key);
    }

    console.log('----- going to return -----');
    return csvData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = readCsvFn;
