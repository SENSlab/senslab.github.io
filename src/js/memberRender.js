//After render the screen
$(function() {
  memberData =
  ["data/member/memberStaff.json",
   "data/member/memberResearcherVisitor.json",
   "data/member/memberDoctor.json",
   "data/member/memberM2.json",
   "data/member/memberM1.json",
   "data/member/memberB4.json"];

  var promise = Promise.resolve();

  memberData.forEach(function(memberDataInAttribute){
    (function(memberDataInAttribute) {
        promise = promise.then(function() {
            return renderMenber(memberDataInAttribute);
        });
    })(memberDataInAttribute);
  });
});

function renderMenber(memberDataInAttribute){
  return new Promise(function(resolve, reject){
    $.getJSON(memberDataInAttribute, function(json){
      json.forEach(function( members ) {
        var countByFour = 0;
        memberInfo = "";

        var margin;

        if(members.attribute === 'Staff / スタッフ'){
          margin = 'mt-8';
        }

        else{
          margin = 'mt-4';
        }

        attribute =
          "<div class='row'>" +
            "<div class='col'>" +
              "<h3 class='headline " + margin + "'>" +
                members.attribute +
              "<hr/></h3>" +
            "</div>" +
          "</div>";

        memberInfo +=
          attribute +
          "<div class='row'>";

        members.people.forEach(function( member ){
          if(countByFour == 4){
            row =
            "</div>" +  //End of <div class='row'>
            "<div class='row'>" +
              "<div class='col'>" +
                "<hr/>" +
              "</div>" +
            "</div>" +
            "<div class='row'>";

            countByFour = 0;
          }
          else{
            row = "";
          }

          /** one member needs "photo", "nameJP",
              "nameEN", "position", and "positionOther"**/
          photo =
            "<div class='col-md-3'>" +
              "<div class='current-lab-member-photo'>" +
                "<img src='" +
                  member.photoPass +
                  "'class='rounded-circle' alt='" +
                  member.nameEN +
                  "' width='130' height='130'>" +
              "</div>";

          if(member.link != undefined){
            nameJP =
              "<div class='current-lab-member-name'>" +
              "<a class='member-link' href='" +
              member.link +
              "' target='_new'>" +
              member.nameJP +
              "</a>" +
              "</div>";
          }
          else{
            nameJP =
              "<div class='current-lab-member-name'>" +
              member.nameJP +
              "</div>";
          }

          nameEN =
            "<div class='current-lab-member-name'>" +
              member.nameEN +
            "</div>";

          if(member.position != undefined){
            position =
              "<div class='current-lab-member-position'>" +
              member.position +
              "</div>";
          }
          else{
            position ="";
          }

          if(member.positionOther != undefined){
            positionOther =
              "<div class='current-lab-member-position'>" +
                member.positionOther +
              "</div>";
          }
          else{
            positionOther = "";
          }

          countByFour++;

          memberInfo += row + photo + nameJP + nameEN + position + positionOther +
          "</div>";  //End of <div class='col-md-3'>
        });
        emptyMemberForStyle = "";

        for(i = 0; i < 4 - countByFour; i++){
          emptyMemberForStyle +=
          "<div class='col-md-3'>" +
          "</div>";
        }

        divEnd = "</div>";  //End of <div class='row'>

        memberInfo += emptyMemberForStyle + divEnd;
        $("#member").append(memberInfo);
        resolve("Success");
      });
    });
  });
}
