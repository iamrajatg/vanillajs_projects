const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const cover = document.getElementById("cover")

//Song Titles
const songs = ["hey", "summer", "ukulele"]

//Keep track of song
let songIndex = 2

//Initially load song details into DOM
loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

//Play Song
function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
    audio.play()
}

//Pause Song
function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    audio.pause()
}

//Play Next Song
function nextSong() {
    if (songIndex === songs.length - 1) {
        songIndex = 0
    } else {
        songIndex++
    }
    loadSong(songs[songIndex])
    playSong()
}

//Play Previous Song
function prevSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }
    loadSong(songs[songIndex])
    playSong()
}

//Update Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement

    const prog = (currentTime / duration) * 100

    progress.style.width = prog + "%"

    if (currentTime === duration) {
        nextSong()
    }
}

//Seek Song
function seekSong(e) {
    const width = this.clientWidth
    const clickX = e.offsetX

    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

//Event Listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play")

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change Song
nextBtn.addEventListener("click", nextSong)
prevBtn.addEventListener("click", prevSong)

//Time/song update
audio.addEventListener("timeupdate", updateProgress)

//Seek Song
progressContainer.addEventListener("click", seekSong)
