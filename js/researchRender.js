//After render the screen
$(function() {
  //Get data from data/research.json and put it in the json object
  $.getJSON("data/research.json", function(json){
    json.forEach(function(research){
      let div_row_begin =
      "<div class='row mb-5'>";

      let div_col_md_3_begin =
        "<div class='col-md-3'>";

      let image =
          "<img src='" + research.photoPass + "' class='research-image'>";

      let div_col_md_3_end =
        "</div>";

      let div_col_md_9_begin =
        "<div class='col-md-9'>";

      let titleJP =
          "<div class='research-title'>" +
            research.titleJP +
          "</div>";

      let titleEN =
          "<div class='research-title'>" +
            research.titleEN +
          "</div>";

      let publication =
          "<div class='research-publication'>" +
            "(" + research.publication + ")" +
          "</div>";

      let abstract =
          "<div class='research-abstract my-3'>" +
            research.abstract +
          "</div>";

      let link =
          "<a href='" + research.link + "' target='_blank' class='research-link link-btn-square'>" +
            "<span class='btn-text'><i class='fas fa-link'></i> Detail</span>" +
          "</a>";

      let div_col_md_9_end =
        "</div>";

      let content = div_row_begin + div_col_md_3_begin + image + div_col_md_3_end +
                    div_col_md_9_begin + titleJP + titleEN + publication + abstract +
                    link + div_col_md_9_end;

      $('#research').append(content);
    });
  });
});
