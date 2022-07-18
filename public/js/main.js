const doSomethings = document.querySelectorAll('button[data-action="do-something"]')
doSomethings.forEach(button => button.addEventListener('click', e => showForms(e)))

// go to top
const backToTop = document.querySelector('[data-action="goTopShowAll"]')
backToTop.addEventListener('click', () => {scrollToTop(); window.location.assign(`/`)})
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

// filtering
const tags = document.querySelectorAll('[data-tag]').forEach(elem => elem.addEventListener('click', e => filterByTag(e)))

function filterByTag(e){
    const tag = e.target.textContent.toLowerCase();
    try {
        /*Whenever a new value is assigned to the location object, 
        a document will be loaded using the URL 
        as if location.assign() had been called with the modified URL. */
        window.location.assign(`/tags/${tag}`)
    }catch(err){
        console.log(err)
    }
}

// search title strings
// this would be more efficient with React... 
// doing on change (here, 'input') server side is too costly. So this happens on Enter key
const search = document.querySelector('#search')
search.addEventListener('change', activateSearch)

async function activateSearch(){
    const searchTerm = search.value;
    try {
        console.log('Continue here line 35')
        window.location.assign(`/search?term=${searchTerm}`)
        // send word to backend, find by fragment in title on Mongo.
    }
    catch(err){
        console.log(err)
    }
}


// show only the relevant form
function showForms(event){
    document.querySelectorAll('[data-action-type]').forEach(elem => elem.dataset.actionType === event.target.value ? elem.classList.toggle('hidden') : elem.classList.add('hidden'))
    scrollToTop();
}

// delete req
let deleteButtons = document.querySelectorAll('button[data-action="delete"]')
deleteButtons.forEach(button => button.addEventListener('click', e=> deleteThat(e)))

async function deleteThat(e){
    try{
        const titleBye = e.target.parentElement.parentElement.querySelector('h3').textContent
        const passcode = prompt(`Are you sure you want to delete ${titleBye}? Provide passcode:`, '')
        const response = await fetch('/deletePic', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'title': titleBye,
               passcode
            })
        })
        const data = await response.json()
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
// the buttons that make the form
let startUpdateButtons = document.querySelectorAll('button[data-detail="update-entry"]')
startUpdateButtons.forEach(button => button.addEventListener('click', e => startUpdate(e)))

// the do-Somethings function handles the appearance of the form and fires first
// although probably that handler no longer does much good since weird behavior happening with toggle
function startUpdate(e){
    const titleChange = e.target.parentElement.parentElement.querySelector('h3').textContent
    // double parentElement is owing to the .button-box added for styling
    document.querySelector('span[data-type="entry-update"]').textContent = titleChange
    // console.log(titleChange + "1")
}

// the form button that actually updates
const updateButton = document.querySelector('button[data-action="update"]')
updateButton.addEventListener('click', updateEntry)

async function updateEntry(){
    const title = document.querySelector('span[data-type="entry-update"]').textContent
    // there must be a more elegant way to pass state, but this isn't a React app...yet
    // console.log(title + "2")
    const passcode = prompt('Provide passcode:', '')
    
    const edit = document.querySelector('input[name="edit"]').value
    const field = document.querySelector('#field').value
    const urlType = document.querySelector('#video').value
    // console.log(`title is ${titleChange}, the edit is for the ${field} and consists of ${edit}`)
    try{
        const response = await fetch('/update', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': title,
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