$(document).ready(function(){

  // EDITAR

  // Idiomas que me interesan
  $("#b_edit_interest_lang").click(function(){

    $('#c_interest_languages').css("display", "none");
    $('#c_interest_languages_edit').fadeIn(300);

    // Brillo en botón guardar
    window.button_save_interest_lang = ButtonSaveLight;
    window.button_save_interest_lang.init("#b_save_interest_lang");

  });

  // Idiomas que hablo
  $("#b_edit_spoken_lang").click(function(){

    $('#c_spoken_languages').css("display", "none");
    $('#c_spoken_languages_edit').fadeIn(300);

    window.button_save_spoken_lang = ButtonSaveLight;
    window.button_save_spoken_lang.init("#b_save_spoken_lang");

  });

  // Descripción
  $("#b_edit_description").click(function() {

    $('#c_description').css("display", "none");
    $('#c_description_edit').fadeIn(300);

    if (user) {
      if (user.description) {            
          $('#input_edit_desc').val(user.description);
      }
    }

    window.button_save_description = ButtonSaveLight;
    window.button_save_description.init("#b_save_description");
    
  });

  // Ubicación
  $("#b_edit_location").click(function(){

    $('#c_location').css("display", "none");
    $('#c_location_edit').fadeIn(300);

    window.button_save_location = ButtonSaveLight;
    window.button_save_location.init("#b_save_location");
  });


  // CANCELAR

  // Idiomas que me interesan
  $("#b_cancel_interest_lang").click(function(){
    $('#c_interest_languages').fadeIn(300);
    $('#c_interest_languages_edit').css("display", "none");

    window.button_save_interest_lang.destroy();
    window.button_save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b_cancel_spoken_lang").click(function(){
    $('#c_spoken_languages').fadeIn(300);
    $('#c_spoken_languages_edit').css("display", "none");

    window.button_save_spoken_lang.destroy();
    window.button_save_spoken_lang = null;

  });

  // Descripción
  $("#b_cancel_description").click(function(){
    $('#c_description').fadeIn(300);
    $('#c_description_edit').css("display", "none");

    window.button_save_description.destroy();
    window.button_save_description = null;

  });

  // Ubicación
  $("#b_cancel_location").click(function(){
    $('#c_location').fadeIn(300);
    $('#c_location_edit').css("display", "none");

    window.button_save_location.destroy();
    window.button_save_location = null;

  });

  // GUARDAR

  // Idiomas que me interesan
  $("#b_save_interest_lang").click(function(){
    $('#c_interest_languages').fadeIn(300);
    $('#c_interest_languages_edit').css("display", "none");

    window.button_save_interest_lang.destroy();
    window.button_save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b_save_spoken_lang").click(function(){
    $('#c_spoken_languages').fadeIn(300);
    $('#c_spoken_languages_edit').css("display", "none");

    window.button_save_spoken_lang.destroy();
    window.button_save_spoken_lang = null;

  });

  // Descripción
  $("#b_save_description").click(function(){
    $('#c_description').fadeIn(300);
    $('#c_description_edit').css("display", "none");

    window.button_save_description.destroy();
    window.button_save_description = null;
  });

  // Ubicación
  $("#b_save_location").click(function(){
    $('#c_location').fadeIn(300);
    $('#c_location_edit').css("display", "none");

    window.button_save_location.destroy();
    window.button_save_location = null;

  });
  
});