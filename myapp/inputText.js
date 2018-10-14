$(document).ready(function(){
  $('form input').change(function () {
    $('#select').text("Uploading...");
    setTimeout(function(){$('#select').text("Upload successful.");},1000);
    setTimeout(function(){$(':input[type="submit"]').removeAttr("disabled");},1000);
  });

  let smit = document.getElementById('uploadImg');
  smit.addEventListener('click',sub, false);
});

document.addEventListener('DOMContentLoaded', function() {
  let easy = document.getElementById('easy');
  let medium = document.getElementById('medium');
  let hard = document.getElementById('hard');
  easy.addEventListener("click", setEasy);
  medium.addEventListener("click", setMedium);
  hard.addEventListener("click", setHard);
});

function sub() {
  $('#select').text("Submitted.");
}

function setEasy() {
  $.ajax({
      type: "POST",
      url: '/easy'
  });
}

function setMedium() {
  $.ajax({
      type: "POST",
      url: '/medium'
  });
}
function setHard() {
  $.ajax({
      type: "POST",
      url: '/hard'
  });
}
