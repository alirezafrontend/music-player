const songs = [
  {
    id: 1,
    name: "Vay Be Halesh",
    artist: "Hayedeh",
    src: "music/Vay Be Halesh.mp3",
    img: "img/popular-music/Vay Be Halesh.jpg",
  },
  {
    id: 2,
    name: "Atre To",
    artist: "Ebi",
    src: "music/Atre To.mp3",
    img: "img/popular-music/Atre To.jpg",
  },
  {
    id: 3,
    name: "Ashegh Ashegham Man",
    artist: "Susan Roshan",
    src: "music/Ashegh Ashegham Man.mp3",
    img: "img/popular-music/Ashegh Ashegham Man.jpg",
  },
  {
    id: 4,
    name: "Dehaati",
    artist: "Shadmehr",
    src: "music/Dehaati.mp3",
    img: "img/popular-music/Dehaati.jpg",
  },
  {
    id: 5,
    name: "Marde Tanhaye Shab",
    artist: "Habib",
    src: "music/Habib - Marde Tanhaye Shab.mp3",
    img: "img/popular-music/Habib - Marde Tanhaye Shab.jpg",
  },
  {
    id: 6,
    name: "Masto Kharab",
    artist: "Viguen",
    src: "music/06 Masto Kharab.mp3",
    img: "img/popular-music/Masto Kharab.jpg",
  },
];

const songsList = document.querySelector(".songs-list");
const mostPopulars = document.querySelector(".most-populars");

let currentTime = document.querySelector(".current-time");
let durationPlayer = document.querySelector(".duration");
let play = document.querySelector(".play");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let progressBar = document.querySelector(".progress-bar");
let progress = document.querySelector(".progress");
let repeat = document.querySelector(".repeat-song");
let soundMusic = document.querySelector(".sound-music");
let playItem = document.querySelector(".play-item");
let nameSong = document.querySelector(".name-song");
let songDetails = document.querySelector(".song-details");
let currentAudio = null;
let currentPlayIcon = null;
let currentPlayButton = null;
let isRepeat = false;
let isMuted = false;

// progressBar
progressBar.addEventListener("click", (e) => {
  if (currentAudio) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - progressBarRect.left;
    const progressBarWidth = progressBarRect.width;
    const clickPercentage = (clickPosition / progressBarWidth);
    
    const newTime = clickPercentage * currentAudio.duration;
    if (isFinite(newTime) && newTime >= 0 && newTime <= currentAudio.duration) {
      currentAudio.currentTime = newTime;
      progress.style.width = `${clickPercentage * 100}%`;
    }
  }
});

// repeat
repeat.addEventListener("click", () => {
  isRepeat = !isRepeat;
  if (isRepeat) {
    repeat.style.color = "red";
    if (currentAudio) {
      currentAudio.loop = true;
    }
  } else {
    repeat.style.color = "";
    if (currentAudio) {
      currentAudio.loop = false;
    }
  }
});

// sound
soundMusic.addEventListener("click", () => {
  isMuted = !isMuted;
  if (currentAudio) {
    currentAudio.muted = isMuted;
  }
  
  if (isMuted) {
    soundMusic.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
  } else {
    soundMusic.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
  }
});

// creat list song

