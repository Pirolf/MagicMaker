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

$(document).on('change', 'select#card_type', function(){
  var typeText = $('#card_type>option:selected').text();
  $('#hypen').empty();
  $('#subtype_text').empty();

  if ($(event.target).val() === "" || $(event.target).val() === undefined){
    $('.type_subtype span').empty();
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

    if (subtypes.length > 0){
      var subtypeText = $('#card_subtype>option:selected').text();
      $('#hypen').text(' - ');
      $('#subtype_text').text(subtypeText);
    }
  });
});

$(document).on('change', 'select#card_subtype', function(){
  if ($(event.target).val() === '' || $(event.target).val() === undefined ){
    $('#hypen').empty();
    $('#subtype_text').empty();
    return;
  }

  var subtypeText = $('#card_subtype>option:selected').text();
  $('#hypen').text(' - ');
  $('#subtype_text').text(subtypeText);
});

$(document).on('click', '.insertable_symbol', function(){
  var symbolUrl = $(event.target).attr('src');
  var alt = $(event.target).attr('alt');
  var textKey = $(event.target).attr('data-text-key');
  var descInput = $('#card_desc_input');

  var text = descInput.val();
  var selectionStart = descInput.prop("selectionStart");
  var selecionEnd = descInput.prop('selectionEnd');

  var textWithSymbolInserted = text.slice(0, selectionStart) + textKey + text.slice(selecionEnd);

  descInput.val(textWithSymbolInserted);
  text = descInput.val();
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
