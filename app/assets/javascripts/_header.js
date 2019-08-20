$(function(){
  $(document).on('click', '.fa-bars',function(){
    $(this).toggleClass('fa-bars');
    $(this).toggleClass('fa-chevron-right');
    $(this).parents('nav').animate({left: `${$('nav').width() - 330}px`}, 700)
  });
  $(document).on('click', '.fa-chevron-right',function(){
    $(this).toggleClass('fa-bars');
    $(this).toggleClass('fa-chevron-right');
    $(this).parents('nav').animate({left: `${$('nav').width() - 45}px`}, 700)
  });

  $(document).on('click','.slide_in', function(e){
    e.preventDefault();
    $(this).toggleClass('slide_in');
    $(this).toggleClass('slide_out');
    $('.search_area_nav').animate({top: '50px'},700);
  });
  
  $(document).on('click','.slide_out', function(e){
    e.preventDefault();
    $(this).toggleClass('slide_in');
    $(this).toggleClass('slide_out');
    $('.search_area_nav').animate({top: '-100px'},700);
  });
  var result_area_nav = $('.search_area_nav_result');
  function searchBrandResultnav(brand){
    var html = `<div class="search_result col s12">
                  <a class="search_result_name" href="/brands/${brand.id}">${brand.name}</a>
                </div>`
    result_area_nav.append(html);
  }
  $('.search-form_nav-area').on('keyup', function(){
    var url = "/brands/search";
    var formData = $(this).serialize();
    $(".search_area_nav_result").empty();
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
        if (data.length !== 0) {
          data.forEach(function(user){
            searchBrandResultnav(user);
          });
        }
      })
      .fail(function(data){
      })
    }
  })
});