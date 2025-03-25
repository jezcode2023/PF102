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
});