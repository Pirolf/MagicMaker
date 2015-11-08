//= require './modules/card_presenter'
//= require jquery
$(function(){
	var cardContainers = $('.card_container');
	cardContainers.each(function(i, e){
		var imagesUrl = $(this).attr('data-image-url');
		$(this).css('transform-origin', 'left top');
		$(this).css('transform', 'scale(0.7,0.7)');
		var card  = new CardPresenter($(this));
		card.loadArt();
		card.loadCardFrame(imagesUrl);
		card.loadAttackDefenseBox(imagesUrl);
		card.loadManaSymbols(imagesUrl);
	});
});