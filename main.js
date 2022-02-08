const audio = document.querySelector('audio');
const playBtn = document.querySelector('.btn-play');
const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const songArtist = document.querySelector('.song-artist');
const song = document.querySelector('.song');
const album = document.querySelector('.album');
const background = document.querySelector('.background');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector('.bar');
const audioCurrentTime = document.querySelector('.currentTime');
const audioDurationTime = document.querySelector('.duration');

// Массивы

const songs = ["Don't Hurt Yourself", "Don't Start Now", '7 Rings'];
const artists = ['Beyonce', 'Dua Lipa', 'Ariana Grande'];

// Песня по умолчанию

let songIndex = 0;

const init = (name) => {
    song.innerHTML = name;
    audio.src = `assets/audio/${name}.mp3`;
    album.src = `assets/img/cover${songIndex + 1}.png`;
    background.src = `assets/background/cover${songIndex + 1}.png`;
    songArtist.innerHTML = artists[songIndex];
}

init(songs[songIndex]);

// Play 

const playAudio = () => {
    // audio.currentTime = 0;
    audio.play();
}

const pauseAudio = () => {
    audio.pause();
}

const itemStatus = () => {
    playBtn.classList.toggle('active');
}

let isPlay = false;

const player = () => {
    if(isPlay == false) {
        playAudio();
        itemStatus();
        isPlay = true;
    } else {
        itemStatus();
        pauseAudio();
        isPlay = false;
    };
};

playBtn.addEventListener('click', player);

// Forward

const start = () => {
    audio.currentTime = 0;
    audio.play();
}

const forward = () => {
    if (isPlay == true){
        start();
        isPlay = true;
    } else {
        start();
        itemStatus();
        isPlay = true;
    }
}

// Next

const next = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    init(songs[songIndex]);
    forward();
}

nextBtn.addEventListener('click', next);

// Back

const back = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    init(songs[songIndex]);
    forward();
}

backBtn.addEventListener('click', back);

// Autoplay

audio.addEventListener('ended', next);

// Progress bar

audio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressPercent = (currentTime / duration) * 100 ;
    progressBar.style.width = `${progressPercent}%`;

    // update total time

    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            }
        audioDurationTime.innerText = `${totalMin}:${totalSec}`;
    })

    // update current time 

    let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        audioCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

// Click on the progress bar

const setProgress = (e) => {
    let progressWidth = bar.clientWidth;
    let clickX = e.offsetX;
    let songDuration = audio.duration;

    audio.currentTime = (clickX / progressWidth) * songDuration;
}

bar.addEventListener('click', setProgress);



console.log('Вёрстка +10\nКнопка Play/Pause +10\nКнопки next/back +10\nМеняется изображение - обложка аудиотрека +10\nПрогресс-бар отображает прогресс проигрывания текущего аудиотрека +5\nОтображается продолжительность аудиотрека и его текущее время проигрывания +10\nСобственное оригинальное оформление +5\nИтого: 60');