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
    $(this).parents('#contents')
      .animate({
        marginTop: '10vh'
      },
      1000,
      function(){
        $('.search_area').animate({
          opacity: 1
        },
        500
        );
      }
    );
  })
  var result_area = $('.search_area_result');
  function searchBrandResult(brand){
    var html = `<div class="search_result col s12">
                  <a class="search_result_name" href="/brands/${brand.id}">${brand.name}</a>
                </div>`
    result_area.append(html);
  }
  $('.search-form').on('keyup', function(){
    var url = "/brands/search";
    var formData = $(this).serialize();
    $.ajax({
      type: 'GET',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("success");
      $(".search_area_result").empty();
      if (data.length !== 0) {
        data.forEach(function(user){
          searchBrandResult(user);
        });
      }
    })
    .fail(function(data){
      console.log("failed!!")
    })

  })
});