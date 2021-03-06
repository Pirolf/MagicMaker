//= require './modules/card_presenter'
//= require jquery
$(function(){
	var cardContainers = $('.card_container');
	cardContainers.each(function(i, e){
		var imagesUrl = $(this).attr('data-image-url');
		
		var card  = new CardPresenter($(this));
		card.loadArt();
		card.loadCardFrame(imagesUrl);
		card.loadAttackDefenseBox(imagesUrl);
		card.updateDescWithSymbols(card.desc.text());
		card.loadManaSymbols(imagesUrl);
	});
});