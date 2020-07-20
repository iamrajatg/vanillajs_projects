const container = document.getElementById("container")
const text = document.getElementById("text")

const totalTime = 7500
const breatheTime = (totalTime / 5) * 2

const holdTime = totalTime / 5

function breathAnimation() {
    text.innerText = "Breathe In!"
    container.classList.add("grow")
    setTimeout(() => {
        //container.classList.remove("grow")
        text.innerText = "Hold"
        setTimeout(() => {
            text.innerText = "Breathe Out!"
            container.classList.remove("grow")
            container.classList.add("shrink")
            setTimeout(() => {
                container.classList.remove("shrink")
            }, breatheTime)
        }, holdTime)
    }, breatheTime)
}
breathAnimation()
setInterval(breathAnimation, totalTime)
