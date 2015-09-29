//= require './modules/MagicMaker'
//= require './modules/ManaBuilder'
//= require './modules/card'
var magicMaker = new MagicMaker();

$(document).ready(function() {
  pageReady();
});
$(document).on('page:load', pageReady);
$(document).on('change', '#card_image_file_field', function(){
  magicMaker.card.previewArt(event.target);
});
$(document).on('input', '#card_desc_input', function(){
  magicMaker.card.desc.text($(event.target).val());
});
$(document).on('input', '#card_name', function(){
  magicMaker.card.cardName.text($(event.target).val());
});
$(document).on('input', '.mana_cost', function(){
  ManaBuilder(magicMaker);
});
$(document).on('input', '#card_attack, #card_defense', function(){
  magicMaker.card.updateAttackDefense();
});
$(document).on('change', '#card_color', function(){
  magicMaker.card.loadCardFrame();
  magicMaker.card.loadAttackDefenseBox();
});

function pageReady(){
  magicMaker.card  = new Card();
  magicMaker.imagesPath = $(".card_container").attr("data-image-url");
  magicMaker.card.loadArt();
  magicMaker.card.loadCardFrame();
  magicMaker.card.loadAttackDefenseBox();
  ManaBuilder(magicMaker);
}
