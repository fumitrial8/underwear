$(window).on('scroll.pagination',function(){
  var page_height = $(document).height();
  var scroll_bottom = $(document).scrollTop() + $(this).height();
  if (scroll_bottom > page_height) {
    $('.next > a').click();
  }
});