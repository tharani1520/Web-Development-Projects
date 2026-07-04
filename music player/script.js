// Write your javascript here

    tracks = [
        {
            name: "Let me down slowly",
            artist: "Alec Benjamin",
            cover: "alec.jpg",
            source: "Let me down slowly.mp3",
        },
        {
            name: "Let me love you",
            artist: "DJ Snake/Justin Beiber",
            cover: "dj.jpg",
            source: "Let me love you.mp3",
        },
        {
            name: "Perfect",
            artist: "Ed Sheeran",
            cover: "ed.jpg",
            source: "Perfect.mp3",
        },
        
    ];


const img = document.querySelector(".img");
const title = document.querySelector(".audio-title");
const singer = document.querySelector(".audio-singer");

const platBtn = document.querySelector(".play")
const playIcon =platBtn.querySelector("i");

const nextBtn = document.querySelector(".skip-forward")
const prevBtn = document.querySelector(".skip-back")

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const progressHead = document.querySelector(".progress-head");

const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");

const audio = new Audio();

let currentTrack = 0;
let isPlaying = false;

function loadTrack(index){
    title.textContent = tracks[index].name;
    singer.textContent = tracks[index].artist;
    img.src = tracks[index].cover;
    audio.src = tracks[index].source
}

loadTrack(currentTrack);

platBtn.addEventListener("click",()=>{
    if(isPlaying) pauseSong();
    else playSong();
})

function playSong(){
    audio.play();
    isPlaying = true;
    playIcon.classList.remove("fa-play")
    playIcon.classList.add("fa-pause")
}
function pauseSong(){
    audio.pause()
    isPlaying=false;
    playIcon.classList.add("fa-play")
    playIcon.classList.remove("fa-pause")
}

nextBtn.addEventListener("click",()=>{
    currentTrack++;
    if(currentTrack==tracks.length) currentTrack=0;
    loadTrack(currentTrack);
    playSong();
})
prevBtn.addEventListener("click",()=>{
    currentTrack--;
    if(currentTrack<0) currentTrack=tracks.length-1;
    loadTrack(currentTrack)
    playSong()
})

audio.addEventListener("timeupdate",()=>{
    const progressTime = (audio.currentTime/audio.duration)*100;
    progressBar.style.width = progressTime + "%"
    progressHead.style.left = progressTime + "%"
    currentTime.innerHTML = formatTime(audio.currentTime);
    duration.innerHTML = formatTime(audio.duration);
})

function formatTime(time){
    if(isNaN(time)) return "0:00";
    let min = Math.floor(time/60)
    let sec = Math.floor(time%60)
    if(sec<10) sec = "0" + sec
    return min + ":" + sec
}
progress.addEventListener("click",(e)=>{
    const width = progress.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX/width)*audio.duration;
})

audio.addEventListener("ended",()=>{
    currentTrack++
    if(currentTrack==tracks.length) currentTrack=0;
    loadTrack(currentTrack)
    playSong()
})