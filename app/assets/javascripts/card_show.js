//= require './modules/card'
//= require jquery
function CardPresenter(){
	Card.call(this);
}
CardPresenter.prototype = Object.create(Card.prototype);
CardPresenter.prototype.constructor = CardPresenter;
CardPresenter.prototype.loadCardFrame = function (imagesUrl){
	var frameUrl =  imagesUrl + '/' +this.frameImage.attr('data-frame-url');
	var frameImage = new Image();
    	frameImage.onload = function(){
      	this.frameImage.attr('src', frameUrl);
    	}.bind(this);
    	frameImage.src = frameUrl;
}
CardPresenter.prototype.loadAttackDefenseBox = function (imagesUrl){
    	var attackDefenseBoxUrl = imagesUrl + '/' + this.attackDefenseBox.attr('data-attack-defense-box-url');
    	var adImage = new Image();
    	adImage.onload = function(){
      	this.attackDefenseBox.attr('src', attackDefenseBoxUrl);
    	}.bind(this);
    	adImage.src = attackDefenseBoxUrl;
}
CardPresenter.prototype.loadManaSymbols = function(imagesUrl){
	
	var mana_costs = {};
	var colorNames = ['red', 'green', 'blue', 'black', 'white', 'none'];
	for (var i=0; i < colorNames.length ;i++){
		var colorName = colorNames[i];
		var mana_cost = this.manaSymbolsContainer.attr('data-mana-' +colorName); 
		mana_cost = parseInt(mana_cost, 10);
		if (!isNaN(mana_cost) && mana_cost > 0){
			mana_costs[colorName] = mana_cost;
		}
	}
	//build symbols
	this.manaSymbolsContainer.empty();
	var symbolsArr = [];
	var colorlessMana = null;
	if (mana_costs.hasOwnProperty('none')){
		colorlessMana = mana_costs['none'];
		if (colorlessMana > 0){
			var container = jQuery('<div/>',{
				id: 'symbol_image_container'
			});
			var symbolmagePath = imagesUrl + '/symbols/colorless.png';
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
		if (mana_color !== 'none' && mana_costs.hasOwnProperty(mana_color)){
			var cost = mana_costs[mana_color];
			//get symbol image
			var symbolmagePath = imagesUrl + '/symbols/' + mana_color +'.png';
			for(var i=0; i < cost && symbolsArr.length < this.maxManaSymbols ; i++){
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
		if (symbolsArr.length > this.maxManaSymbols){
			break;
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
		this.manaSymbolsContainer.append(symbolsArr[i]);
	}
}
function pageReady(){
  	var card  = new CardPresenter();
  	var imagesUrl = $('#card_container').attr('data-image-url');
 	card.loadArt();
	card.loadCardFrame(imagesUrl);
	card.loadAttackDefenseBox(imagesUrl);
	card.loadManaSymbols(imagesUrl);
}
$(document).ready(pageReady);