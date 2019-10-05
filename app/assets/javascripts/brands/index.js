$(function(){
  var show = 20;
  var page = 2;
  var brandBox = $(".index_page");
  var event_counter = 0;
  var max_event = 0;
  if (document.URL.match("/brands")){
    function appendBrand(brand){
      var image = (brand.image == null ? "" : `<image src="${brand.image}"></image>`)
      var html = `<div class="brand_container col s12 m12 l12">
                    <a href="/brands/${brand.id}">
                    ${brand.name}
                    ${image}
                    </a>
                  </div>`
      brandBox.append(html);
    }
    
    $(document).on('scroll resize',function(){
      var page_height = $(document).height();
      var scroll_bottom = $(document).scrollTop() + $(window).height();
      var data = `page=${page}&show=${show}`;
      data_json = JSON.stringify(data);
     
      if (event_counter <= max_event) {
        if (scroll_bottom + 100 > page_height){
          page++;
          var flag = false ;
          if (flag == true){
            return;
          }
          flag = true;
          $.ajax({url: "/brands",
                  type: "GET",
                  data: data,
                  dataType: 'json',
                  processData: true,
                  contentType: false})
          .done(function(data){
            
            max_event = Math.floor(data[data.length - 1].count / 20);
            data.pop();
            if(data.length !== 0){
              data.forEach(function(brand){
                appendBrand(brand);
              });
            }
          })
          .fail(function(){
          })
          .always(function(){
            event_counter++;
            flag = false;
            if (event_counter == max_event){
              $(".index_loading").css({display: "none"});
            }
            return event_counter;
          });
        }          
      }
    })
  }
});
