const form = document.getElementById("form")
const search = document.getElementById("search")
const result = document.getElementById("result")
const more = document.getElementById("more")

const apiURL = "https://api.lyrics.ovh"

//Search by song or artist
async function searchSongs(term) {
    try {
        const response = await fetch(`${apiURL}/suggest/${term}`)
        const data = await response.json()
        search.value = ""
        showData(data)
    } catch (e) {
        console.log(e)
    }
}

//Show song and artist in DOM
function showData(data) {
    // let output = ""
    // data.data.forEach((song) => {
    //     output += `
    // <li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
    // <button class="btn" data-artist="${song.artist.name}"
    // data-songtitle="${song.title}">Get Lyrics</button></li>
    //     `
    // })

    // result.innerHTML = `
    // <ul class="songs">
    // ${output}
    // </ul>`

    result.innerHTML = `
    <ul class="songs">
    ${data.data
        .map(
            (song) => `
    <li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}"
        data-songtitle="${song.title}">Get Lyrics</button></li>`
        )
        .join("")}</ul>`

    if (data.prev || data.next) {
        more.innerHTML = `
            ${
                data.prev
                    ? `<button class="btn"
            onclick="getMoreSongs('${data.prev}')">Prev</button>`
                    : ""
            }
            ${
                data.next
                    ? `<button class="btn"  onclick="getMoreSongs('${data.next}')">Next</button>`
                    : ""
            }`
    } else {
        more.innerHTML = ""
    }
}

//Get Prev and Next Songs
async function getMoreSongs(url) {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        const data = await response.json()
        showData(data)
    } catch (e) {
        console.log(e)
    }
}

//Get Lyrics for Song
async function getLyrics(artist, songTitle) {
    try {
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
        const data = await response.json()
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>")
        result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>`
        more.innerHTML = ""
    } catch (e) {
        console.log(e)
    }
}

//Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value.trim()
    if (!searchTerm) {
        alert("Please type a search term")
    } else {
        searchSongs(searchTerm)
    }
})

//Get Lyrics button click
result.addEventListener("click", (e) => {
    const clickedEl = e.target
    if (clickedEl.tagName === "BUTTON") {
        const artist = clickedEl.getAttribute("data-artist")
        const songTitle = clickedEl.getAttribute("data-songtitle")
        getLyrics(artist, songTitle)
    }
})