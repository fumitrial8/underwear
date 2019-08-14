$(function(){
  $(document).ready(function(){
    $('#slider').slider({
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      range: "min"
    });

    $('#slider').on('slidechange', function(event,ui){
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
          $('.ui-slider-handle', '::before').animate({
            fontSize: '100px',
            opacity: 0
          },
          500
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