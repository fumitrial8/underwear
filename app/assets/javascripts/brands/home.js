$(function(){
  
  $('.region').on('click', function(){
    $(this).parents('#contents')
    .animate({
        marginTop: '10vh'
      },
      1000,
      function(){
        $("#map-continents").CSSMap({
          "size": 1450
        })
        .animate({
          opacity: 1
        },
        500
        );
      }
    );
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
  $('.home_brand_slide_show_container').eq(page).addClass('center');
  $('.home_brand_slide_show_container').eq((page -1) % lastPage).addClass('left1');
  $('.home_brand_slide_show_container').eq((page -2) % lastPage).addClass('left2');
  $('.home_brand_slide_show_container').eq((page +1) % lastPage).addClass('right1');
  $('.home_brand_slide_show_container').eq((page +2) % lastPage).addClass('right2');
  $(document).on('click', '.home_brand_slide_show_container', function(){
    $('.home_brand_slide_show_container').eq(page).removeClass('center');
    $('.home_brand_slide_show_container').eq((page -1) % lastPage).removeClass('left1');
    $('.home_brand_slide_show_container').eq((page -2) % lastPage).removeClass('left2');
    $('.home_brand_slide_show_container').eq((page +1) % lastPage).removeClass('right1');
    $('.home_brand_slide_show_container').eq((page +2) % lastPage).removeClass('right2');
    page = $(this).index();
    console.log(page);
    page %= lastPage;
    $(this).addClass('center');
    $('.home_brand_slide_show_container').eq((page -1) % lastPage).addClass('left1');
    $('.home_brand_slide_show_container').eq((page -2) % lastPage).addClass('left2');
    $('.home_brand_slide_show_container').eq((page +1) % lastPage).addClass('right1');
    $('.home_brand_slide_show_container').eq((page +2) % lastPage).addClass('right2');
  });

  // スクロールイベントの設定
  var scroll = 0;
  var timer = null;
  var scroll_bottom = $(document).innerHeight();
  
  $(window).on('scroll.green', function(){
    scroll = $(this).scrollTop();
    clearTimeout(timer);
    if (scroll >= ((scroll_bottom * 3 / 4)-50) && scroll <= ((scroll_bottom * 4) / 4)){
      timer = setTimeout(function(event){
        $(this).off('scroll.green');
      }, 1000)
    }
  });

  $(window).on('scroll.blue', function(){
    scroll = $(this).scrollTop();
    clearTimeout(timer);
    if (scroll > (scroll_bottom * 2 / 4) && scroll <= ((scroll_bottom * 3) / 4)){
      timer = setTimeout(function(event){
        $(this).off('scroll.blue');
        $("#map-continents").CSSMap({"size": 1450}).animate({opacity : 1}, 1000);
      }, 1000)
    }
  });
  $(window).on('scroll.red',function(){
    scroll = $(this).scrollTop();
    clearTimeout(timer);
    if (scroll > (scroll_bottom / 4) && scroll < ((scroll_bottom * 2) / 4)){
      timer = setTimeout(function(event){
        $(this).off('scroll.red');
      }, 1000);
    }
  });
});