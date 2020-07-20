const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const movieSelect = document.getElementById("movie")
let ticketPrice = +movieSelect.value
const count = document.getElementById("count")
const total = document.getElementById("total")

//populateUI

function populateUI() {
    const seatsSelected = JSON.parse(localStorage.getItem("selectedSeatsIndex"))
    if (seatsSelected !== null && seatsSelected.length > 0) {
        seatsSelected.forEach(index => {
            seats[index].classList.add("selected")
        })
    }

    const movieIndex = localStorage.getItem("movieIndex")
    if (movieIndex !== null) movieSelect.selectedIndex = movieIndex
    ticketPrice = +movieSelect.value
}

//set Movie Data
function setMoviedata(index, price) {
    localStorage.setItem("movieIndex", index)
    //localStorage.setItem("moviePrice", price)
}
//function to update seats and price as we select seats

function updateSeatsAndPrice() {
    const seatsSelected = document.querySelectorAll(".row .seat.selected")

    const selectedSeatsIndex = [...seatsSelected].map(seat => {
        return [...seats].indexOf(seat)
    })
    localStorage.setItem("selectedSeatsIndex", JSON.stringify(selectedSeatsIndex))
    const seatsCount = seatsSelected.length
    count.innerText = seatsCount
    total.innerText = seatsCount * ticketPrice
}

//Movie Select Event
movieSelect.addEventListener("change", e => {
    setMoviedata(e.target.selectedIndex, e.target.value)
    ticketPrice = +movieSelect.value
    updateSeatsAndPrice()
})

//Seat Choose Event
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")

        updateSeatsAndPrice()
    }
})

populateUI()
updateSeatsAndPrice()
