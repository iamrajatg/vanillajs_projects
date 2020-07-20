const msgEl = document.getElementById("msg")

const randomNum = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

//Start Recognition and game

recognition.start()

function onSpeak(e) {
    const msg = e.results[0][0].transcript
    writeMessage(msg)
    checkNumber(msg)
}

//Write What User Speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You Said:</div>
    <span class="box">${msg}</span>
    `
}

//Check Message against number
function checkNumber(msg) {
    const num = +msg
    //Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += "<div>This is not a valid number</div>"
        return
    }

    //Check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += "<div>Number must be between 1 and 100</div>"
        return
    }

    //Check Number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats!You Have Guessed<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML += "<div>GO LOWER</div>"
    } else {
        msgEl.innerHTML += "<div>GO HIGHER</div>"
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

//Speech Recognition Result
recognition.addEventListener("result", onSpeak)

//End SR Service
recognition.addEventListener("end", () => recognition.start())

document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") {
        window.location.reload()
    }
})
