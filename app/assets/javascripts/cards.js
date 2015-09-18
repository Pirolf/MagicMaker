$(function() {
  //pageReady();
});
//$(document).on('page:load', pageReady);
$(document).on('change', '#card_image_file_field', function(){
  previewImage(this);
});
function previewImage(fileInput){
  if (fileInput && fileInput.files[0]){
    var reader = new FileReader();
    reader.onload = function (e){
      console.log("loading");
      $('.card_art').attr('src', e.target.result);
    }
    reader.readAsDataURL(fileInput.files[0]);
  }
}