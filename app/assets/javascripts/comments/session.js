$(function(){
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
  $('.first_session_form').on('submit', function(event){
    event.preventDefault();
    var formData = new FormData(this);
    var first_session_html = $(this).parents('.first_session');
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
      console.log("ajax");
      $('.first_session')
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
      console.log("failure");
    })
    return false;
  });
});