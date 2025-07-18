import fs from 'fs';
import csvWriter from 'csv-writer';
import csv from 'csv-parser';
import { v4 as uuidv4 } from 'uuid';

const createCsvWriter = csvWriter.createObjectCsvWriter;

const results = [];

fs.createReadStream('./data/top1000.csv')
  .pipe(csv())
  .on('data', (row) => {
    row.ID = uuidv4();
    results.push(row);
  })
  .on('end', () => {
    const headers = Object.keys(results[0]).map((key) => ({
      id: key,
      title: key,
    }));

    const writer = createCsvWriter({
      path: 'output.csv',
      header: headers,
    });

    writer
      .writeRecords(results)
      .then(() => console.log('Written to output.csv'));
  });
