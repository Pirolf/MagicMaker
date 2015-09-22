var MagicMaker = MagicMaker || {};
MagicMaker.Paths = {
  imagesPath: ''
}
MagicMaker.Utils = {
  previewImage: function(fileInput, imageContainer){
    if (fileInput && fileInput.files[0]){
      var reader = new FileReader();
      reader.onload = function (e){
        imageContainer.css('background-image', 'url(' + e.target.result + ')');
      }
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}
MagicMaker.View = {
  card: null
}
var Card = function(){
  this.artContainer = $('.card_art_container');
  this.colorSelect = $('#card_color');
  this.frameImage = $('#card_frame');
  this.attackDefenseBox = $('#attack_defense_box');
  this.loadArt = function(){
    //preload
    var artImage = new Image();
    artImage.onload = function(){
       this.artContainer.css('background-image', 'url(' + artUrl + ')'); 
    }.bind(this);

    var artUrl = this.artContainer.attr('data-art-url');
    artImage.src = artUrl;  
  };

  this.loadCardFrame = function(){
    var selectedColor = this.colorSelect.val().toLowerCase();
    //get card frame url
    var cardFrameUrl = MagicMaker.Paths.imagesPath + '/' + selectedColor + '/frame.jpg';
    var frameImage = new Image();
    frameImage.onload = function(){
      this.frameImage.attr('src', cardFrameUrl);
    }.bind(this);
    frameImage.src = cardFrameUrl;
  };

  this.loadAttackDefenseBox = function(){
    var selectedColor = this.colorSelect.val().toLowerCase();
    var attackDefenseBoxUrl = MagicMaker.Paths.imagesPath + '/' + selectedColor + '/attack_defense_box.png';
    var adImage = new Image();
    adImage.onload = function(){
      this.attackDefenseBox.attr('src', attackDefenseBoxUrl);
    }.bind(this);
    adImage.src = attackDefenseBoxUrl;
  };
};

$(function() {
  pageReady();
});
$(document).on('page:load', pageReady);
$(document).on('change', '#card_image_file_field', function(){
  MagicMaker.Utils.previewImage(event.target, $('.card_art_container'));
});

$(document).on('change', '#card_color', function(){
  MagicMaker.View.card.loadCardFrame();
  MagicMaker.View.card.loadAttackDefenseBox();
});

function pageReady(){
  MagicMaker.View.card  = new Card();
  MagicMaker.Paths.imagesPath = $('.card_container').attr('data-image-url');
  MagicMaker.View.card.loadArt();
  MagicMaker.View.card.loadCardFrame();
  MagicMaker.View.card.loadAttackDefenseBox();
}
