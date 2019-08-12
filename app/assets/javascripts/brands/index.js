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
});