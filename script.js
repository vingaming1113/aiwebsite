document.addEventListener("DOMContentLoaded", function() {
  fetchTweets();
});

function fetchTweets() {
  const twitterAPI = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=iptv_wallet";

  fetch(twitterAPI)
    .then(response => response.json())
    .then(data => {
      const tweetsContainer = document.getElementById('tweets-container');
      tweetsContainer.innerHTML = ''; // Clear existing content

      data.forEach(tweet => {
        const tweetElement = document.createElement('a');
        tweetElement.setAttribute('href', `https://twitter.com/user/status/${tweet.id_str}`);
        tweetElement.setAttribute('target', '_blank');
        tweetElement.classList.add('redirect-link');
        tweetElement.innerHTML = `
          <p>${tweet.text}</p>
          <p>Created at: ${tweet.created_at}</p>
        `;
        tweetsContainer.appendChild(tweetElement);
      });
    })
    .catch(error => console.error('Error fetching tweets:', error));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show the scroll to top button when scrolling down
window.addEventListener('scroll', function() {
  var scrollButton = document.querySelector('.scroll-to-top');
  if (window.scrollY > 300) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
});
