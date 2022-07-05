
let homepageTitle = document.querySelector('h1')
homepageTitle.addEventListener('click', turnRed)

function turnRed(){
    document.querySelectorAll('button').forEach(button => button.style.backgroundColor = "gold")
}

function hideEmpty(){
    document.querySelectorAll('iframe')
}

let deleteButton = document.querySelector('button[data-action="delete"]')
deleteButton.addEventListener('click', deleteThat)

async function deleteThat(){
    try{
        const titleBye = document.querySelector('input[name="titleBye"]').value
        const response = await fetch('/deletePic', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'title': titleBye
            })
        })
        const data = await response.json()
        console.log(`bye ${titleBye}`)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

let updateButton = document.querySelector('button[data-action="update"]')
updateButton.addEventListener('click', updateEntry)

async function updateEntry(){
    const titleChange = document.querySelector('input[name="titleChange"]').value
    const edit = document.querySelector('input[name="edit"]').value
    const field = document.querySelector('#field').value

    const urlType = document.querySelector('#video').value

    console.log(`urlType should say if checked:${urlType}`)
    console.log(`title is ${titleChange}, the edit is for the ${field} and consists of ${edit}`)
    try{
        const response = await fetch('/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': titleChange,
                field,
                edit,
                urlType
            })
        })
        document.querySelector('input[name="edit"]').value = ""
        location.reload()
    }catch(err){
        console.log(err)
    }
}