document.addEventListener('DOMContentLoaded', function() {

document.getElementById('createProfile').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const birthday = document.getElementById('birthday').value;
    const bio = document.getElementById('bio').value;
    const quote = document.getElementById('quote').value;
    const profilePic = document.getElementById('profilePic').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        localStorage.setItem('profileData', JSON.stringify({
            name: name,
            birthday: birthday,
            bio: bio,
            quote: quote,
            profilePic: e.target.result
        }));
        window.location.href = 'feed.html';
    };
    if(profilePic){
        reader.readAsDataURL(profilePic);
    } else {
         localStorage.setItem('profileData', JSON.stringify({
            name: name,
            birthday: birthday,
            bio: bio,
            quote: quote,
            profilePic: ""
        }));
        window.location.href = 'feed.html';
    }
    function displayTweets(tweets) {
        const tweetContainer = document.getElementById('tweetContainer');
        tweetContainer.innerHTML = '';
        tweets.forEach((tweet, index) => { // Added index for heart tracking
            const tweetDiv = document.createElement('div');
            tweetDiv.className = 'tweet';
            tweetDiv.textContent = tweet;

            const heartButton = document.createElement('button');
            heartButton.textContent = '❤️';
            heartButton.classList.add('heart-button'); // Add a class for styling

            // Check if the tweet is already hearted
            const heartedTweets = JSON.parse(localStorage.getItem('heartedTweets')) || [];
            if (heartedTweets.includes(index)) {
                heartButton.classList.add('hearted'); // Apply hearted class
            }

            heartButton.addEventListener('click', function() {
                toggleHeart(index);
            });

            tweetDiv.appendChild(heartButton);
            tweetContainer.appendChild(tweetDiv);
        });
    }

    function toggleHeart(index) {
        const heartedTweets = JSON.parse(localStorage.getItem('heartedTweets')) || [];
        const heartButton = document.querySelectorAll('.heart-button')[index];

        if (heartedTweets.includes(index)) {
            // Remove heart
            const newHeartedTweets = heartedTweets.filter(item => item !== index);
            localStorage.setItem('heartedTweets', JSON.stringify(newHeartedTweets));
            heartButton.classList.remove('hearted');
        } else {
            // Add heart
            heartedTweets.push(index);
            localStorage.setItem('heartedTweets', JSON.stringify(heartedTweets));
            heartButton.classList.add('hearted');
        }
    }
});
});