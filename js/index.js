const gitapi = {
    url: "https://api.github.com/"
}

window.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form')
    form.addEventListener('submit', input)
})

const getGit = (user) => {
    fetch(`${gitapi.url}search/users?q=${user}`)
        .then(git => git.json())
        .then(displayUser)
}

const input = () => {
    event.preventDefault()
    const user = document.querySelector('input').value
    getGit(user)
}

const displayUser = (git) => {
    console.log(git)
    const userInfo = document.querySelector('ul[id="user-list"]')
    const repoAPI = git.items[0].repos_url
    userInfo.innerHTML = `<img src="${git.items[0].avatar_url}"/> <br>
                            <a href="#" id="repo">${git.items[0].login}</a> <br>
                            <a href="${git.items[0].html_url}">GitHub URL</a>`;
    showRepos(repoAPI)
}

const showRepos = (repoAPI) => {
    const reposList = document.querySelector('ul[id="repos-list"]')
    const repoLink = document.getElementById('repo')
    repoLink.addEventListener('click', () => {
        fetch(repoAPI)
            .then(repo => repo.json())
            .then(data => {
                data.forEach(repo => {
                    reposList.innerHTML += `<li>${repo.name}</li>`
                })
            })
    })
}