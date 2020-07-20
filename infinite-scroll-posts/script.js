const postsContainer = document.getElementById("posts-container")
const loading = document.querySelector(".loader")
const filter = document.getElementById("filter")

let limit = 10
let page = 1

//Fetch posts from API
async function getPosts() {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        )

        const data = await res.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

//Show posts in DOM
async function showPosts() {
    try {
        toggleLoading("add")
        const posts = await getPosts()
        toggleLoading("remove")
        posts.forEach((post) => {
            postEl = document.createElement("div")
            postEl.classList.add("post")
            postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p></div>`

            postsContainer.appendChild(postEl)
        })
    } catch (error) {
        console.log(error)
    }
}

//Show loader and fetch more posts
function toggleLoading(addOrRemove) {
    if (addOrRemove === "add") {
        loading.classList.add("show")
    } else if (addOrRemove === "remove") loading.classList.remove("show")
}

//Show initial posts
showPosts()

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    console.log(scrollTop, scrollHeight, clientHeight)
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        loading.classList.add("show")
        page++
        showPosts()
    }
})
