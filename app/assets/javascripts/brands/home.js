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

  // $(document).on('click','.slide_in', function(e){
  //   e.preventDefault();
  //   $(this).toggleClass('slide_in');
  //   $(this).toggleClass('slide_out');
  //   $(this).parents('nav').prev('.search_area_nav')
  //     .animate({
  //       top: '75px'
  //     },
  //     700,
  //     'swing'
  //   );
  // });
  
  // $(document).on('click','.slide_out', function(e){
  //   e.preventDefault();
  //   $(this).toggleClass('slide_in');
  //   $(this).toggleClass('slide_out');
  //   $(this).parents('nav').prev('.search_area_nav')
  //     .animate({
  //       top: '0px'
  //     },
  //     700,
  //     'swing'
  //   );
  // });
  // var result_area_nav = $('.search_area_nav_result');
  // function searchBrandResultnav(brand){
  //   var html = `<div class="search_result col s12">
  //                 <a class="search_result_name" href="/brands/${brand.id}">${brand.name}</a>
  //               </div>`
  //   result_area_nav.append(html);
  // }
  // $('.search-form_nav-area').on('keyup', function(){
  //   var url = "/brands/search";
  //   var formData = $(this).serialize();
  //   $(".search_area_nav_result").empty();
  //   if ($(this).val() != ""){
  //     $.ajax({
  //       type: 'GET',
  //       url: url,
  //       data: formData,
  //       dataType: 'json',
  //       processData: false,
  //       contentType: false
  //     })
  //     .done(function(data){
  //       if (data.length !== 0) {
  //         data.forEach(function(user){
  //           searchBrandResultnav(user);
  //         });
  //       }
  //     })
  //     .fail(function(data){
  //     })
  //   }
  // })
});