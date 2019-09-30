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
    var slider = $("#slider");
    var animationFlag = true;
    $(window).on("scroll", function(e){        
      var scroll = $(this).scrollTop() + $(this).height();
      var slider_height = slider.offset().top;
      if (animationFlag == true){
        animationFlag = false;
        if (scroll > slider_height){
          $('span').animate({left: "100%", fontSize: "60px"}, 500).animate({left: "0", fontSize: "20px"}, 500);
        }
      }          
    });
  
    
    
    $('#slider').one('slidechange', function(event,ui){
      $('.rating').val(ui.value);
      
    });
  });

});