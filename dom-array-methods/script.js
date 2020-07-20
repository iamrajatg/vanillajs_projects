const main = document.getElementById('main')
const add_user = document.getElementById('add-user')
const double = document.getElementById('double')
const show_millionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const calculate_wealth = document.getElementById('calculate-wealth')

let data = []
let data_bakcup = []

getRandomUser()
getRandomUser()
getRandomUser()

//fetch random user and add money

async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api')
  let data = await response.json()
  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}

//add new Object to data Array

function addData(user) {
  data.push(user)
  updateDOM()
}

//Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  providedData.forEach((user) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`
    main.appendChild(element)
  })
}

//format money

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//Double Money Using Map

function doubleMoney() {
  data = data.map((user) => {
    return {
      name: user.name,
      money: user.money * 2
    }
  })
  updateDOM()
}

//Sort By Richest
function sortByRichest() {
  data = data.sort((a, b) => {
    return b.money - a.money
  })
  updateDOM()
}

//filer by Millionaires
let filer = true

function filterMill() {
  let filterData = []
  filterData = data.filter((user) => {
    return user.money >= 1000000
  })
  updateDOM(filterData)
}

//Calculate Total Wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => {
    return acc + user.money
  }, 0)

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>TOTAL WEALTH:<strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
}

//Event Listeners

add_user.addEventListener('click', getRandomUser)

double.addEventListener('click', doubleMoney)

sort.addEventListener('click', sortByRichest)

show_millionaires.addEventListener('click', filterMill)

calculate_wealth.addEventListener('click', calculateWealth)
