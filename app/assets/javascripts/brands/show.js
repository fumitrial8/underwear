$(function(){
  $('#slider').slider({
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    range: "min",
    slide: function(event, ui){
      var slideValue = ui.value;
      var slideFontSize = 20 + (40 / 100) * slideValue;
      var slideHeight = -15 - (slideValue / 2.5);
      $('span').css({
        'font-size' : `${slideFontSize}px`,
        'top' : `${slideHeight}px`
      })
    }
  });
  $('span').html('🔥').css({
    'font-size' : '20px',
    'position' : 'absolute',
    'top' : '-15px',
    'vertical-align' : 'sub'
  });
  var slider = $("#slider");
  var animationFlag = true;
  $(window).on("scroll", function(e){        
    var scroll = $(this).scrollTop() + $(this).height();
    var slider_height = slider.offset().top;
    if (animationFlag == true){
      animationFlag = false;
      if (scroll > slider_height){
        $('span').animate({left: "100%", fontSize: "60px", top: "-55px"}, 1000).animate({left: "0", fontSize: "20px",top: "-15px"}, 1000);
      }
    }          
  });
  $('#slider').one('slidechange', function(event,ui){
    $('.rating').val(ui.value);
  });
  var commentFlag = true;
  var commentsBox = $('.show_brand_wrapper_upper_detail_comments');
    $('.comment_form').on("submit", function(e){
      e.preventDefault();
      if (commentFlag != true){
        return
      }
      commentFlag = false;
      var formData = new FormData(this);
      var buildCommentHTML = function(data){
        var append_html =`<div class="show_brand_wrapper_upper_detail_comments_box">
                            ${data.comment.animal}
                            ${data.comment.country}
                            <i class="flag-icon flag-icon-${data.comment.country.toLowerCase()}"></i>
                            <p>${data.comment.comment}</p>
                            
                        </div>`
        return append_html;
      }
      var params = $(location).attr('pathname').split("/").pop();
      $.ajax({
        url: `/brands/${params}/comments`,
        type: 'post',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false
      })
      .done(function(data){
        commentsBox.append(buildCommentHTML(data));
        var commentsBoxScroll = commentsBox.position();
        commentsBox.scrollTop(commentsBoxScroll.top);
      })
      .fail(function(){
        console.log("fail");
      });
    });
});