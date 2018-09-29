const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
