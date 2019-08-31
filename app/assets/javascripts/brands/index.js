$(function(){
  n = 2;
  $(document).on('scroll resize',function(){
    
    var page_height = $(document).height();
    var scroll_bottom = $(document).scrollTop() + $(window).height();
    var options = {
      contentSelector: '.brand_container, .pagination',
      padding: 10,
      nextSelector: `a[href='/brands?page=${n}']`,
      debug: true
    };
    var events = []
    console.log($(".brand_container").get(0).events);
    if (scroll_bottom + 10 > page_height){
      if ($(".index_page").jscroll(options)){
        console.log("success");
        n += 1; 
        console.log(n);
      }
    }
  });
});