songs.forEach((song) => {
  // start item song

  let songDetails = document.createElement("div");
  songDetails.classList.add("song-details");

  // number song

  let numSong = document.createElement("p");
  numSong.classList.add("num-song");
  let num = document.createElement("span");
  num.classList.add("num");
  num.textContent = `${song.id}.`;
  let playItem = document.createElement("span");
  playItem.classList.add("play-item");
  playItem.innerHTML = `<i class="bi bi-play-fill"></i>`;
  numSong.appendChild(num);
  numSong.appendChild(playItem);

  //   name song

  let nameSong = document.createElement("p");
  nameSong.classList.add("name-song");
  let nameItem = document.createElement("span");
  nameItem.textContent = `${song.name} - ${song.artist}`;
  nameSong.appendChild(nameItem);

  // audio

  let audio = document.createElement("audio");
  audio.setAttribute("src", `${song.src}`);
  audio.setAttribute("preload", "metadata");
  audio.style.display = "none";

  // duration song

  let durationSong = document.createElement("p");
  durationSong.classList.add("duration-song");
  let duration = document.createElement("span");
  duration.textContent = "";
  durationSong.appendChild(duration);

  //

  audio.addEventListener("loadedmetadata", () => {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    duration.textContent = `${minutes}:${seconds}`;
  });

  // playItem و nameSong
  playItem.addEventListener("click", () => {
    handlePlayPause(audio, playItem, play);
  });

  nameSong.addEventListener("click", () => {
    handlePlayPause(audio, playItem, play);
  });

  //   add elements

  songDetails.appendChild(numSong);
  songDetails.appendChild(nameSong);
  songDetails.appendChild(durationSong);
  songDetails.appendChild(audio);

  //
  songsList.appendChild(songDetails);

  // end item song

  // start popular song

  let mostPopular = document.createElement("div");
  mostPopular.classList.add("most-popular");

  // image popular
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  let img = document.createElement("img");
  img.setAttribute("src", `${song.img}`);
  imgContainer.appendChild(img);

  // song-popular-content

  let songPopularContent = document.createElement("div");
  songPopularContent.classList.add("song-popular-content");

  let playPopular = document.createElement("span");
  playPopular.classList.add("play-popular");
  playPopular.innerHTML = `<i class="bi bi-play-fill"></i>`;

  let nameArtistPopular = document.createElement("div");
  nameArtistPopular.classList.add("name-artist-popular");

  let audioPopular = document.createElement("audio");
  audioPopular.setAttribute("src", `${song.src}`);
  audioPopular.classList.add("audio-popular");

  let namePopular = document.createElement("p");
  namePopular.classList.add("name-popular");
  namePopular.textContent = `${song.name}`;

  let artistPopular = document.createElement("p");
  artistPopular.classList.add("artist-popular");
  artistPopular.textContent = `${song.artist}`;

  nameArtistPopular.appendChild(namePopular);
  nameArtistPopular.appendChild(artistPopular);
  songPopularContent.appendChild(playPopular);
  songPopularContent.appendChild(audioPopular);
  songPopularContent.appendChild(nameArtistPopular);

  // add elements

  mostPopular.appendChild(imgContainer);
  mostPopular.appendChild(songPopularContent);

  mostPopulars.appendChild(mostPopular);

  // end popular song

  playPopular.addEventListener("click", () => {
    handlePlayPause(audioPopular, playPopular, play);
  });
});

// slider
const right = document.querySelector(".right");
const left = document.querySelector(".left");
const scrollAmount = document.querySelector(".most-popular").offsetWidth;

right.addEventListener("click", () => {
  mostPopulars.scrollBy({ left: scrollAmount + 15, behavior: "smooth" });
});

left.addEventListener("click", () => {
  mostPopulars.scrollBy({ left: -(scrollAmount + 15), behavior: "smooth" });
});

play.addEventListener("click", () => {
  if (currentAudio) {
    handlePlayPause(currentAudio, currentPlayIcon, play);
  }
});

next.addEventListener("click", () => {
  if (currentAudio) {
    playNextSong();
  }
});

prev.addEventListener("click", () => {
  if (currentAudio) {
    playPrevSong();
  }
});

