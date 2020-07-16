/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
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

function htmlEncode(str){
  return String(str).replace(/[^\w. ]/gi, function(c){
     return '&#'+c.charCodeAt(0)+';';
  });
}

function slide() {
  $('#warntexthide').slideUp();
}

const createTweetElement = (tweet) => {
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
              <span>${String(new Date(tweet.created_at))}</span> 
              <span>Icons</span>  
            </div>
            </footer>
        </article>
  `;
  return item;
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


const loadTweets = function () {
    //let array = $.get('/tweets/', function(data, status) {
  $.ajax({
    url: '/tweets/',
    dataType: 'json',
    type: 'GET',
  }) 
    .then(function(response) {
      renderTweets(response);
    });
}

$(document).ready(function() {
  $('.formtweet').on('submit', function(e) {
    e.preventDefault();
    let data = $(this).serialize();
    let text = $(this).find('textarea').val();
    const $parent = $(this).closest('form');
    if(text.length > 140) {
      $(".warning-message").slideDown();
      } else if (text.length === 0){
        $(".warning-message2").slideDown();
      } else {
      $('.warning-message').slideUp();
      $(".warning-message2").slideUp();
    $.ajax({  
      type: "POST", 
      url: "/tweets/",
      data: data,
    })
    .done(function() {
      loadTweets();
    }).fail(function() {
      alert("Sorry. Server unavailable")
    }) 
}})
  loadTweets();
});