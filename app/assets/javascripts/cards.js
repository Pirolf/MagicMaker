$(function() {
  pageReady();
});
$(document).on('page:load', pageReady);
$(document).on('change', '#card_image_file_field', function(){
  previewImage(this);
});
$(document).on('change', '#card_color', function(){
  loadCardFrame();
});
function pageReady(){
  loadArt();
}
function loadArt(){
  //preload
  var artImage = new Image();
  artImage.onload = function(){
      $('.card_art_container').css('background-image', 'url(' + artUrl + ')'); 
  }
  var artUrl = $('.card_art_container').attr('data-art-url');
  artImage.src = artUrl;
}
function previewImage(fileInput){
  if (fileInput && fileInput.files[0]){
    var reader = new FileReader();
    reader.onload = function (e){
      $('.card_art_container').css('background-image', 'url(' + e.target.result + ')');
    }
    reader.readAsDataURL(fileInput.files[0]);
  }
}
function loadCardFrame(){
  var selectedColor = $('#card_color').val().toLowerCase();
  //get card frame url
  var cardFrameUrl = $('#card_frame').attr('data-image-url') + '/' + selectedColor + '/frame.jpg';
  console.log(cardFrameUrl);
  //$('#card_frame').attr('src', cardFrameUrl);
  var frameImage = new Image();
  frameImage.onload = function(){
    $('#card_frame').attr('src', cardFrameUrl);
  }
  frameImage.src = cardFrameUrl;
}