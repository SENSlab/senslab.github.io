$(function(){
  // Encrypted API_KEY
  let API_KEY = '4f1b85235a3162e9c52507853cef219f,b9091079ba11e08178ddfef9ffcedb7c,U2oCN0cZWI9uuOOyHxk9wAxhUldNDvVIdpOTSF9qNCwvQQMjD4+H3EBBjVSnoCjq';
  let pass = 'sens';

  API_KEY = decrypt(API_KEY, pass);

  let SPREADSHEET_ID = 'f6dae22dc2c3f7cf071c0a6e4c894210,4e42a21b62e88f40d5b86883b3ed858f,kGCvadaPGtviYqtR7sj2XKn+N7I6ZUZ67upyBkCszBcLxhnfDFixI7tk2CpaSeDs';
  SPREADSHEET_ID = decrypt(SPREADSHEET_ID, pass);

  $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/" + SPREADSHEET_ID + "/values/Award!A1:C10000?key=" + API_KEY, function(json){
    shapedJson = $.parseJSON(jsonShape(json.values));

    publicationHTML = '';
    shapedJson.forEach(function(contents){
      publicationHTML +=
        contents['year'] +
        '<br/>';
      i_topic = 0;
      while(1){
        publicationHTML +=
          '・' +
          contents['topic'][i_topic]['award'] +
          '<br/>' +
          contents['topic'][i_topic]['detail'] +
          '<br/>';
        i_topic = i_topic + 1;
        if(contents['topic'][i_topic] == undefined){
          break;
        }
      }

      publicationHTML += '<br/>'
    });


    $('#publication').append(publicationHTML);
});
});

function jsonShape(jsonFromSpreadSheet){
  shapedJson =
  '[';
  dataEnd = false;
  i_year = 1;

  while(1){
    shapedJson +=
      '{' +
        '\"year\": ' + '\"' + jsonFromSpreadSheet[i_year][0] + '\",' +
        '\"topic\": [';

    i_topic = i_year + 1;

    while(1){
      if(jsonFromSpreadSheet[i_topic] == undefined){
        dataEnd = true;
        break;
      }

      if(jsonFromSpreadSheet[i_topic][0] == ''){
        shapedJson +=
        '{' +
          '\"award\": \"' + jsonFromSpreadSheet[i_topic][1] + '\",' +
          '\"detail\": \"' + jsonFromSpreadSheet[i_topic][2].replace(/"/g, '\\"') + '\"' +
        '},';
      }
      else if(jsonFromSpreadSheet[i_topic][0] != ''){
        shapedJson = shapedJson.slice(0, -1);
        shapedJson +=
          ']' +
        '},';
        break;
      }

      i_topic = i_topic + 1;
    }

    i_year = i_topic;

    if(dataEnd == true){
      shapedJson = shapedJson.slice(0, -1);
      shapedJson +=
        ']' +
        '}' +
      ']';
      break;
    }

  }

  return shapedJson;
}
