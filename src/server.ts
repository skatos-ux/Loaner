import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { resolve } from 'path';

import * as config from './config.json';

import router from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

if(config.useStatic) {
  app.use('/css', express.static(resolve(__dirname, '../static/css')));
  app.use('/js', express.static(resolve(__dirname, '../static/js')));
  app.get(/.*/,(_,res) => res.sendFile(resolve(__dirname, '../static/index.html')));
} else {
  app.get('/', (_, res) => res.send('Version back-end uniquement'));
}

app.listen(config.serverPort, () => console.log('Server is listening on port ' + config.serverPort));

export { app };