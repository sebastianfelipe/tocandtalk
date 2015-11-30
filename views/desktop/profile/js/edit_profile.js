$(document).ready(function(){

  /* Edit */
  $("#b_edit_interest_lang").click(function(){

    $('#c_interest_languages').css("display", "none");
    $('#c_interest_languages_edit').fadeIn(300);

  });

  $("#b_edit_spoken_lang").click(function(){

    $('#c_spoken_languages').css("display", "none");
    $('#c_spoken_languages_edit').fadeIn(300);


  });

  $("#b_edit_description").click(function() {

    $('#c_description').css("display", "none");
    $('#c_description_edit').fadeIn(300);

    if (user) {
      if (user.description) {            
          $('#input_edit_desc').val(user.description);
      }
    }
    
  });

  $("#b_edit_location").click(function(){
    //var dif_height = $('#c_location_edit').height() - $('#c_location').height();

    $('#c_location').css("display", "none");
    $('#c_location_edit').fadeIn(300);

    /*
    $("#usr_loc_container").animate({
      height: '+=' + dif_height + 'px'
    }, 1000);
    $("#usr_loc_container").height(auto);
    */
  });


  /* Cancel */

  $("#b_cancel_interest_lang").click(function(){
    $('#c_interest_languages').fadeIn(300);
    $('#c_interest_languages_edit').css("display", "none");

  });

  $("#b_cancel_spoken_lang").click(function(){

    $('#c_spoken_languages').fadeIn(300);
    $('#c_spoken_languages_edit').css("display", "none");

  });

  $("#b_cancel_description").click(function(){

    $('#c_description').fadeIn(300);
    $('#c_description_edit').css("display", "none");

  });

  $("#b_cancel_location").click(function(){
    //var dif_height = $('#c_location').height() - $('#c_location_edit').height();

    $('#c_location').fadeIn(300);
    $('#c_location_edit').css("display", "none");

    /*
    $("#usr_loc_container").animate({
      height: '+=' + dif_height + 'px'
    }, 1000);
    $("#usr_loc_container").height(auto);
    */
  });

  /* Save */

  $("#b_save_interest_lang").click(function(){
    $('#c_interest_languages').fadeIn(300);
    $('#c_interest_languages_edit').css("display", "none");


  });

  $("#b_save_spoken_lang").click(function(){
    $('#c_spoken_languages').fadeIn(300);
    $('#c_spoken_languages_edit').css("display", "none");


  });

  $("#b_save_description").click(function(){
    $('#c_description').fadeIn(300);
    $('#c_description_edit').css("display", "none");

  });

  $("#b_save_location").click(function(){
    //var dif_height = $('#c_location').height() - $('#c_location_edit').height();

    $('#c_location').fadeIn(300);
    $('#c_location_edit').css("display", "none");

    /*
    $("#usr_loc_container").animate({
      height: '+=' + dif_height + 'px'
    }, 1000);
    $("#usr_loc_container").height(auto);
    */

  });




});