document.addEventListener('DOMContentLoaded', function() {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('displayName').textContent = profileData.name;
        document.getElementById('displayBirthday').textContent = 'Birthday: ' + profileData.birthday;
        document.getElementById('displayBio').textContent = profileData.bio;
        document.getElementById('displayQuote').textContent = 'Quote: ' + profileData.quote;
        document.getElementById('profileImageDisplay').src = profileData.profilePic;
    }

    let tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    let heartedTweets = JSON.parse(localStorage.getItem('heartedTweets')) || {};

    displayTweets(tweets, heartedTweets);

    document.getElementById('postTweet').addEventListener('click', function() {
        const tweetText = document.getElementById('tweetText').value;
        if (tweetText) {
            tweets.push(tweetText);
            localStorage.setItem('tweets', JSON.stringify(tweets));
            localStorage.setItem('heartedTweets', JSON.stringify(heartedTweets));
            displayTweets(tweets, heartedTweets);
            document.getElementById('tweetText').value = '';
        }
    });

    function displayTweets(tweets, heartedTweets) {
        const tweetContainer = document.getElementById('tweetContainer');
        tweetContainer.innerHTML = '';
        tweets.forEach((tweet, index) => {
            const tweetDiv = document.createElement('div');
            tweetDiv.className = 'tweet';
            tweetDiv.textContent = tweet;

            const heartButton = document.createElement('button');
            heartButton.textContent = heartedTweets[index] ? '❤️' : '♡';
            heartButton.classList.add('heart-button');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.classList.add('delete-button');

            heartButton.addEventListener('click', function() {
                heartedTweets[index] = !heartedTweets[index];
                localStorage.setItem('heartedTweets', JSON.stringify(heartedTweets));
                displayTweets(tweets, heartedTweets);
            });

            deleteButton.addEventListener('click', function() {
                tweets.splice(index, 1);
                delete heartedTweets[index];
                localStorage.setItem('tweets', JSON.stringify(tweets));
                localStorage.setItem('heartedTweets', JSON.stringify(heartedTweets));
                displayTweets(tweets, heartedTweets);
            });

            
            tweetDiv.appendChild(heartButton);
            tweetDiv.appendChild(deleteButton);
            tweetContainer.appendChild(tweetDiv);
        });
    }
});