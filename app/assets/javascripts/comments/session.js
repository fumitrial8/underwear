$(function(){
  if ($('ul .session_animal').length){
    $('.first_session').css('display', 'none');
  }
  $('.radio_button_img').hover(function(){
    $(this).stop(true, false).animate({'opacity': 0}, 500);
    $(this).prev('.radio_button_h3_hidden').css('display', 'inherit');
    $(this).prev('.radio_button_h3_hidden').stop(true, false).animate({'opacity': 1}, 500);
  },function(){
    $(this).prev('.radio_button_h3_hidden').animate({'opacity': 0}, 500);
    $(this).stop(true, false).animate({'opacity': 1}, 500);
    $(this).prev('.radio_button_h3_hidden').stop(true, false).css('display', 'none');

  });
  $('.radio_button_img').on('click', function(){
    var selected_animal = $(this).siblings('input').val();
    $(this).toggleClass('clicked'); 
    $(this).prev('.radio_button_h3_hidden').toggleClass('clicked');
    if ($(this).parent().siblings().children().hasClass('clicked')){
      $(this).parent().siblings().children().removeClass('clicked');
    }
  });
  
  $('.fa-times').on('click', function(){
    $(this).parents('.first_session')
    .animate({
      opacity: 0
    },
    500,
    function(){
      $(this).css('display', 'none');
    }
    );
  });
  $(document).on('submit','.first_session_form', function(event){
    event.preventDefault();
    var selected_animal = $('.clicked').siblings('input').val();
    var formData = new FormData(this);
    var first_session_html = $(this).parents('.first_session');
    var append_html =`<li class='list_animal'>
                        <a class='animal_link' href='#'>
                          <img class='material-icons center session_animal' src='/images/${selected_animal}.png'>
                        </a>
                      </li>`
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if (selected_animal != undefined){
        if ($('ul .session_animal').length){
          $('ul .session_animal').attr('src', `/images/${selected_animal}.png`);
        } else {
          $('ul').append(append_html);
        }
      } else {
        $('.list_animal').css('display', 'none');
      }
      $(first_session_html)
      .animate({
        opacity: 0
      },
      500,
      function(){
        $(this).css('display', 'none');
      }
      );
    })
    .fail(function(data){
    })
    return false;
  });
  $(document).on('click','.animal_link', function(event){
    event.preventDefault();
    $('.first_session').css('display', '').animate({'opacity': 0.7}, 500)
  });
});