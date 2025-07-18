import app from './app.js';
import { loadCsv } from './utils/dataLoader.js';

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8080;
}

loadCsv().then(() =>
  app.listen(port, () => console.log('Csv read. Server started on ' + port)),
);
