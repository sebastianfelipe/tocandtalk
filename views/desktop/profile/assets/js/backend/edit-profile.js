$(document).ready(function(){

  // EDITAR

  // Idiomas que me interesan
  $("#b-edit-interest-lang").click(function(){

    $('#c-interest-languages').css("display", "none");
    $('#c-interest-languages-edit').fadeIn(300);

    // Brillo en botón guardar
    window.button-save_interest_lang = ButtonSaveLight;
    window.button-save_interest_lang.init("#b-save-interest-lang");

  });

  // Idiomas que hablo
  $("#b-edit-spoken-lang").click(function(){

    $('#c-spoken-languages').css("display", "none");
    $('#c-spoken-languages-edit').fadeIn(300);

    window.button-save_spoken_lang = ButtonSaveLight;
    window.button-save_spoken_lang.init("#b-save-spoken-lang");

  });

  // Descripción
  $("#b-edit-description").click(function() {

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
    window.button-save_description.init("#b-save-description");
    
  });

  // Ubicación
  $("#b-edit-location").click(function(){

    $('#c-location').css("display", "none");
    $('#c-location-edit').fadeIn(300);

    //$('#s_country').val(user.nationality);

    window.button-save_location = ButtonSaveLight;
    window.button-save_location.init("#b-save-location");
  });


  // CANCELAR

  // Idiomas que me interesan
  $("#b-cancel-interest-lang").click(function(){
    $('#c-interest-languages').fadeIn(300);
    $('#c-interest-languages-edit').css("display", "none");

    window.button-save_interest_lang.destroy();
    window.button-save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b-cancel-spoken-lang").click(function(){
    $('#c-spoken-languages').fadeIn(300);
    $('#c-spoken-languages-edit').css("display", "none");

    window.button-save_spoken_lang.destroy();
    window.button-save_spoken_lang = null;

  });

  // Descripción
  $("#b-cancel-description").click(function(){
    $('#c-description').fadeIn(300);
    $('#c-description-edit').css("display", "none");

    window.button-save_description.destroy();
    window.button-save_description = null;

  });

  // Ubicación
  $("#b-cancel-location").click(function(){
    $('#c-location').fadeIn(300);
    $('#c-location-edit').css("display", "none");

    window.button-save_location.destroy();
    window.button-save_location = null;

  });

  // GUARDAR

  // Idiomas que me interesan
  $("#b-save-interest-lang").click(function(){
    $('#c-interest-languages').fadeIn(300);
    $('#c-interest-languages-edit').css("display", "none");

    window.button-save_interest_lang.destroy();
    window.button-save_interest_lang = null;

  });

  // Idiomas que hablo
  $("#b-save-spoken-lang").click(function(){
    $('#c-spoken-languages').fadeIn(300);
    $('#c-spoken-languages-edit').css("display", "none");

    window.button-save_spoken_lang.destroy();
    window.button-save_spoken_lang = null;

  });

  // Descripción
  $("#b-save-description").click(function(){
    $('#c-description').fadeIn(300);
    $('#c-description-edit').css("display", "none");

    window.button-save_description.destroy();
    window.button-save_description = null;
  });

  // Ubicación
  $("#b-save-location").click(function(){
    $('#c-location').fadeIn(300);
    $('#c-location-edit').css("display", "none");

    window.button-save_location.destroy();
    window.button-save_location = null;

  });
  
});