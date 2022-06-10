
let homepageTitle = document.querySelector('h1')

homepageTitle.addEventListener('click', turnRed)

function turnRed(){
    document.querySelectorAll('button').forEach(button => button.style.backgroundColor = "gold")
}