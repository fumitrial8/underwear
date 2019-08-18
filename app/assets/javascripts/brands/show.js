$(function(){
  $(document).ready(function(){
    $('#slider').slider({
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      range: "min"
    });
    $('span').html('🔥').css({
      'font-size' : '20px',
      'position' : 'absolute',
      'top' : '-10px'
    });

    $('#slider').one('slidechange', function(event,ui){
      
      $('.rating').val(ui.value);
      $('.comment_form').submit(function(e){
        e.preventDefault();
        var href = $('.comment_form').attr('action');
        var formData = new FormData(this);
        $(this).off();
        $.ajax({
          type: 'POST',
          url: href,
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          $('.ui-slider-handle').animate({
            opacity: 0
          },
          2000
          )
        })
        .fail(function(data){
        })
        .always(function(data){
          return false;
        })
      });
      $('.comment_form').submit();
    });
  });
});