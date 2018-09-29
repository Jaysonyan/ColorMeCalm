const express = require('express');
const app = express();
const path = require('path');
const upload  = require("express-fileupload");
app.use(express.static(__dirname));
app.use(upload());

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

app.post('/upload', function(req, res) {
  if (req.files) {
    console.log(req.files)
    var file = req.files.fileToUpload,
      name = "image.png";
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err) {
      if(err) {
        console.log(err);
        res.send("error occured");
      }
      else {
        res.send("Done!");
      }
    });

  }
});
