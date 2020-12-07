import express from 'express';

import router from './routes/router';

const app = express();
const port = process.argv[2] || 3000;

app.get('/', (req, res) => {
  res.send('Test');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

app.use('/api', router);
//app.use('/', express.static('static'));