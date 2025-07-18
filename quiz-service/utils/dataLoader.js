import { createReadStream } from 'fs';
import fs from 'fs';
import path from 'path';

import csv from 'csv-parser';

export const inputData = [];

const detailFolder = './data/Output/';

export const loadCsv = () => {
  return new Promise((resolve, reject) => {
    createReadStream('./data/input.csv')
      .pipe(csv())
      .on('data', (row) => {
        inputData.push(row);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

export const findQuizData = async (quiz) => {
  const careerDetailsFilePath = quiz.NAME + '.csv';
  return new Promise((resolve, reject) => {
    const results = [];
    const fullPath = path.join(detailFolder, careerDetailsFilePath);

    if (!fs.existsSync(fullPath)) {
      return reject(new Error(`File not found: ${fullPath}`));
    }

    createReadStream(detailFolder + careerDetailsFilePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => {
            if (!header) return header;
            // Strip BOM if present
            return header.replace(/^\uFEFF/, '');
          },
        }),
      )
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};
