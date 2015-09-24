var manaBuilder = require('./modules/ManaBuilder');
var magicMaker = require('./modules/MagicMaker');

var Card = function(){
  this.artContainer = $('.card_art_container');
  this.colorSelect = $('#card_color');
  this.frameImage = $('#card_frame');
  this.attackDefenseBox = $('#attack_defense_box');
  this.mana_costs = $('.mana_cost');
  this.manaSymbolsContainer = $('#mana_symbols_container');
  //2: spacing, 21= spacing + symbolwidth(19)
  this.maxManaSymbols = 15;
  this.loadArt = function(){
    //preload
    var artImage = new Image();
    artImage.onload = function(){
      this.artContainer.css('background-image', 'url(' + artUrl + ')'); 
    }.bind(this);

    var artUrl = this.artContainer.attr('data-art-url');
    artImage.src = artUrl;  
  };
  this.previewArt = function(fileInput){
    if (fileInput && fileInput.files[0]){
      var reader = new FileReader();
      reader.onload = function (e){
        this.artContainer.css('background-image', 'url(' + e.target.result + ')');
      }.bind(this);
      reader.readAsDataURL(fileInput.files[0]);
    }
  };
  this.loadCardFrame = function(){
    var selectedColor = this.colorSelect.val().toLowerCase();
    //get card frame url
    var cardFrameUrl = magicMaker.imagesPath + '/' + selectedColor + '/frame.jpg';
    var frameImage = new Image();
    frameImage.onload = function(){
      this.frameImage.attr('src', cardFrameUrl);
    }.bind(this);
    frameImage.src = cardFrameUrl;
  };

  this.loadAttackDefenseBox = function(){
    var selectedColor = this.colorSelect.val().toLowerCase();
    var attackDefenseBoxUrl = magicMaker.imagesPath + '/' + selectedColor + '/attack_defense_box.png';
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
  magicMaker.card.previewArt(event.target);
});
$(document).on('change', '.mana_cost', function(){
  manaBuilder(magicMaker);
});

$(document).on('change', '#card_color', function(){
  magicMaker.card.loadCardFrame();
  magicMaker.card.loadAttackDefenseBox();
});

function pageReady(){
  magicMaker.card  = new Card();
  var imagesPath = $('.card_container').attr('data-image-url');
  if (imagesPath.charAt(imagesPath.length-1) !== '/'){
    imagesPath = imagesPath + "/";
  }
  magicMaker.imagesPath = imagesPath;
  magicMaker.card.loadArt();
  magicMaker.card.loadCardFrame();
  magicMaker.card.loadAttackDefenseBox();
  manaBuilder(magicMaker);
}
