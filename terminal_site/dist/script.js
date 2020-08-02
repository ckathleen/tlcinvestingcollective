var inputReady = true;
var input = $('.404-input');
input.focus();
$('.container').on('click', function (e) {
  input.focus();
});

input.on('keyup', function (e) {
  $('.new-output').text(input.val());
  // console.log(inputReady);
});

$('.four-oh-four-form').on('submit', function (e) {
  e.preventDefault();
  var val = $(this).children($('.404-input')).val().toLowerCase();
  var href;
  if (val == 'kittens') {
    showKittens();
  } else if (val == 'howcanibehelpful') {
    showHelpfulGif();
  } else {
    resetForm(val)
  }
});

function resetForm(val) {
  var message = "Sorry that command is not recognized."
  var input = $('.404-input');

  if (val == 'help') {
    message = "Supported commands:'whoarewe', 'whoami', 'portfolio', 'apply', 'help', 'kittens', 'pwd', 'howcanibehelpful'"
  } else if (val == 'pwd') {
    message = "/cool-humans/engineers/commmunities/TLC"
  } else if (val == 'whoarewe') {
    message = "We're TLC 💫. An engineering community that invests in the coolest new technologies."
  } else if (val == 'whoami') {
    message = "That's deep. This is just another VC website, can't go that deep. But reach out. Terri is a coach and can help you with this."
  } else if (val == 'portfolio') {
    message = "Our founders include x,y,z. You can learn more about them here. <a src='www.google.com'> HERE </a> 👈"
  } else if (val == 'apply') {
    message = 'If you are an eng that wants to invest alongside other dope engineers. Reach out on Twitter.'
  } else if (val == 'kittens') {
    message = "Huzzzzzah Kittehs!"
    $('.kittens').removeClass('kittens');
  } else if (val == 'howcanibehelpful') {
    message = '😂 😂 😂'
  }

  // reset all!!
  $('.new-output').removeClass('new-output');
  input.val('');
  $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');

  $('.new-output').velocity(
    'scroll'
  ), { duration: 100 }
}

function showHelpfulGif() {
  $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=helpful', function (result) {
    gif = result.data.image_url;
    $('.terminal').append('<img class="gif" src="' + gif + '""><br>');
  }).then(function () {
    console.log('in here!!')
    resetForm('howcanibehelpful')
  })
}

function showKittens() {
  $('.terminal').append("<div class='kittens'>" +
    "<p class='prompt'>	                             ,----,         ,----,                                          ,---,</p>" +
    "<p class='prompt'>       ,--.                ,/   .`|       ,/   .`|                     ,--.              ,`--.' |</p>" +
    "<p class='prompt'>   ,--/  /|    ,---,     ,`   .'  :     ,`   .'  :     ,---,.        ,--.'|   .--.--.    |   :  :</p>" +
    "<p class='prompt'>,---,': / ' ,`--.' |   ;    ;     /   ;    ;     /   ,'  .' |    ,--,:  : |  /  /    '.  '   '  ;</p>" +
    "<p class='prompt'>:   : '/ /  |   :  : .'___,/    ,'  .'___,/    ,'  ,---.'   | ,`--.'`|  ' : |  :  /`. /  |   |  |</p>" +
    "<p class='prompt'>|   '   ,   :   |  ' |    :     |   |    :     |   |   |   .' |   :  :  | | ;  |  |--`   '   :  ;</p>" +
    "<p class='prompt'>'   |  /    |   :  | ;    |.';  ;   ;    |.';  ;   :   :  |-, :   |   \\ | : |  :  ;_     |   |  '</p>" +
    "<p class='prompt'>|   ;  ;    '   '  ; `----'  |  |   `----'  |  |   :   |  ;/| |   : '  '; |  \\  \\    `.  '   :  |</p>" +
    "<p class='prompt'>:   '   \\   |   |  |     '   :  ;       '   :  ;   |   :   .' '   ' ;.    ;   `----.   \\ ;   |  ;</p>" +
    "<p class='prompt'>'   : |.  \\ |   |  '     '   :  |       '   :  |   '   :  ;/| '   : |  ; .'  /  /`--'  /  `--..`;  </p>" +
    "<p class='prompt'>|   | '_\\.' '   :  |     ;   |.'        ;   |.'    |   |    \\ |   | '`--'   '--'.     /  .--,_   </p>" +
    "<p class='prompt'>'   : |     ;   |.'      '---'          '---'      |   :   .' '   : |         `--'---'   |    |`.  </p>" +
    "<p class='prompt'>;   |,'     '---'                                  |   | ,'   ;   |.'                    `-- -`, ; </p>" +
    "<p class='prompt'>'---'                                              `----'     '---'                        '---`'</p>" +
    "<p class='prompt'>                                                              </p></div>");


  var lines = $('.kittens p');
  $.each(lines, function (index, line) {
    setTimeout(function () {
      $(line).css({
        "opacity": 1
      });

      textEffect($(line))
    }, index * 100);
  });

  $('.new-output').velocity(
    'scroll'
  ), { duration: 100 }
  resetForm('kittens')
}

function textEffect(line) {
  var alpha = [';', '.', ',', ':', ';', '~', '`'];
  var animationSpeed = 10;
  var index = 0;
  var string = line.text();
  var splitString = string.split("");
  var copyString = splitString.slice(0);

  var emptyString = copyString.map(function (el) {
    return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
  })

  emptyString = shuffle(emptyString);

  $.each(copyString, function (i, el) {
    var newChar = emptyString[i];
    toUnderscore(copyString, line, newChar);

    setTimeout(function () {
      fromUnderscore(copyString, splitString, newChar, line);
    }, i * animationSpeed);
  })
}

function toUnderscore(copyString, line, newChar) {
  copyString[newChar[1]] = newChar[0];
  line.text(copyString.join(''));
}

function fromUnderscore(copyString, splitString, newChar, line) {
  copyString[newChar[1]] = splitString[newChar[1]];
  line.text(copyString.join(""));
}


function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};