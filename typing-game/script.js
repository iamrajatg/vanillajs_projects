const word = document.getElementById("word")
const text = document.getElementById("text")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const endgameEl = document.getElementById("end-game-container")
const settingsBtn = document.getElementById("settings-btn")
const settings = document.getElementById("settings")
const settingsForm = document.getElementById("settings-form")
const difficultySelect = document.getElementById("difficulty")

//List of words for game
const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
]

//Init Word
let randomWord

//Init Score
let score = 0

//Init Time
let time = 10

//Focus on input text
text.focus()

//Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

//Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
    scoreEl.innerText = score
    timeEl.innerText = time
}

addWordToDOM()

//Event Listeners
text.addEventListener("input", (e) => {
    const insertedText = e.target.value
    if (insertedText === randomWord) {
        text.value = ""
        score++

        if (difficultySelect.value === "easy") {
            time += 5
        } else if (difficultySelect.value === "medium") {
            time += 3
        } else if (difficultySelect.value === "hard") {
            time += 2
        }
        addWordToDOM()
    }
})

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>FINAL SCORE - ${score}</p>
    <button onclick="location.reload()">PLAY AGAIN</button>
    `
    endgameEl.style.display = "flex"
}

const timeInterval = setInterval(() => {
    time--
    timeEl.innerText = time
    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}, 1000)

//Settings button click

settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide")
})
