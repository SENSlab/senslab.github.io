$(function(){
  // Encrypted API_KEY
  let API_KEY = '7608320d524b25604efc37615685dd39,747afd9accb8009d9b4c0b36e1025be8,WcVLMQSvjnQEh3AgcZIX5rEZLg7OcZwxE2e2x72QBLKU5OPS+Ib5G8FLtWA73U7Z';
  let pass = 'sens';

  API_KEY = decrypt(API_KEY, pass);

  let SPREADSHEET_ID = 'f56e081e2d85834f6220284b872ab154,b32208d1bc079220407f8da3e2cb3c4f,IHzTJc99UN056JQ01lSdI0u6kj0scQQHngJ0T+FPMNq9qT2waHYB5Mi9nNyG+u1v';
  SPREADSHEET_ID = decrypt(SPREADSHEET_ID, pass);

  var shapedJson = {};

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Award!A1:C10000?key=' + API_KEY, function(json){
    var promiseShapeAward = new Promise(function(resolve, reject) {
      shapedJson.award = $.parseJSON(awardJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeAward.then(function(value) {
      $('#show_more_award_btn').trigger('click');
    });
  });


  var i_year = {award : 0, journal : 0};

  $('#show_more_award_btn').on('click', function() {
    renderAward(API_KEY, SPREADSHEET_ID, shapedJson.award, i_year);

    if(shapedJson.award[i_year.award] === undefined){
      $('#show_more_award_btn').remove();
    }
  });

});

function renderAward(API_KEY, SPREADSHEET_ID, contents, i_year){
  publicationHTML =
    contents[i_year.award]['year'] +
    '<br/>';

  let i_topic = 0;

  while(1){
    publicationHTML +=
      '・' +
      contents[i_year.award]['topic'][i_topic]['award'] +
      '<br/>' +
      contents[i_year.award]['topic'][i_topic]['detail'] +
      '<br/>';
    i_topic = i_topic + 1;
    if(contents[i_year.award]['topic'][i_topic] == undefined){
      break;
    }
  }

  i_year.award = i_year.award + 1;

  $('#award').append(publicationHTML);
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
  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Journal!A1:B10000?key=' + API_KEY, function(json){
    shapedJson = $.parseJSON(journalJsonShape(json.values));

    publicationHTML =
    '<h3 class=\"headline\">Journal / 論文</h3>' +
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
