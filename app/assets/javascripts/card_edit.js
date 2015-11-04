//= require './modules/MagicMaker'
//= require './modules/ManaBuilder'
//= require './modules/card'
var magicMaker = new MagicMaker();
$.valHooks.textarea = {
  get: function( elem ) {
    return elem.value.replace( /\r?\n/g, "\r\n" );
  }
};

$(document).ready(function() {
  pageReady();
});

$(document).on('page:load', pageReady);

$(document).on('change', '#card_image_file_field', function(){
  magicMaker.card.previewArt(event.target);
});

$(document).on('click', '.insertable_symbol', function(){
  var symbolUrl = $(event.target).attr('src');
  var alt = $(event.target).attr('alt');
  var textKey = $(event.target).attr('data-text-key');

  var text = $('#card_desc_input').val();
  $('#card_desc_input').val(text + textKey);
  text = $('#card_desc_input').val();
  //update desc presented
  var htmlString = magicMaker.card.parseDesc(text);
  magicMaker.card.desc.html(htmlString);
})

$(document).on('input', '#card_desc_input', function(){
  var text = $(event.target).val();
  //update the desc presented
  var htmlString = magicMaker.card.parseDesc(text);
  magicMaker.card.desc.html(htmlString);
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
