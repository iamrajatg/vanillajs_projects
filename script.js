const grid = document.getElementById("grid")

function checkMobileDevice() {
    return "ontouchstart" in document.documentElement
}

if (checkMobileDevice()) {
    document.body.classList.add("touch")
    document.body.classList.remove("notouch")
} else {
    document.body.classList.add("notouch")
    document.body.classList.remove("touch")
}

const projects = [
    "breakout-game",
    "Custom Video Player",
    "dom-array-methods",
    "Exchange Rate Calculator",
    "expense-tracker",
    "form-validator",
    "hangman",
    "infinite-scroll-posts",
    "lyrics-search",
    "meal-finder",
    "memory-cards",
    "Menu Slider and Modal",
    "Movie Seat Booking",
    "music-player",
    "new-year-countdown",
    "relaxer-app",
    "sortable-list",
    "speak-number-guesser",
    "speech-text-reader",
    "typing-game",
]

projects.map((project) => {
    const projectEl = `
    <div class="thumbnail">
    <img src="img/${project}.png" alt="${project.toUpperCase()}"/>
    <a href="${project}/"><div class="name">
    <h3>${project.toUpperCase()}</h3>
    </div></a>
    </div>
    `
    grid.innerHTML += projectEl
})
