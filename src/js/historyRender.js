//After render the screen
$(function() {
  //Get data from data/history.json and put it in the json object
  $.getJSON("data/history.json", function(json){
      json.forEach(function( history ){
        head =
        "<div class='cd-timeline__block js-cd-block'>";

          if(history.genre === "sigma"){
            img =
            "<div class='cd-timeline__img cd-timeline__img--sigma-background js-cd-img'>" +
        			"<img src='images/icons/sigma-history-icon.svg' alt='Location'>" +
            "</div>";
          }
          else if(history.genre === "sens"){
            img =
            "<div class='cd-timeline__img cd-timeline__img--sens-background js-cd-img'>" +
        			"<img src='images/icons/sens-history-icon.svg' alt='Location'>" +
            "</div>";
          }

          topic =
          "<div class='cd-timeline__content js-cd-content'>" +
            "<div class='history-topic'>" +
                history.topic +
            "</div>";

            if(history.content !== undefined){
              content =
              "<div>" +
                history.content +
              "</div>";
            }
            else{
              content = "";
            }

            date =
            "<span class='cd-timeline__date'>" +
              history.date +
            "</span>";

            foot =
          "</div>" +
        "</div>"

        $("#history").append(head + img + topic + content + date + foot);
      });

      $.getScript('js/historyVerticalTimeline.js');
  });


});
