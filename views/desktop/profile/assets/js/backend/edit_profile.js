$(document).ready(function(){

  // EDITAR

  // Idiomas que me interesan
  $("#b_edit_interest_lang").click(function(){

    $('#c-interest-languages').css("display", "none");
    $('#c-interest-languages-edit').fadeIn(300);

    // Brillo en botón guardar
    window.button-save_interest_lang = ButtonSaveLight;
    window.button-save_interest_lang.init("#b_save_interest_lang");

  });

  // Idiomas que hablo
  $("#b_edit_spoken_lang").click(function(){

    $('#c-spoken-languages').css("display", "none");
    $('#c-spoken-languages-edit').fadeIn(300);

    window.button-save_spoken_lang = ButtonSaveLight;
    window.button-save_spoken_lang.init("#b_save_spoken_lang");

  });

  // Descripción
  $("#b_edit_description").click(function() {

    $('#c-description').css("display", "none");
    $('#c-description-edit').fadeIn(300);

    /*
    if (user) {
      if (user.description) {            
          $('#input_edit_desc').val(user.description);
      }
    }
    */

    window.button-save_description = ButtonSaveLight;
    window.button-save_description.init("#b_save_description");
    
  });

  // Ubicación
  $("#b_edit_location").click(function(){

    $('#c-location').css("display", "none");
    $('#c-location-edit').fadeIn(300);

    //$('#s_country').val(user.nationality);

    window.button-save_location = ButtonSaveLight;
    window.button-save_location.init("#b_save_location");
  });


  // CANCELAR

  // Idiomas que me interesan
  $("#b_cancel_interest_lang").click(function(){
    $('#c-interest-languages').fadeIn(300);
    $('#c-interest-languages-edit').css("display", "none");

    window.button-save_interest_lang.destroy();
    window.button-save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b_cancel_spoken_lang").click(function(){
    $('#c-spoken-languages').fadeIn(300);
    $('#c-spoken-languages-edit').css("display", "none");

    window.button-save_spoken_lang.destroy();
    window.button-save_spoken_lang = null;

  });

  // Descripción
  $("#b_cancel_description").click(function(){
    $('#c-description').fadeIn(300);
    $('#c-description-edit').css("display", "none");

    window.button-save_description.destroy();
    window.button-save_description = null;

  });

  // Ubicación
  $("#b_cancel_location").click(function(){
    $('#c-location').fadeIn(300);
    $('#c-location-edit').css("display", "none");

    window.button-save_location.destroy();
    window.button-save_location = null;

  });

  // GUARDAR

  // Idiomas que me interesan
  $("#b_save_interest_lang").click(function(){
    $('#c-interest-languages').fadeIn(300);
    $('#c-interest-languages-edit').css("display", "none");

    window.button-save_interest_lang.destroy();
    window.button-save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b_save_spoken_lang").click(function(){
    $('#c-spoken-languages').fadeIn(300);
    $('#c-spoken-languages-edit').css("display", "none");

    window.button-save_spoken_lang.destroy();
    window.button-save_spoken_lang = null;

  });

  // Descripción
  $("#b_save_description").click(function(){
    $('#c-description').fadeIn(300);
    $('#c-description-edit').css("display", "none");

    window.button-save_description.destroy();
    window.button-save_description = null;
  });

  // Ubicación
  $("#b_save_location").click(function(){
    $('#c-location').fadeIn(300);
    $('#c-location-edit').css("display", "none");

    window.button-save_location.destroy();
    window.button-save_location = null;

  });
  
});