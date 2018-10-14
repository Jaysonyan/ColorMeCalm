const express = require('express');
const app = express();
const path = require('path');
const upload  = require("express-fileupload");
const fs = require('fs');

app.use(express.static(__dirname));
app.use(upload());

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/upload', function(req, res) {
  if (req.files) {
    var file = req.files.fileToUpload,
      name = "image.png";
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err) {
      if(err) {
        console.log(err);
        res.send("error occured");
      }
      else {
        res.sendFile(__dirname + "/game.html");
      }
    });
  }
});

app.post('/easy', function(req, res) {
  let setting = {
    difficulty: "easy",
    dimension: 5
  };
  let data = JSON.stringify(setting, null, 2);
  fs.writeFile('difficulty.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
    res.sendFile(path.join(__dirname+'/index.html'));
  });
});

app.post('/medium', function(req, res) {
  let setting = {
    difficulty: "medium",
    dimension: 15
  };
  let data = JSON.stringify(setting, null, 2);
  fs.writeFile('difficulty.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
    res.sendFile(path.join(__dirname+'/index.html'));
  });
});

app.post('/hard', function(req, res) {
  let setting = {
    difficulty: "hard",
    dimension: 25
  };
  let data = JSON.stringify(setting, null, 2);
  fs.writeFile('difficulty.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
    res.sendFile(path.join(__dirname+'/index.html'));
  });
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/uploads/image.png');
});

app.get("/begin", (req, res) => {
  res.sendFile(__dirname + '/colorThing.html');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
