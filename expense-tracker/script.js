const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

// const dummyTransactions = [
//     { id: 1, text: "Flower", amount: -20 },
//     { id: 2, text: "Salary", amount: 300 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 150 },
// ]
//const localStorageTransactions =

let transactions = JSON.parse(localStorage.getItem("items")) || []

//Add Transaction
function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter Text and Amount")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }

        transactions.push(transaction)
        localStorage.setItem("items", JSON.stringify(transactions))
        addTransactionDOM(transaction)
        updateValues()
        text.value = ""
        amount.value = ""
    }
}

//Generate Random ID

function generateID() {
    return Math.floor(Math.random() * 100000000)
}

//Add transactions to DOM

function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? "-" : "+"

    const item = document.createElement("li")

    //Add class based on Value
    item.classList.add(sign === "-" ? "minus" : "plus")
    item.innerHTML = `
    ${transaction.text} <span>${sign}$${
        transaction.amount < 0 ? transaction.amount * -1 : transaction.amount
    }</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item)
}

//Init app
function init() {
    list.innerHTML = ""
    transactions.forEach(addTransactionDOM)
    updateValues()
}

//Update balance,income and expense
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount)

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2)

    const income = amounts
        .reduce((acc, item) => {
            if (item > 0) return acc + item
            else return acc
        }, 0)
        .toFixed(2)

    const expense = amounts
        .reduce((acc, item) => {
            if (item < 0) return acc - item
            else return acc
        }, 0)
        .toFixed(2)

    balance.innerText = `$${total}`
    money_plus.innerText = `+$${income}`
    money_minus.innerText = `-$${expense}`
}

//Remove Transaction

function removeTransaction(transactionId) {
    transactions = transactions.filter((transaction) => transaction.id !== transactionId)
    localStorage.setItem("items", JSON.stringify(transactions))
    init()
}

form.addEventListener("submit", addTransaction)

init()
