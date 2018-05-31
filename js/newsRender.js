//After render the screen
$(function() {
  //Get data from data/news.json and put it in the json object
  $.getJSON("data/news.json", function(json){
    json.forEach(function( news ) {
      year =
        "<div class=\"col-md-12 news-header\" >" +
          news.year +
        "</div>" +
        "<br />";
      $("#news").append(year);

      news.topic.forEach(function( topic ){
        date =
        "<div class=\"col-md-2 news-body\" >" +
          topic.date +
        "</div>";
        $("#news").append(date);

        content =
        "<div class=\"col-md-10 news-body\" >" +
          topic.content +
        "</div>";
        $("#news").append(content);
      });
    });
  });
});