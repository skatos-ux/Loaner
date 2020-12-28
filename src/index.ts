import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

import * as config from '../config.json';

import router from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

if(config.useStatic) {
  app.use('/', express.static('static'));
} else {
  app.get('/', (req, res) => {
    res.send('Version back-end uniquement');
  });
}

app.listen(config.serverPort, () => {
  console.log('Server is listening on port ' + config.serverPort);
});