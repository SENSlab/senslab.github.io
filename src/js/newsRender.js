//After render the screen
$(function() {
  var ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0
  || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 ){
    mytap = 'touchstart';
  }
  else{
    mytap = 'click';
  }

  //Get data from data/news.json and put it in the json object
  $.getJSON("data/news.json", function(json){
    index_year = 0;

    $('#show_more_news_btn').on(mytap, function() {
      news = json[index_year];

      year =
          "<div class='row'>" +
            "<div class='col news-header mt-4 pb-2' >" +
              news.year +
            "</div>" +
          "</div>";

      $("#news").append(year);

      news.topic.forEach(function( topic ){
        date =
          "<div class='row'>" +
            "<div class='col-md-2 pb-1' >" +
              topic.date +
            "</div>";

        content =
        //"<div class='col-md-8 news-body' >" +
		        "<div class='col-md-10' >" +
              topic.content +
            "</div>";

        rightBar =
        //"<div class='col-md-2 news-body' >" +
        //"</div>" +
          "</div>";
        $("#news").append(date + content + rightBar);
      });

      index_year++;

      if(json[index_year] == undefined){
        $('#show_more_news_btn').remove();
      }

    });

    //To show the latest year's news by triggering click event
    $('#show_more_news_btn').trigger(mytap);

  });
});
