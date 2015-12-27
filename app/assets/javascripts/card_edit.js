//= require './modules/MagicMaker'
//= require './modules/ManaBuilder'
//= require './modules/card'
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