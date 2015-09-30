//= require './modules/card_presenter'
function pageReady(){
	var cardContainer = $('.card_container');
  	var imagesUrl = cardContainer.attr('data-image-url');
  	var card  = new CardPresenter(cardContainer);
 	card.loadArt();
	card.loadCardFrame(imagesUrl);
	card.loadAttackDefenseBox(imagesUrl);
	card.loadManaSymbols(imagesUrl);
}
$(document).ready(pageReady);