//= require '../modules/MagicMaker'
var Card = function(){
  var SYMBOL_IMAGE_NAME = {
    "{r}": { relative_path: "red.png", alt: "red mana" },
    "{g}": { relative_path: "green.png", alt: "green mana" },
    "{u}": { relative_path: "blue.png", alt: "blue mana" },
    "{b}": { relative_path: "black.png", alt: "black mana" },
    "{w}": { relative_path: "white.png", alt: "white mana" },
    "{x}": { relative_path: "x.png", alt: "x mana" },
    "{t}": { relative_path: "tap.png", alt: "tap" },
    "{q}": { relative_path: "untap.png", alt: "nntap" },
    "{1}": { relative_path: "1.png", alt: "1 mana" },
    "{2}": { relative_path: "2.png", alt: "2 mana" },
    "{3}": { relative_path: "3.png", alt: "3 mana" },
    "{4}": { relative_path: "4.png", alt: "4 mana" },
    "{5}": { relative_path: "5.png", alt: "5 mana" },
    "{6}": { relative_path: "6.png", alt: "6 mana" },
    "{7}": { relative_path: "7.png", alt: "7 mana" },
    "{8}": { relative_path: "8.png", alt: "8 mana" },
    "{9}": { relative_path: "9.png", alt: "9 mana" }
  };
  this.artContainer = $('.card_art_container');
  this.colorSelect = $('#card_color');
  this.frameImage = $('.card_frame');
  this.attackDefenseBox = $('.attack_defense_box');
  this.attackDefense = $('.attack_defense');
  this.mana_costs = $('.mana_cost');
  this.manaSymbolsContainer = $('.mana_symbols_container');
  this.desc = $('.card_desc');
  this.cardName = $('.card_name');
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

  this.insertManaIntoDesc = function(symbolUrl, alt, textKey){
    var manaSymbol = jQuery('<img/>',{
      class: 'embedded_mana_symbol',
      src: symbolUrl,
      alt: alt
    });
    this.desc.append(manaSymbol);
  }

  //Parses a text string in to html with img of symbols
  //eg. Pay a {u} to... => Pay a <img /> to
  this.parseDesc = function(text){
    function lookUpManaInfo(k){
      var info = SYMBOL_IMAGE_NAME[k];
      if (info === undefined){
        return undefined;
      }
      
      var src = "/images/symbols_shadowless/" + info.relative_path;
      var alt = info.alt;
      return {src: src, alt: alt};
    }
    var returnHtmlString = "";
    var i = 0;
    while (i < text.length){
      if(text[i] === '{' && i+2 < text.length && text[i+2] === '}'){
        var k = "{" + text[i+1] + "}";
        var manaInfo = lookUpManaInfo(k);
        if (manaInfo == undefined){
          returnHtmlString += k;
        }else{
          returnHtmlString += "<img class='embedded_mana_symbol' src='" + manaInfo.src + "' alt='" + manaInfo.alt + "' />";
        }
        i += 3;
      }else{
        returnHtmlString += text[i];
        i ++;
      }
    }
    return returnHtmlString;
  }
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