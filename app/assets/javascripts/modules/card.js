//= require '../modules/MagicMaker'
var Card = function(){
  this.artContainer = $('.card_art_container');
  this.colorSelect = $('#card_color');
  this.frameImage = $('#card_frame');
  this.attackDefenseBox = $('#attack_defense_box');
  this.attackDefense = $('#attack_defense');
  this.mana_costs = $('.mana_cost');
  this.manaSymbolsContainer = $('#mana_symbols_container');
  this.desc = $('#card_desc');
  this.cardName = $('#card_name');
  //2: spacing, 21= spacing + symbolwidth(19)
  this.maxManaSymbols = 15;

  this.updateAttackDefense = function(){
    var attack = $('#card_attack').val() ;
    var defense = $('#card_defense').val();
    this.attackDefense.text(attack + '/' + defense);
  }
  this.previewArt = function(fileInput){
    if (fileInput && fileInput.files[0]){
      var reader = new FileReader();
      reader.onload = function (e){
        this.artContainer.css('background-image', 'url(' + e.target.result + ')');
      }.bind(this);
      reader.readAsDataURL(fileInput.files[0]);
    }
  };
};

Card.prototype.loadArt = function(){
  //preload
  var artImage = new Image();
  artImage.onload = function(){
    this.artContainer.css('background-image', 'url(' + artUrl + ')'); 
  }.bind(this);

  var artUrl = this.artContainer.attr('data-art-url');
  artImage.src = artUrl;  
};

Card.prototype.loadCardFrame = function(){
    if (this.colorSelect === undefined || this.colorSelect === null)return;
    var selectedColor = this.colorSelect.val().toLowerCase();
    //get card frame url
    var cardFrameUrl = magicMaker.imagesPath + '/' + selectedColor + '/frame.jpg';
    var frameImage = new Image();
    frameImage.onload = function(){
      this.frameImage.attr('src', cardFrameUrl);
    }.bind(this);
    frameImage.src = cardFrameUrl;
};

Card.prototype.loadAttackDefenseBox = function(){
    if (this.colorSelect === undefined || this.colorSelect === null)return;
    var selectedColor = this.colorSelect.val().toLowerCase();
    var attackDefenseBoxUrl = magicMaker.imagesPath + '/' + selectedColor + '/attack_defense_box.png';
    var adImage = new Image();
    adImage.onload = function(){
      this.attackDefenseBox.attr('src', attackDefenseBoxUrl);
    }.bind(this);
    adImage.src = attackDefenseBoxUrl;
};