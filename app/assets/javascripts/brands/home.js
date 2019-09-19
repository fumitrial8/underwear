$(function(){
  
  $('.region').on('click', function(){
    $(('body, html')).animate({scrollTop :(scroll_bottom * 2 / 3)}, 1000, 'swing');
  });

  $('.search').on('click', function(){
    if ($('.search-form').hasClass('disappear')){
      $('.search-form').removeClass('disappear')
      .animate({
        opacity: 1
        },
        500,
        function(){
          $('.search-form-area').focus();
        }
      );

    } else if (!$('.search-form').hasClass('disappear')) {
      $('.search-form').animate({
        opacity: 0
        },
        500,
        function(){
          $('.search-form').addClass('disappear');
        }
      );
    }
  });
  $('.search-form-area').blur(function(){
    $('.search-form').animate({
      opacity: 0
      },
      500,
      function(){
        $('.search-form').addClass('disappear');
      }
    );
  });
  var result_area = $('.search_area_result');
  function searchBrandResult(brand){
    var html = `<div class="search_result col s12">
                  <a class="search_result_name" href="/brands/${brand.id}">${brand.name}</a>
                </div>`
    result_area.append(html);
  }

  $('.search-form-area').on('keyup', function(){
    var url = "/brands/search";
    var formData = $(this).serialize();
    $(".search_area_result").empty();
    if ($(this).val() != ""){
      $.ajax({
        type: 'GET',
        url: url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        console.log('succeess');
        if (data.length !== 0) {
          data.forEach(function(user){
            searchBrandResult(user);
          });
        }
      })
      .fail(function(data){
      })  
    }
  })
  // スクロールイベントの設定
  var scroll = 0;
  var scroll_bottom = $(document).innerHeight();

  $(window).on('scroll.home_brand',function(){
    scroll = $(this).scrollTop();
    if (scroll > (scroll_bottom * 3 / 6)){
    $("#map-continents").CSSMap({"size": 1450,mapStyle: "dark"}).animate({opacity : 1}, 1000);
    }
  });
});