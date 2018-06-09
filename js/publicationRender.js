$(function(){
  // Encrypted API_KEY
  let API_KEY = '4f1b85235a3162e9c52507853cef219f,b9091079ba11e08178ddfef9ffcedb7c,U2oCN0cZWI9uuOOyHxk9wAxhUldNDvVIdpOTSF9qNCwvQQMjD4+H3EBBjVSnoCjq';
  let pass = 'sens';

  API_KEY = decrypt(API_KEY, pass);

  let SPREADSHEET_ID = 'f6dae22dc2c3f7cf071c0a6e4c894210,4e42a21b62e88f40d5b86883b3ed858f,kGCvadaPGtviYqtR7sj2XKn+N7I6ZUZ67upyBkCszBcLxhnfDFixI7tk2CpaSeDs';
  SPREADSHEET_ID = decrypt(SPREADSHEET_ID, pass);

  renderAward(API_KEY, SPREADSHEET_ID);
  renderJournal(API_KEY, SPREADSHEET_ID);

});

function renderAward(API_KEY, SPREADSHEET_ID){
  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Award!A1:C10000?key=' + API_KEY, function(json){
    shapedJson = $.parseJSON(awardJsonShape(json.values));

    publicationHTML =
    '<h3 class=\"headline\">Award / 受賞</h3>' +
    '<hr>';

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

    });

    publicationHTML +=
    '<a id=\"show_more_btn\" class=\"square_btn\" style=\"text-align: center;\">' +
      '▼Show more' +
    '</a>';
    $('#publication').append(publicationHTML);
  });
}

function awardJsonShape(jsonFromSpreadSheet){
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

function renderJournal(API_KEY, SPREADSHEET_ID){
  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Journal Papers!A1:B10000?key=' + API_KEY, function(json){
    shapedJson = $.parseJSON(journalJsonShape(json.values));

    publicationHTML =
    '<h3 class=\"headline\">Journal Papers / 論文</h3>' +
    '<hr>';

    shapedJson.forEach(function(contents){
      publicationHTML +=
        contents['year'] +
        '<br/>';
      i_topic = 0;
      while(1){
        publicationHTML +=
          '・' +
          contents['topic'][i_topic]['detail'] +
          '<br/>';
        i_topic = i_topic + 1;
        if(contents['topic'][i_topic] == undefined){
          break;
        }
      }
    });

    publicationHTML +=
    '<a id=\"show_more_btn\" class=\"square_btn\" style=\"text-align: center;\">' +
      '▼Show more' +
    '</a>';
    $('#publication').append(publicationHTML);
  });
}

function journalJsonShape(jsonFromSpreadSheet){
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
          '\"detail\": \"' + jsonFromSpreadSheet[i_topic][1].replace(/"/g, '\\"') + '\"' +
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
