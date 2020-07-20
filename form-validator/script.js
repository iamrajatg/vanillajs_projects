const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")
const form = document.getElementById("form")

function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = "form-control error"
    const small = formControl.querySelector("small")
    small.innerText = message
}

function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = "form-control success"
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, "This field is required")
        } else {
            showSuccess(input)
        }
    })
}

//Event Listeners
form.addEventListener("submit", function(e) {
    e.preventDefault()
    const inputArr = [username, email, password, password2]
    checkRequired(inputArr)
})
