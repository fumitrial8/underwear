$(function(){
  var show = 10;
  var page = 2;
  var brandBox = $(".index_page")
  if (document.URL.match("/brands/ranking")){
    function appendBrand(brand){
      var twitter = (brand.twitter == null ? "" : `<image src="${brand.twitter}"></image>`)
      var html = `<div class="brand_container col s12 m12 l12">
                    <a href="/brands/${brand.id}">
                    ${brand.name}
                    ${twitter}
                    </a>
                  </div>`
      brandBox.append(html);
    }
    $(document).on('scroll resize',function(){
      var page_height = $(document).height();
      var scroll_bottom = $(document).scrollTop() + $(window).height();
      var data = `page=${page}&show=${show}`;
      data_json = JSON.stringify(data);
      if (scroll_bottom + 100 > page_height){
        $.ajax({url: "/brands",
                type: "GET",
                data: data,
                dataType: 'json',
                processData: true,
                contentType: false})
        .done(function(data){
          page++;
          if(data.length !== 0){
            data.forEach(function(brand){
              appendBrand(brand);
              console.log(page);
            });
          }
        })
        .fail(function(){
  
        });
      }
    });
  }
  
});
