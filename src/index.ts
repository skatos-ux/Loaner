import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/router';

const app = express();
const port = process.argv[2] || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Test');
});


app.listen(port, () => {
  return console.log('Server is listening on port ' + port);
});


app.use('/api', router);

// A utiliser avec la partie front-end
//app.use('/', express.static('static'));