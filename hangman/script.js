const wordEl = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-again")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")

const figureParts = document.querySelectorAll(".figure-part")

const words = ["android", "harrypotter", "crash", "playstation", "yogamat"]

let selectedWord = words[Math.floor(Math.random() * words.length)]

let correctLetters = []
let wrongLetters = []

//Show hidden word
function displayWord() {
    wordEl.innerHTML = selectedWord
        .split("")
        .map(
            (letter) =>
                `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`
        )
        .join("")

    const innerWord = wordEl.innerText.replace(/\n/g, "")

    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You Won!!"
        popup.style.display = "flex"
    }
}

//Update Wrong Letters
function updateWrongLettersElement() {
    if (wrongLetters.length === 0) {
        figureParts.forEach((figure) => (figure.style.display = "none"))
    }
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`

    if (wrongLetters.length > 0) figureParts[wrongLetters.length - 1].style.display = "block"
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "You Lost!!"
        popup.style.display = "flex"
    }
}

//show notification
function showNotification() {
    notification.classList.add("show")
    setTimeout(() => {
        notification.classList.remove("show")
    }, 1000)
}

//keydown letter press

window.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (correctLetters.includes(e.key)) {
            showNotification()
        } else if (selectedWord.includes(e.key)) {
            correctLetters.push(e.key)
            displayWord()
        } else {
            if (!wrongLetters.includes(e.key)) {
                wrongLetters.push(e.key)
                updateWrongLettersElement()
            } else {
                showNotification()
            }
        }
    }
})

displayWord()

//Restart and play again
playAgainBtn.addEventListener("click", () => {
    correctLetters = []
    wrongLetters = []
    selectedWord = words[Math.floor(Math.random() * words.length)]
    displayWord()
    updateWrongLettersElement()
    finalMessage.innerText = ""
    popup.style.display = "none"
})
