/* client.js */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// prevent XSS client-side in JavaScript
const htmlEncode = function(str) {
//function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function(c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};


// this function formats the tweet element for display in browser
const createTweetElement = (tweet) => {
 
  // calcuate various time intervals
  const z = new Date() - new Date(tweet.created_at);
  const day = Math.round(z / (1000 * 3600 * 24));
  const hour = Math.round(z / 360000);
  const minute = Math.round(z / 60000);
  const second = Math.round(z / 1000);
  const final = day > 1 ? day + " days ago" : hour > 1 && hour < 24 ? hour + " hours ago" : minute > 1 && minute < 60 ? minute + " minutes ago" : second > 1 && second < 60 ? second + " seconds ago" : second + " second ago";
  
  const item = `
<article class="articlebox">
          <header class="tweetshead">
            <div class="tweet-log"> 
              <span>
                <img class="tweetimg" src="${tweet.user.avatars}"/>
                ${tweet.user.name}</span>
              <span>${tweet.user.handle}</span>  
            </div>
            <div class="tweet-message">
              <p>${htmlEncode(tweet.content.text)}</p>
            </div>
            <div class="line"></div>
            </header>
          <footer class="tweetsfoot">
            <div class="tweet-log"> 
              <span>${final}</span> 
              <span><img class="iconimg" src="images/flagicon.jpg"><img class="iconimg" src="images/retweet.png"><img class="iconimg" src="images/like.png"></img></span>  
            </div>
            </footer>
        </article>
  `;
  return item;
};

// function to clear text area and reset counter to 140 after submit
const clearTextArea = function() {
  const num = 140;
  document.getElementById("tweet-text").value = '';
  $('.counter').text(num);
};


const renderTweets = function(tweets) {
  // loops through tweets
  $('#tweets-container').empty();
  for (let element in tweets) {
    // calls createTweetElement for each tweet
    let tempItem = createTweetElement(tweets[element]);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(tempItem);
  }
};


// obtains the new inputed tweet and passes to render tweets
const loadTweets = function() {
  $.ajax({
    url: '/tweets/',
    dataType: 'json',
    type: 'GET',
  })
    .then(function(response) {
      renderTweets(response);
    });
};

$(document).ready(function() {
  $('.formtweet').on('submit', function(e) {
    e.preventDefault();
    // input data converted to query string for AJAX POST
    let data = $(this).serialize();
    // input captured as actual characters for length count
    let text = $(this).find('textarea').val();
    //const $parent = $(this).closest('form');
    // condition for validation on tweet input
    if (text.length > 140) {
      $(".warning-message").slideDown();
      $(".warning-message2").slideUp();
    } else if (text.length === 0) {
      $(".warning-message2").slideDown();
      $('.warning-message').slideUp();
    } else {
      $('.warning-message').slideUp();
      $(".warning-message2").slideUp();
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: data,
      })
        .done(function() {
          // sending the result from text input to loadtweets function
          loadTweets();
          clearTextArea();

        }).fail(function() {
          alert("Sorry. Server unavailable");
        });
    }
  });
  loadTweets();
});