$(document).ready(function(){
    $('form input').change(function () {
    
      $('#select').text("Uploading...");  
      setTimeout(function(){$('#select').text("Upload successful.");},1000);
    });

    let smit = document.getElementById('uploadImg');
    smit.addEventListener('click',sub, false);

    function sub(){
      var button = document.getElementById('uploadImg');
      $('#select').text("Submitted.");
    }

  });