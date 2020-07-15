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
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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

const createTweetElement = (tweet) => {
  console.log(tweet);
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
              <p>${tweet.content.text}</p>
            </div>
            <div class="line"></div>
            </header>
          <footer class="tweetsfoot">
            <div class="tweet-log"> 
              <span>${tweet.created_at}</span>
              <span>Icons</span>  
            </div>
            </footer>
        </article>
  `;
  return item;
};

const renderTweets = function(tweets) {
  // loops through tweets
  for (let element in tweets) {
    // calls createTweetElement for each tweet
    let tempItem = createTweetElement(tweets[element]);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append(tempItem);
  }
};

//$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


// const $tweet = createTweetElement(data);
//   console.log($tweet);

$(document).ready(function() {
  //console.log($tweet);
  renderTweets(data);
});
