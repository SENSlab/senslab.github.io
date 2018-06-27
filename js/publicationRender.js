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

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Journal!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapeJournal = new Promise(function(resolve, reject) {
      shapedJson.journal = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeJournal.then(function(value) {
      $('#show_more_journal_btn').trigger('click');
    });
  });

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/InternationalConference!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapeInternationalConference = new Promise(function(resolve, reject) {
      shapedJson.internationalConference = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeInternationalConference.then(function(value) {
      $('#show_more_international_conference_btn').trigger('click');
    });
  });

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/DomesticConference!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapeDomesticConference = new Promise(function(resolve, reject) {
      shapedJson.domesticConference = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeDomesticConference.then(function(value) {
      $('#show_more_domestic_conference_btn').trigger('click');
    });
  });

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Survey!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapeSurvey = new Promise(function(resolve, reject) {
      shapedJson.survey = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeSurvey.then(function(value) {
      $('#show_more_survey_btn').trigger('click');
    });
  });

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Press!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapePress = new Promise(function(resolve, reject) {
      shapedJson.press = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapePress.then(function(value) {
      $('#show_more_press_btn').trigger('click');
    });
  });

  $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/Book!A1:B10000?key=' + API_KEY, function(json){
    var promiseShapeBook = new Promise(function(resolve, reject) {
      shapedJson.book = $.parseJSON(publicationJsonShape(json.values));
      resolve('Success');
    });
    promiseShapeBook.then(function(value) {
      $('#show_more_book_btn').trigger('click');
    });
  });

  var i_year = {award : 0, journal : 0, internationalConference : 0, domesticConference : 0, survey : 0, press : 0, book : 0};

  $('#show_more_award_btn').on('click', function() {
    renderAward(API_KEY, SPREADSHEET_ID, shapedJson.award, i_year);

    if(shapedJson.award[i_year.award] === undefined){
      $('#show_more_award_btn').remove();
    }
  });

  $('#show_more_journal_btn').on('click', function() {
    renderJournal(API_KEY, SPREADSHEET_ID, shapedJson.journal, i_year);

    if(shapedJson.journal[i_year.journal] === undefined){
      $('#show_more_journal_btn').remove();
    }
  });

  $('#show_more_international_conference_btn').on('click', function() {
    renderInternationalConference(API_KEY, SPREADSHEET_ID, shapedJson.internationalConference, i_year);

    if(shapedJson.internationalConference[i_year.internationalConference] === undefined){
      $('#show_more_international_conference_btn').remove();
    }
  });

  $('#show_more_domestic_conference_btn').on('click', function() {
    renderDomesticConference(API_KEY, SPREADSHEET_ID, shapedJson.domesticConference, i_year);

    if(shapedJson.domesticConference[i_year.domesticConference] === undefined){
      $('#show_more_domestic_conference_btn').remove();
    }
  });

  $('#show_more_survey_btn').on('click', function() {
    renderSurvey(API_KEY, SPREADSHEET_ID, shapedJson.survey, i_year);

    if(shapedJson.survey[i_year.survey] === undefined){
      $('#show_more_survey_btn').remove();
    }
  });

  $('#show_more_press_btn').on('click', function() {
    renderPress(API_KEY, SPREADSHEET_ID, shapedJson.press, i_year);

    if(shapedJson.press[i_year.press] === undefined){
      $('#show_more_press_btn').remove();
    }
  });

  $('#show_more_book_btn').on('click', function() {
    renderBook(API_KEY, SPREADSHEET_ID, shapedJson.book, i_year);

    if(shapedJson.book[i_year.book] === undefined){
      $('#show_more_book_btn').remove();
    }
  });

});

function renderAward(API_KEY, SPREADSHEET_ID, contents, i_year){
  publicationHTML =
    '<h4>' +
    contents[i_year.award]['year'] +
    '</h4>';

  let i_topic = 0;

  publicationHTML +=
    '<ol class="award">';

  while(1){
    publicationHTML +=
      '<li>' +
      contents[i_year.award]['topic'][i_topic]['award'] +
      '</li>' +
      contents[i_year.award]['topic'][i_topic]['detail'] +
      '<br/>';
    i_topic = i_topic + 1;
    if(contents[i_year.award]['topic'][i_topic] === undefined){
      break;
    }
  }

  publicationHTML +=
    '</ol>';

  i_year.award = i_year.award + 1;

  $('#award').append(publicationHTML);
}


function renderJournal(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.journal]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.journal]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.journal]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.journal = i_year.journal + 1;

    $('#journal').append(publicationHTML);
}



function renderInternationalConference(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.internationalConference]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.internationalConference]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.internationalConference]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.internationalConference = i_year.internationalConference + 1;

    $('#international_conference').append(publicationHTML);
}


function renderDomesticConference(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.domesticConference]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.domesticConference]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.domesticConference]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.domesticConference = i_year.domesticConference + 1;

    $('#domestic_conference').append(publicationHTML);
}


function renderSurvey(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.survey]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.survey]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.survey]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.survey = i_year.survey + 1;

    $('#survey').append(publicationHTML);
}


function renderPress(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.press]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.press]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.press]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.press = i_year.press + 1;

    $('#press').append(publicationHTML);
}


function renderBook(API_KEY, SPREADSHEET_ID, contents, i_year){
    publicationHTML =
      '<h4>' +
      contents[i_year.book]['year'] +
      '</h4>';

    let i_topic = 0;

    publicationHTML +=
      '<ol>';

    while(1){
      publicationHTML +=
        '<li>' +
        contents[i_year.book]['topic'][i_topic]['detail'] +
        '</li>';
      i_topic = i_topic + 1;
      if(contents[i_year.book]['topic'][i_topic] === undefined){
        break;
      }
    }

    publicationHTML +=
      '</ol>';

    i_year.book = i_year.book + 1;

    $('#book').append(publicationHTML);
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

function publicationJsonShape(jsonFromSpreadSheet){
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
