$(function(){
  var show = 3;
  var page = 2;
  // $(document).on('scroll resize',function(){
    
  //   var page_height = $(document).height();
  //   var scroll_bottom = $(document).scrollTop() + $(window).height();
  //   var options = {
  //     contentSelector: '.brand_container, .pagination',
  //     padding: 10,
  //     nextSelector: `a[href='/brands?page=${n}']`,
  //     debug: true
  //   };
  //   var events = []
  //   console.log($(".brand_container").get(0).events);
  //   if (scroll_bottom + 10 > page_height){
  //     if ($(".index_page").jscroll(options)){
  //       console.log("success");
  //       n += 1; 
  //       console.log(n);
  //     }
  //   }
  // });
  var brandBox = $(".index_page")
  function appendBrand(brand){
    var html = `<div class="brand_container col s12 m12 l12">
                  <a href="/brands/${brand.id}">
                    <image src="${brand.image}">
                  </a>
                </div>`
    brandBox.append(html);
  }
  $(document).on('scroll resize',function(){
    var page_height = $(document).height();
    var scroll_bottom = $(document).scrollTop() + $(window).height();
    var data = `page=${page}&show=${show}`;
    data_json = JSON.stringify(data);
    if (scroll_bottom + 10 > page_height){
      $.ajax({url: "/brands",
              type: "GET",
              data: data,
              dataType: 'json',
              processData: true,
              contentType: false})
      .done(function(data){
        console.log("success");
        page++;
        if(data.length !== 0){
          data.forEach(function(brand){
            appendBrand(brand);
            console.log(brand)
          });
        }
      })
      .fail(function(){
        console.log("fail");
      });
    }
  });
});
