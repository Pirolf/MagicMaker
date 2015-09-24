module.exports = function(magicMaker){
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
	magicMaker.card.manaSymbolsContainer.empty();
	var symbolsArr = [];
	var colorlessMana = null;
	if (mana_costs.hasOwnProperty('colorless')){
		colorlessMana = mana_costs['colorless'];
		if (colorlessMana > 0){
			var container = jQuery('<div/>',{
				id: 'symbol_image_container'
			});
			var symbolmagePath = magicMaker.imagesPath + 'symbols/colorless.png';
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
			var symbolmagePath = magicMaker.imagesPath + 'symbols/' + mana_color +'.png';
			for(var i=0; i < cost && symbolsArr.length < magicMaker.card.maxManaSymbols ; i++){
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
		if (symbolsArr.length > magicMaker.card.maxManaSymbols){
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
		magicMaker.card.manaSymbolsContainer.append(symbolsArr[i]);
	}
}