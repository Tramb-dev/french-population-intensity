const express = require('express');
const file = require('./files/file');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/', express.static('../dist/french-population-intensity'));
 
app.get('/population', function (req, res) {
  file.getJson('./data/population-dep.json', function(json, code) {
    if (code === 404) {
      res.status(404).end();
    } else {
      res.json(json);
    }
  });
});

app.use('*', express.static('../dist/french-population-intensity'));
 
app.listen(PORT, () => {
  console.log('Server started and listening on port: ', PORT);
});