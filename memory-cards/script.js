const cardsContainer = document.getElementById("cards-container")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const currentEl = document.getElementById("current")
const showBtn = document.getElementById("show")
const hideBtn = document.getElementById("hide")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const addCardBtn = document.getElementById("add-card")
const clearBtn = document.getElementById("clear")
const addContainer = document.getElementById("add-container")

//Keep track of curent card
let currentActiveCard = 0

//Store DOM Cards
const cardsEl = []

//Store Card Data
const cardsData = getCardsData()

// const cardsData = [
//     {
//         question: "What must a variable begin with?",
//         answer: "A letter, $ or _",
//     },
//     {
//         question: "What is a variable?",
//         answer: "Container for a piece of data",
//     },
//     {
//         question: "Example of Case Sensitive Variable",
//         answer: "thisIsAVariable",
//     },
// ]

//Create All Cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}

//Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement("div")
    card.classList.add("card")
    if (index === 0) [card.classList.add("active")]
    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
        </div>
    </div>`

    card.addEventListener("click", () => card.classList.toggle("show-answer"))
    //Add to DOM cards
    cardsEl.push(card)
    cardsContainer.appendChild(card)
    updateCurrentText()
}

//Show No. Of Cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

//Get Cards from Local Storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"))
    return cards === null ? [] : cards
}

createCards()

//Event Listeners
nextBtn.addEventListener("click", () => {
    if (cardsEl.length === 0) return
    cardsEl[currentActiveCard].className = "card left"
    currentActiveCard += 1

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1
    }

    cardsEl[currentActiveCard].className = "card active"
    updateCurrentText()
})

prevBtn.addEventListener("click", () => {
    if (cardsEl.length === 0) return
    cardsEl[currentActiveCard].className = "card right"
    currentActiveCard -= 1

    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }

    cardsEl[currentActiveCard].className = "card active"
    updateCurrentText()
})

showBtn.addEventListener("click", () => addContainer.classList.add("show"))
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"))

addCardBtn.addEventListener("click", () => {
    if (questionEl.value.trim() === "" || answerEl.value.trim() === "") {
        alert("Please Enter both Question and Answer")
        return
    }
    const cardData = {
        question: questionEl.value,
        answer: answerEl.value,
    }

    createCard(cardData, cardsEl.length)
    cardsData.push(cardData)
    questionEl.value = ""
    answerEl.value = ""
    localStorage.setItem("cards", JSON.stringify(cardsData))
    addContainer.classList.remove("show")
})

clearBtn.addEventListener("click", () => {
    localStorage.setItem("cards", "[]")
    cardsContainer.innerHTML = ""
    window.location.reload()
})
