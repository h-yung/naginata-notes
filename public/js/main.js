const doSomethings = document.querySelectorAll('button[data-action="do-something"]')
doSomethings.forEach(button => button.addEventListener('click', e => showForms(e)))

// go to top
const backToTop = document.querySelector('[data-action="goTop"]')
backToTop.addEventListener('click', scrollToTop)
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

// show only the relevant form
function showForms(event){
    document.querySelectorAll('[data-action-type]').forEach(elem => elem.dataset.actionType === event.target.value ? elem.classList.toggle('hidden') : elem.classList.add('hidden'))
}

// delete req
let deleteButton = document.querySelector('button[data-action="delete"]')
deleteButton.addEventListener('click', deleteThat)

async function deleteThat(){
    try{
        const passcode = prompt('Provide passcode:', '')
        const titleBye = document.querySelector('input[name="titleBye"]').value
        const response = await fetch('/deletePic', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'title': titleBye,
               passcode
            })
        })
        const data = await response.json()
        console.log(`bye ${titleBye}`)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// conditional check on asset link type
const urlTypeCheck = document.querySelector('label[data-type="asset-label"]')
const fieldInput = document.querySelector('#field')
fieldInput.addEventListener('change', showTypeOption)

function showTypeOption(){
    if (fieldInput.value === 'Asset URL'){
        urlTypeCheck.classList.remove('hidden')
    }else if (fieldInput.value !== 'Asset URL'){
        urlTypeCheck.classList.add('hidden')
    }
}

// update/put req
let updateButton = document.querySelector('button[data-action="update"]')
updateButton.addEventListener('click', updateEntry)

async function updateEntry(){
    const passcode = prompt('Provide passcode:', '')
    const titleChange = document.querySelector('input[name="titleChange"]').value
    const edit = document.querySelector('input[name="edit"]').value
    const field = document.querySelector('#field').value
    const urlType = document.querySelector('#video').value
    // console.log(`title is ${titleChange}, the edit is for the ${field} and consists of ${edit}`)
    try{
        const response = await fetch('/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': titleChange,
                field,
                edit,
                urlType,
                passcode
            })
        })
        document.querySelector('input[name="edit"]').value = ""
        location.reload()
    }catch(err){
        console.log(err)
    }
}