function handlePlayPause(audio, playIcon, playButton) {
  // hover remove
  document.querySelectorAll('.song-details').forEach(details => {
    details.classList.remove('hover');
  });

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.loop = false;
    currentPlayIcon.innerHTML = `<i class="bi bi-play-fill"></i>`;
    currentPlayButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }

  if (audio.paused) {
    audio.play();
    audio.loop = isRepeat;
    audio.muted = isMuted;
    playIcon.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    playButton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    // hover add
    const songDetails = audio.closest('.song-details');
    if (songDetails) {
      songDetails.classList.add('hover');
    }
  } else {
    audio.pause();
    playIcon.innerHTML = `<i class="bi bi-play-fill"></i>`;
    playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }

  audio.removeEventListener("timeupdate", () => updateProgress(audio));
  audio.removeEventListener("ended", () => {});

  const updateProgressHandler = () => updateProgress(audio);
  const endedHandler = () => {
    if (!isRepeat) {
      resetPlayPause(playIcon, playButton);
      const songDetails = audio.closest('.song-details');
      if (songDetails) {
        songDetails.classList.remove('hover');
      }
      playNextSong();
    }
  };

  audio.addEventListener("timeupdate", updateProgressHandler);
  audio.addEventListener("ended", endedHandler);

  currentAudio = audio;
  currentPlayIcon = playIcon;
  currentPlayButton = playButton;

  updateDuration(audio);
}

function updateProgress(audio) {
  if (!audio.paused && isFinite(audio.duration)) {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
    currentTime.textContent = `${minutes}:${seconds}`;

    const progressWidth = (audio.currentTime / audio.duration) * 100;
    if (isFinite(progressWidth)) {
      progress.style.width = `${progressWidth}%`;
    }
  }
}

function resetPlayPause(playIcon, playButton) {
  playIcon.innerHTML = `<i class="bi bi-play-fill"></i>`;
  playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
  progress.style.width = "0%";
}

function playNextSong() {
  if (!currentAudio) return;

  if (currentAudio.classList.contains('audio-popular')) {
    // popular songs
    const popularAudios = document.querySelectorAll('.audio-popular');
    const currentIndex = Array.from(popularAudios).indexOf(currentAudio);
    const nextIndex = (currentIndex + 1) % popularAudios.length;
    const nextAudio = popularAudios[nextIndex];
    const nextPlayIcon = nextAudio.parentElement.querySelector('.play-popular');
    
    handlePlayPause(nextAudio, nextPlayIcon, play);
  } else {
    // songDetails
    const songDetailsAudios = document.querySelectorAll('.song-details audio');
    const currentIndex = Array.from(songDetailsAudios).indexOf(currentAudio);
    const nextIndex = (currentIndex + 1) % songDetailsAudios.length;
    const nextAudio = songDetailsAudios[nextIndex];
    const nextPlayIcon = nextAudio.parentElement.querySelector('.play-item');
    
    handlePlayPause(nextAudio, nextPlayIcon, play);
  }
}

function playPrevSong() {
  if (!currentAudio) return;

  if (currentAudio.classList.contains('audio-popular')) {
    // popular songs
    const popularAudios = document.querySelectorAll('.audio-popular');
    const currentIndex = Array.from(popularAudios).indexOf(currentAudio);
    const prevIndex = (currentIndex - 1 + popularAudios.length) % popularAudios.length;
    const prevAudio = popularAudios[prevIndex];
    const prevPlayIcon = prevAudio.parentElement.querySelector('.play-popular');
    
    handlePlayPause(prevAudio, prevPlayIcon, play);
  } else {
    // songDetails
    const songDetailsAudios = document.querySelectorAll('.song-details audio');
    const currentIndex = Array.from(songDetailsAudios).indexOf(currentAudio);
    const prevIndex = (currentIndex - 1 + songDetailsAudios.length) % songDetailsAudios.length;
    const prevAudio = songDetailsAudios[prevIndex];
    const prevPlayIcon = prevAudio.parentElement.querySelector('.play-item');
    
    handlePlayPause(prevAudio, prevPlayIcon, play);
  }
}

function updateDuration(audio) {
  if (audio.readyState > 0) {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = String(Math.floor(audio.duration % 60)).padStart(2, "0");
    durationPlayer.textContent = `${minutes}:${seconds}`;
  } else {
    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = String(Math.floor(audio.duration % 60)).padStart(2, "0");
      durationPlayer.textContent = `${minutes}:${seconds}`;
    });
  }
}
