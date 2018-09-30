$(document).ready(function(){
    $('form input').change(function () {
    
      $('#select').text("Uploading picture...");  
      setTimeout(function(){$('#select').text("Uploaded successful");},1000);
    });
  });