$(document).ready(function(){
  $('form input').change(function () {
    $('#select').text("Uploading...");  
    setTimeout(function(){$('#select').text("Upload successful.");},1000);
    setTimeout(function(){$(':input[type="submit"]').removeAttr("disabled");},1000);
  });

  let smit = document.getElementById('uploadImg');
  let ez = document.getElementById('easy');
  let me = document.getElementById('med');
  let hd = document.getElementById('hard');
  smit.addEventListener('click',sub, false);

  function sub(){
    $('#select').text("Submitted.");
  }


});