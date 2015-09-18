$(function() {
  pageReady();
});
$(document).on('page:load', pageReady);
$(document).on('change', '#card_image_file_field', function(){
  previewImage(this);
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