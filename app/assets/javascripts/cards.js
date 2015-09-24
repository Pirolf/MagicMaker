var MagicMaker = MagicMaker || {};
MagicMaker.Paths = {
  imagesPath: ''
}
MagicMaker.Utils = {
  isInt: function(n) { return parseInt(n, 10) === n },
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
  this.mana_costs = $('.mana_cost');
  this.manaSymbolsContainer = $('#mana_symbols_container');

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
$(document).on('change', '.mana_cost', function(){
  console.log("mana changed");
  //get all mana costs
  var mana_costs = {};
  var colorNames = ['red', 'green', 'blue', 'black', 'white', 'colorless'];
  for (var i=0; i < colorNames.length ;i++){
    var colorName = colorNames[i];
    var mana_cost = $('#mana_' + colorName).val();
    mana_cost = parseInt(mana_cost, 10);
    if (!isNaN(mana_cost) && mana_cost > 0){
      mana_costs[colorName] = mana_cost;
    }
  }
  //build symbols
  MagicMaker.View.card.manaSymbolsContainer.empty();
  var symbolsArr = [];
  var colorlessMana = null;
  if (mana_costs.hasOwnProperty('colorless')){
    colorlessMana = mana_costs['colorless'];
    if (colorlessMana > 0){
      var container = jQuery('<div/>',{
        id: 'symbol_image_container'
      });
      var symbolmagePath = MagicMaker.Paths.imagesPath + 'symbols/colorless.png';
      var manaSymbol = jQuery('<img/>',{
        class: 'mana_symbol',
        src: symbolmagePath,
        alt: mana_color
      });
      var manaCost = jQuery('<div/>',{
        id: 'symbol_number',
        text: colorlessMana.toString(10),
      });
      if (colorlessMana > 9){
        manaCost.attr('class', 'largeManaText');
      }else{
        manaCost.attr('class', 'smallManaText');
      }
      container.append(manaSymbol);
      container.append(manaCost);
      symbolsArr.push(container);
    }
  }
  for (var mana_color in mana_costs){
    if (mana_color !== 'colorless' && mana_costs.hasOwnProperty(mana_color)){
      var cost = mana_costs[mana_color];
      //get symbol image
      var symbolmagePath = MagicMaker.Paths.imagesPath + 'symbols/' + mana_color +'.png';
      for(var i=0; i < cost; i++){
        var container = jQuery('<div/>', {
          id: 'symbol_image_container'
        });
        var manaSymbol = jQuery('<img/>', {
            class: 'mana_symbol',
            src: symbolmagePath,
            alt: mana_color,
        });
        container.append(manaSymbol);
        symbolsArr.push(container);
      }
    }
  }//end for
  for(var i=0; i < symbolsArr.length; i++){
    var right = (symbolsArr.length - 1 - i) * 21;
    var symbol = symbolsArr[i].find('.mana_symbol');
    var symbolNumber = symbolsArr[i].find('#symbol_number');
    if (symbolNumber !== undefined && symbolNumber !== null){
      symbolNumber.css('right', right + 'px');
    }
    symbol.css('right', right + 'px');
    MagicMaker.View.card.manaSymbolsContainer.append(symbolsArr[i]);
  }
});

$(document).on('change', '#card_color', function(){
  MagicMaker.View.card.loadCardFrame();
  MagicMaker.View.card.loadAttackDefenseBox();
});

function pageReady(){
  MagicMaker.View.card  = new Card();
  var imagesPath = $('.card_container').attr('data-image-url');
  if (imagesPath.charAt(imagesPath.length-1) !== '/'){
    imagesPath = imagesPath + "/";
  }
  MagicMaker.Paths.imagesPath = imagesPath;
  MagicMaker.View.card.loadArt();
  MagicMaker.View.card.loadCardFrame();
  MagicMaker.View.card.loadAttackDefenseBox();
}
