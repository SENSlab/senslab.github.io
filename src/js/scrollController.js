$(function(){
  var topBtn = $('#pageTop');

  topBtn.hide();

  $(window).on('scroll', function(){
    if($(this).scrollTop() > 40){
      topBtn.fadeIn();
    }
    else{
      topBtn.fadeOut();
    }
  });

  topBtn.on('click', function(){
    $('body,html').animate({
      scrollTop: 0},500);
    });

});
