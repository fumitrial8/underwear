$(function(){
  $(document).ready(function(){
    $('#slider').slider({
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      range: "min",
      
    });
    $('#slider').bind('slidechange', function(event,ui){
      $('.rating').val(ui.value);
      $('.comment_form').submit();
    })
  });
});