$(function(){
  $(document).ready(function(){
    $('#slider').slider({
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      range: "min",
      slide: function(event, ui){
        var slideValue = ui.value;
        var slideFontSize = 20 + (40 / 100) * slideValue;
        var slideHeight = -15 - (slideValue / 2.5);
        $('span').css({
          'font-size' : `${slideFontSize}px`,
          'top' : `${slideHeight}px`
        })
      }
    });
    $('span').html('🔥').css({
      'font-size' : '20px',
      'position' : 'absolute',
      'top' : '-15px',
      'vertical-align' : 'sub'
    });
    $('#slider').on('inview', function(event, isInView){
      if (isInView) {
        console.log("hellow");
      } else {
        console.log("no");
      }
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
            fontSize: '100px'
          },
          500,
          function(){
            $(this).animate({
              opacity: 0
              },
              500
            )
          })
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