var MagicMaker = function(){
	var imagesPath = '/images/';
	var card;
}
window.magicMaker = new MagicMaker();
var ManaBuilder = function(magicMaker){
  //get all mana costs
	var mana_costs = {};
	var colorNames = ['red', 'green', 'blue', 'black', 'white', 'none'];
	for (var i=0; i < colorNames.length ;i++){
		var colorName = colorNames[i];
		var mana_cost = $('#mana_' + colorName).val();
		mana_cost = parseInt(mana_cost, 10);
		if (!isNaN(mana_cost) && mana_cost > 0){
			mana_costs[colorName] = mana_cost;
		}
	}
	//build symbols
	magicMaker.card.manaSymbolsContainer.empty();
	var symbolsArr = [];
	var colorlessMana = null;
	if (mana_costs.hasOwnProperty('none')){
		colorlessMana = mana_costs['none'];
		if (colorlessMana > 0){
			var container = jQuery('<div/>',{
				class: 'symbol_image_container'
			});
			var symbolImagePath = magicMaker.imagesPath + '/symbols/none.png';
			var manaSymbol = jQuery('<img/>',{
				class: 'mana_symbol',
				src: symbolImagePath,
				alt: mana_color
			});
			var manaCost = jQuery('<div/>',{
				class: 'symbol_number',
				text: colorlessMana.toString(10),
			});
			if (colorlessMana > 9){
				manaCost.addClass('largeManaText');
			}else{
				manaCost.addClass('smallManaText');
			}
			container.append(manaSymbol);
			container.append(manaCost);
			symbolsArr.push(container);
		}
	}
	for (var mana_color in mana_costs){
		if (mana_color !== 'none' && mana_costs.hasOwnProperty(mana_color)){
			var cost = mana_costs[mana_color];
			//get symbol image
			var symbolImagePath = magicMaker.imagesPath + '/symbols/' + mana_color +'.png';
			for(var i=0; i < cost && symbolsArr.length < magicMaker.card.maxManaSymbols ; i++){
				var container = jQuery('<div/>', {
					class: 'symbol_image_container'
				});
				var manaSymbol = jQuery('<img/>', {
					class: 'mana_symbol',
					src: symbolImagePath,
					alt: mana_color,
				});
				container.append(manaSymbol);
				symbolsArr.push(container);
			}
	  	}
		if (symbolsArr.length > magicMaker.card.maxManaSymbols){
			break;
		}
	}//end for
	for(var i=0; i < symbolsArr.length; i++){
		var right = (symbolsArr.length - 1 - i) * 21;
		var symbol = symbolsArr[i].find('.mana_symbol');
		var symbolNumber = symbolsArr[i].find('.symbol_number');
		if (symbolNumber !== undefined && symbolNumber !== null){
			symbolNumber.css('right', right + 'px');
		}
		symbol.css('right', right + 'px');
		magicMaker.card.manaSymbolsContainer.append(symbolsArr[i]);
	}
}
;
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
  this.typeSelect = $('select#card_type');
  this.subtypeSelect = $('select#card_subtype');
  this.typeSpan = $('span#type_text');
  this.hypenSpan = $('span#hypen');
  this.subtypeSpan = $('span#subtype_text');
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
      }
      else if (text[i] === '\n'){
        returnHtmlString += "<br />";
        i ++;
      }
      else{
        returnHtmlString += text[i];
        i ++;
      }
    }
    return returnHtmlString;
  }

  this.updateDescWithSymbols = function(text){
    var htmlString = "";
    if (text === undefined){
      htmlString = this.parseDesc($('#card_desc_input').val());
    }else{
      htmlString = this.parseDesc(text);
    }
    
    this.desc.html(htmlString);
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



$(function(){
  var pageReady = function (){
    magicMaker.card  = new Card();
    magicMaker.imagesPath = $(".card_container").attr("data-image-url");
    magicMaker.card.loadArt();
    magicMaker.card.loadCardFrame();
    magicMaker.card.loadAttackDefenseBox();
    magicMaker.card.updateDescWithSymbols();
    ManaBuilder(magicMaker);
  };

  pageReady();

  $('#card_image_file_field').change(function(event){
    magicMaker.card.previewArt(event.target);
  });

  $('select#card_type').change(function(event){
    var typeText = $('#card_type>option:selected').text();
    var emptyOption = jQuery("<option />", {
        value: ""
    });
    $('#hypen').empty();
    $('#subtype_text').empty();

    if ($(event.target).val() === "" || $(event.target).val() === undefined){
      $('.type_subtype span').empty();
      $('select#card_subtype').empty();
      $('select#card_subtype').append(emptyOption);
      $('select#card_subtype').val("");
      return;
    }

    $('#type_text').text(typeText);

    $.ajax({
      method: "GET",
      url: "/cards/subtypes.json",
      data: { type_id: $(event.target).val() }
    }).done(function(subtypes){
      var subtypesSelect = $('select#card_subtype');
      subtypesSelect.empty();
      //build new options
      subtypes.forEach(function(subtype){
        var option = jQuery("<option />", {
          value: subtype["id"],
          text: subtype["name"]
        });
        subtypesSelect.append(option);
      });

      subtypesSelect.append(emptyOption);

      if (subtypes.length > 0){
        var subtypeText = $('#card_subtype>option:selected').text();
        $('#hypen').text(' - ');
        $('#subtype_text').text(subtypeText);
      }
    });
  });

  $('select#card_subtype').change(function(event){
    if ($(event.target).val() === '' || $(event.target).val() === undefined ){
      $('#hypen').empty();
      $('#subtype_text').empty();
      return;
    }

    var subtypeText = $('#card_subtype>option:selected').text();
    $('#hypen').text(' - ');
    $('#subtype_text').text(subtypeText);
  });

  $('.insertable_symbol').click(function(event){
    var symbolUrl = $(event.target).attr('src');
    var alt = $(event.target).attr('alt');
    var textKey = $(event.target).attr('data-text-key');
    var descInput = $('#card_desc_input');

    var text = descInput.val();
    var selectionStart = descInput.prop("selectionStart");
    var selecionEnd = descInput.prop('selectionEnd');

    var textWithSymbolInserted = text.slice(0, selectionStart) + textKey + text.slice(selecionEnd);

    descInput.val(textWithSymbolInserted);
    //update desc presented
    //var htmlString = magicMaker.card.parseDesc(text);
    //magicMaker.card.desc.html(htmlString);
    magicMaker.card.updateDescWithSymbols();
  });

  $('#card_desc_input').on('input', function(event){
    magicMaker.card.updateDescWithSymbols();
  });

  $('#card_name').on('input', function(event){
    magicMaker.card.cardName.text($(event.target).val());
  });

  $('.mana_cost').on('input', function(event){
    ManaBuilder(magicMaker);
  });

  $('#card_attack, #card_defense').on('input', function(){
    magicMaker.card.updateAttackDefense();
  });

  $('#card_color').change(function(){
    magicMaker.card.loadCardFrame();
    magicMaker.card.loadAttackDefenseBox();
  });
});
