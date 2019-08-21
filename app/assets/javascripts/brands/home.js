$(function(){
  
  $('.region').on('click', function(){
    $(('body, html')).animate({scrollTop :(scroll_bottom * 2 / 3)}, 1000, 'swing');
  });

  $('.search').on('click', function(){
    if ($('.search_area').hasClass('disappear')){
      $('.search_area').toggleClass('disappear');
      $('.search_area').animate({
        opacity: 1
        },
        500
      );
    } else {
      $('.search_area').animate({
        opacity: 0
        },
        500,
        function(){
          $('.search_area').toggleClass('disappear');
        }
      );
    }
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
  //２番目のエリアのイベント
  var page = 0;
  var lastPage = $('.home_brand_slide_show_container').length;
  var slide_image = $('.home_brand_slide_show_container');
  var slide_background = $('.home_brand_slide_show_background');
  slide_image.eq(page % lastPage).addClass('center');
  slide_background.eq(page % lastPage).css('display', 'inherit').animate({'opacity': '0.6'}, 2000);
  slide_image.eq((page -1) % lastPage).addClass('left1');
  slide_image.eq((page -2) % lastPage).addClass('left2');
  slide_image.eq((page +1) % lastPage).addClass('right1');
  slide_image.eq((page +2) % lastPage).addClass('right2');
  $(document).on('click', '.home_brand_slide_show_container:not(.center)', function(e){
    e.preventDefault();
    slide_image.eq((page -2) % lastPage).removeClass('left2');    
    slide_image.eq((page -1) % lastPage).removeClass('left1');
    slide_image.eq(page % lastPage).removeClass('center');
    slide_background.eq(page % lastPage).css({'display': 'none', 'opacity' : 0});
    slide_image.eq((page +1) % lastPage).removeClass('right1');
    slide_image.eq((page +2) % lastPage).removeClass('right2');
    page = slide_image.index(this);
    page %= lastPage;
    slide_image.eq((page -2) % lastPage).addClass('left2');
    slide_image.eq((page -1) % lastPage).addClass('left1');
    $(this).addClass('center');
    slide_background.eq(page % lastPage).css('display', 'inherit').animate({'opacity': '0.6'}, 2000);
    slide_image.eq((page +1) % lastPage).addClass('right1');
    slide_image.eq((page +2) % lastPage).addClass('right2');
  });

  // スクロールイベントの設定
  var scroll = 0;
  var scroll_bottom = $(document).innerHeight();

  $(window).on('scroll.home_brand',function(){
    scroll = $(this).scrollTop();
    if (scroll > (scroll_bottom / 6) && scroll < (scroll_bottom * 3 / 6 )){
      $('.home_brand').animate({opacity: 1}, 1000);
    }
    if (scroll > (scroll_bottom * 3 / 6)){
    $("#map-continents").CSSMap({"size": 1450}).animate({opacity : 1}, 1000);
    }
  });
});