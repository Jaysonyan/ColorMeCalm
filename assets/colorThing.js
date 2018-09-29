<!DOCTYPE HTML>
<html>
  <body>
    <script>
      function drawImage(imageObj) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;
        var sideLength = max(imageWidth, imageHeight);

        context.drawImage(imageObj, 0, 0, sideLength, sideLength);

        var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
        var data = imageData.data;

        // iterate over all pixels
        for(var i = 0, n = data.length; i < n; i += 4) {
          var red = data[i];
          var green = data[i + 1];
          var blue = data[i + 2];
          var alpha = data[i + 3];
        }

        // pick out pixel data from x, y coordinate
        var x = 20;
        var y = 20;
        var red = data[((imageWidth * y) + x) * 4];
        var green = data[((imageWidth * y) + x) * 4 + 1];
        var blue = data[((imageWidth * y) + x) * 4 + 2];
        var alpha = data[((imageWidth * y) + x) * 4 + 3];
        
        // iterate over all pixels based on x and y coordinates
        for(var y = 0; y < imageHeight; y++) {
          // loop through each column
          for(var x = 0; x < imageWidth; x++) {
            var red = data[((imageWidth * y) + x) * 4];
            var green = data[((imageWidth * y) + x) * 4 + 1];
            var blue = data[((imageWidth * y) + x) * 4 + 2];
            var alpha = data[((imageWidth * y) + x) * 4 + 3];
          }
        }
      }
      var imageObj = new Image();
      imageObj.onload = function() {
        drawImage(this);
      };
      imageObj.src = 'square_one.jpg';

    </script>
  </body>
</html>      