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

  $('select#card_type').change(function(event){
    var typeText = $('#card_type>option:selected').text()
    var emptyOption = jQuery("<option />", {
        value: ""
    })
    var typeId = $(event.target).val()

    $('#hypen').empty()
    $('#subtype_text').empty()

    if (typeId === "" || typeId === undefined){
      $('.type_subtype span').empty();
      $('select#card_subtype').empty();
      $('select#card_subtype').append(emptyOption);
      $('select#card_subtype').val("");
      return;
    }

    $('#type_text').text(typeText);

    $.ajax({
      method: "GET",
      url: "/cards/subtypes.json",
      data: { type_id: typeId }
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

      subtypesSelect.append(emptyOption);

      if (subtypes.length > 0){
        var subtypeText = $('#card_subtype>option:selected').text();
        $('#hypen').text(' - ');
        $('#subtype_text').text(subtypeText);
      }
    })
  });

  $('select#card_subtype').change(function(event){
    if ($(event.target).val() === '' || $(event.target).val() === undefined ){
      $('#hypen').empty();
      $('#subtype_text').empty();
      return;
    }

    var subtypeText = $('#card_subtype>option:selected').text();
    $('#hypen').text(' - ');
    $('#subtype_text').text(subtypeText)
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