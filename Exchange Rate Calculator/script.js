const currencyEl_one = document.getElementById("currency-one")
const currencyEl_two = document.getElementById("currency-two")
const amountEl_one = document.getElementById("amount_one")
const amountEl_two = document.getElementById("amount_two")

const rateEl = document.getElementById("rate")
const swap = document.getElementById("swap")

//Fetch Exchange Rate and update the DOM
function calculate(e) {
    const base = currencyEl_one.value
    const target = currencyEl_two.value

    const url = "https://api.exchangerate-api.com/v4/latest/" + base
    fetch(url).then(res =>
        res.json().then(data => {
            const rate = data.rates[target]
            rateEl.innerText = rate
            if (e.target === amountEl_two)
                amountEl_one.value = (amountEl_two.value / rate).toFixed(2)
            else amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
        })
    )
}

function swapCurrencies() {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = temp
    calculate()
}

calculate()

//Event Listeners

currencyEl_one.addEventListener("change", calculate)
currencyEl_two.addEventListener("change", calculate)
amountEl_one.addEventListener("input", calculate)
amountEl_two.addEventListener("input", calculate)
swap.addEventListener("click", swapCurrencies)
