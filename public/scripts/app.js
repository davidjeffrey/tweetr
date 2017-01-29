$(function() {

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function createTweetElement (data) {
    let result = $(`<article class="tweet">
                      <header>
                        <img src="${data.user.avatars.small}">
                        <h3>${escape(data.user.name)}</h3>
                        <div>${escape(data.user.handle)}</div>
                      </header>
                      <p>${escape(data.content.text)}</p>
                      <footer>
                          ${timeSince(escape(data.created_at))}
                        <a href="#">
                          <span class="glyphicon glyphicon-asterisk"></span>
                        </a>
                        <a href="#">
                          <span class="glyphicon glyphicon glyphicon-refresh"></span>
                        </a>
                        <a href="#">
                          <span class="glyphicon glyphicon-heart"></span>
                        </a>
                      </footer>
                    </article>`
                  );
    return result;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

  function loadTweets () {
  $.ajax({
      url: './tweets',
      method: 'GET',
      success: function (tweets) {
        renderTweets(tweets.reverse()), console.log(tweets)}
      })
  }

  $("#loginClick").on("click", function(){
   event.preventDefault();
    $.post( "./login", $(".login").serialize())
      .success( function() {

        // $(".login").slideToggle(500)
        // $("#username").val("")
        // loadTweets();
        })
      .fail(function () {alert("wrong username")})
  });

  $("#regNewUser").on("click", function(){
   event.preventDefault();

    $.post( "./login", $(".newPeep").serialize())
      .success( function() {
          $(".newPeep").slideToggle(100)
          $(".newPeep").val("")
        })
      .fail(function () {alert("wrong password")})
  });

  $("#newReg").on("click", function() {
    event.preventDefault();
    $(".newPeep").slideToggle(100)
  });

  $(".new-tweet input").on("click", function(){
    event.preventDefault();
    if ($(".new-tweet textarea").serialize().length - 5 > 140) {
      alert("Too long! Must be less than 140 characters child!")
    } else if (!$(".new-tweet textarea").val()) {
      alert("Can't have an empty tweet child!")
    } else {
        $.post( "./tweets", $(".new-tweet textarea").serialize())
        .success( function() {
          $(".new-tweet").slideToggle(500)
          $(".new-tweet textarea").val("")
          loadTweets();
          });
      }
  });

  $("#nav-bar button").on("click", function() {
    $(".new-tweet").slideToggle(250)
    $(".new-tweet textarea").focus()
  });

  loadTweets();

});
