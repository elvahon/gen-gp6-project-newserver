
const cardList = document.querySelector('.task-card-kit');
const addCardForm = document.querySelector('#addCard');
const nameValue = document.querySelector('#taskcard-name');
const descriptionValue = document.querySelector('#taskcard-description');
const assignedtoValue = document.querySelector('#assignedtoValue');
const duedateValue = document.querySelector('#example-date-input');
const statusValue = document.querySelector('#statusValue');
const idValue = document.querySelector('#id-value');

let output = '';

const renderCards = (cards) => {
    cards.forEach(card => {
        output += `
        <div class="task-card-kit ">
        <div class="clearfix">
            <button type="button " class="status-overlap rounded-pill btn btn-info float-left ">${card.status}</button>
            <button type="button " class="star-overlap btn btn btn-outline-warning float-right "><i class="fas fa-star "></i></button>
        </div>

        <div class="card bg-light mb-3 ">
            <div class="card-body " data-toggle="modal" data-target="#ViewCard1Modal" data-id=${card.id}>
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>

                <div class="bg-transparent clearfix ">
                    <button type="button " class="btn btn-light rounded-pill float-left "><i class="fas fa-clock "></i>${card.duedate}</button>
                    <p class="memberContent">${card.assignedto}</p>
                    
                    
                </div>
                <a href="#" class="card-link" id='edit-card'>Edit</a>
                <a href="#" class="card-link" id='delete-card'>Delete</a>
            </div>

        </div>

    </div>
    `;

    })
    cardList.innerHTML = cardList + output;
}

function edit(index) {
    console.log(data[index])
}

const url = 'http://localhost:8080/todolist';

//Get - Read the posts
// Method : GET

/*
fetch(url)
    .then(res => res.json())
    .then(data => renderCards(data))
*/

let data = []

async function init() {
    const res = await fetch(url)
    data = await res.json()
    renderCards(data)
}

window.onload = () => {
    init()
}





cardList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-card';
    let editButtonIsPressed = e.target.id == 'edit-card';

    let id = e.target.parentElement.dataset.id;

    // delete
    if (delButtonIsPressed) {
        fetch(`${url}/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(() => location.reload())
    }


});

