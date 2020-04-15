require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { menuServiceAddress } = require('../IP_Updates.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/:id([0-9]+)', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.get('/api/menu/:id', function(req, res) {
  let address = menuServiceAddress + '/api/menu/'+ req.params.id;
  // console.log('id: ', req.params.id);
  axios.get(address)
    .then(({ data }) => res.status(200).send(data))
    .catch((error) => res.status(500).send(error));
});

app.get('/loaderio-.txt', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'loaderio-.txt'));
});

app.listen(port, () => console.log(`Master app listening on port ${port}`));