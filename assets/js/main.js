// var singerElement = document.querySelector('.audio-singer');

// var singerNames = ['Taylor Swift', 'Ariana Grande', 'Beyoncé', 'Ed Sheeran', 'Justin Bieber', 'Katy Perry', 'Rihanna', 'Shawn Mendes'];

// function updateSingerName() {
//     console.log("inside updatename"+singerElement);

//   var randomIndex = Math.floor(Math.random() * singerNames.length);
//   var randomSingerName = singerNames[randomIndex];
//   singerElement.textContent = randomSingerName;
//   console.log(" updatename"+singerElement);
// }
// updateSingerName();
// singerElement.addEventListener('click', updateSingerName);
// console.log("inside updatename"+singerElement);


// // var accessKey = 'dATex-q_2lQsRmU5cqpcHLnXA5ATqA-BwXgh2KQgGL8';

// // var apiUrl = 'https://api.unsplash.com/photos/random?client_id=' + accessKey;

// // var image = document.getElementById('myImage');

// // function updateImage() {
// //   fetch(apiUrl)
// //     .then(response => response.json())
// //     .then(data => {
// //       var imageUrl = data.urls.regular;
// //       image.setAttribute('src', imageUrl);
// //     })
// //     .catch(error => console.error(error));
// // }

// // updateImage();

// // setInterval(updateImage, 3000);


const playBtn = document.querySelector(".play"),
    skipForward = document.querySelector(".skip-forward"),
    skipBack = document.querySelector(".skip-back"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    progressHead = document.querySelector('.progress-head'),

    currentTimeHtml = document.querySelector(".current-time"),
    durationHtml = document.querySelector(".duration"),

   
    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.img'),
    title = document.querySelector(".audio-title"),
    singer = document.querySelector(".audio-singer");
    const cidWithNameMap = new Map();
    fetch('https://api.estuary.tech/content/list',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer EST6a7f86f7-4646-4503-bdfb-210173b30071ARY'
      }
    })
    .then(response => response.json())
    .then(data => {
      const cidWithNameArray = data.map(item => {
        return { cid: item.cid, name: item.name };
      });
    
      const tracks = cidWithNameArray.map(item => {
        return {
          name: item.name,
          artist: cidWithNameMap.get(item.cid),
          cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fm=jpg", 
          source: `https://gateway.estuary.tech/gw/ipfs/${item.cid}`
        };
      });
      
      console.log(tracks);
    
   
    

  /*  this.tracks = [
    {
        name: "Tech House vibes",
        artist: "Artist 1",
        cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fm=jpg",
        source: "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3",
    },
    {
        name: "Hip Hop 02",
        artist: "Artist 2",
        cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?crop=entropy&cs=tinysrgb&fm=jpg",
        source: "https://assets.mixkit.co/music/download/mixkit-hip-hop-02-738.mp3",
    },
    {
        name: "Dreaming Big",
        artist: "Artist 3",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fm=jpg",
        source: "https://assets.mixkit.co/music/download/mixkit-dreaming-big-31.mp3",
    },
]; */



console.log("current tag: "+tracks[0]);

// Initial state values
let audio = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0,
    currentTrack = tracks[0];

// Set initial state values
audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;
});


skipForward.addEventListener('click', () => {

    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

skipBack.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;

        if (dursec < 10) dursec = "0" + dursec;

        if (curmin < 10) curmin = "0" + curmin;

        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');


        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () { };



})
.catch(error => console.error(error));


// Animations
TweenMax.from('.img', 4, { rotation: "+=360", transformOrigin: "50% 50%", ease: Linear.easeNone, repeat: -1 });
gsap.from("body, h1, .audio-img, .audio-title, .audio-singer, .audio-btns", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});


const fileInput = document.querySelector('#file-input');
const uploadButton = document.querySelector('#upload-button');

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    console.error('No file selected');
    return;
  }
  const formData = new FormData(); // Create a new FormData object
  formData.append('data', fileInput.files[0]); // Add the selected audio file to the FormData object
  

  fetch('https://api.estuary.tech/content/add', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer EST6a7f86f7-4646-4503-bdfb-210173b30071ARY'
  },
 body: formData
 })
 .then(response => {
console.log(response);
alert("File Uploaded Succesfully");
// Handle the response data here
})
.catch(error => {
console.error(error);
// Handle errors here
});
});







