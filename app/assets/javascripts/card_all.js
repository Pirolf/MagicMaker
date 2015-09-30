//= require './modules/card_presenter'
//= require jquery
function pageReady(){
	var cardContainers = $('.card_container');
	cardContainers.each(function(i, e){
		var imagesUrl = $(this).attr('data-image-url');
		$(this).css('transform', 'scale(0.8,0.8)');
		var card  = new CardPresenter($(this));
		card.loadArt();
		card.loadCardFrame(imagesUrl);
		card.loadAttackDefenseBox(imagesUrl);
		card.loadManaSymbols(imagesUrl);
	});
}
$(document).ready(pageReady);