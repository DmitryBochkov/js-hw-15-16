'use strict';

// Search without jQuery
var request = new XMLHttpRequest();
function getTenorJson(word, counter) {
  var displayBlock = document.querySelector('.image-display'); //block for displying the content

  request.open('GET', 'https://api.riffsy.com/v1/search?key=LIVDSRZULELA&tag=' + word + '&limit=' + counter);
  request.send();
  request.onreadystatechange = function() {
    displayBlock.innerHTML = '';

    if (request.status === 200 && request.readyState === 4) {
      var resText = JSON.parse(request.responseText);
      //checking for 0 result
      if (resText.results.length === 0) {
        createNewElement('p', 'Sorry no images found, try another search term.', displayBlock);
      } else {
        // displayng search results if found
        createNewElement('h2', 'GIFs found on tenor.co:', displayBlock);
        for (var i = 0; i < counter; i++) {
          var imgSrc = resText.results[i].url;
          var newImage = document.createElement('img');
          newImage.src = imgSrc;
          displayBlock.appendChild(newImage);
        }
      }
    } else if (request.status != 200){
      //message for a bad request
      createNewElement('p', 'Sorry, not found...', displayBlock);
    }
  }
}

document.querySelector('.tenor-btn').addEventListener('click', function(ev) {
  ev.preventDefault();

  var searchWord = document.querySelector('.tenor-img-search').value;
  getTenorJson(searchWord, 6); // triggerring getTenorJson(word, count);
});

// Create new elems in the script
function createNewElement(tag, content, parent) {
  var newElement = document.createElement(tag);
  newElement.innerHTML = content;
  parent.appendChild(newElement);
}


// Search with jQuery
$(document).ready(function() {
  function getPixabayJson(word, count) {
    $.ajax({
      url: 'https://pixabay.com/api/?key=2506275-f30addddea12a14e13f6c6e1d&q=' + word + '&image_type=photo&per_page=' + count
    })
    .done(function(data) {
      $('.image-display').html('');
      if (data.hits === 0) {
        $('.image-display').append('<p>Sorry no images found, try another search term.</p>');
      } else {
        $('.image-display').append('<h2>Images found on pixabay.com:</h2>');
        for (var i = 0; i < count; i++) {
          var imgSrc = data.hits[i].webformatURL;
          $('.image-display').append('<img src="' + imgSrc + '">');
        }
       }
    })
    .fail(function() {
      $('.image-display').append('<p>Sorry, not found...</p>')
    });
  }
  $('.pixabay-btn').on('click', function(ev) {
  ev.preventDefault();

  var searchWord = $('.pixabay-img-search').val();
  getPixabayJson(searchWord, 6);
  });
});
