//After render the screen
$(function() {
  //Get data from data/news.json and put it in the json object
  $.getJSON("data/news.json", function(json){
    index_year = 0;

    $('#show_more_news_btn').on('click', function() {
      news = json[index_year];

      year =
        "<div class=\"container\">" +
        "<div class=\"row\">" +
        "<div class=\"col-md-12 news-header\" >" +
        "<br />" +
          news.year +
        "</div>" +
        "</div>" +
        "</div>";
      $("#news").append(year);

      news.topic.forEach(function( topic ){
        date =
        "<div class=\"container\">" +
        "<div class=\"row\">" +
        "<div class=\"col-md-2 news-body\" >" +
          topic.date +
        "</div>";

        content =
        "<div class=\"col-md-8 news-body\" >" +
          topic.content +
        "</div>";

        rightBar =
        "<div class=\"col-md-2 news-body\" >" +
        "</div>" +
        "</div>" +
        "</div>";

        $("#news").append(date + content + rightBar);
      });

      index_year++;

      if(json[index_year] == undefined){
        $('#show_more_news_btn').remove();
      }

    });

    //To show the latest year's news by triggering click event
    $('#show_more_news_btn').trigger('click');

  });
});
