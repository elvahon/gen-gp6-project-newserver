let jsonResponse = [];


// GET CARD ----- [todo] 
async function showCard(){  
    const data = await fetch('http://localhost:8080/todolist')
    jsonResponse = await data.json()
    let displayArea = document.querySelector('#card-fetch-area')
    let displayhtml = ``
    for (let i of jsonResponse){
        displayhtml = displayhtml + `
        <!-- Task Card -->
        <div class="task-card-kit ">
            <div class="clearfix">
                <button type="button " class="status-overlap rounded-pill btn btn-info float-left ">${i.status}</button>
                <button type="button " class="star-overlap btn btn btn-outline-warning float-right "><i class="fas fa-star "></i></button>
            </div>
            <div class="card bg-light mb-3 ">
                <div class="card-body " data-toggle="modal" data-target="#ViewCard1Modal${i.id}">
                    <h5 class="card-title ">${i.name}</h5>
                    <p class="card-text ">${i.description}</p>
                    <p>${i.assignedto}</p>
                    <div class="bg-transparent clearfix ">
                        <button type="button " class="btn btn-light rounded-pill float-left "><i class="fas fa-clock "></i> ${i.duedate}</button>
                        <a class="navbar-user float-right " href="# ">
                            <i class="fas fa-user-circle fa-2x"></i>
                            <i class="fas fa-user-circle fa-2x"></i>
                            <i class="fas fa-user-circle fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>



        <!-- VIEW CARD MODAL -->
        <div class="modal fade" id="ViewCard1Modal${i.id}" tabindex="-1" role="dialog" aria-labelledby="ViewCard1ModalLabel" aria-hidden="true" style="max-width: 100%;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ViewCardModalLabel">View Card</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-left">
                    <form id='ViewCardForm'>
                        <label name='id'>Id: 
                            ${i.id}
                        </label><br>
                        <label name='name'>Name: 
                            ${i.name}
                        </label><br>
                        <label name='description'>Description: 
                            ${i.description}
                        </label><br>
                        <label name='assignedto'>Assigned to: 
                            ${i.assignedto}
                        </label><br>
                        <label name='duedate'>Due date: 
                            ${i.duedate}
                        </label><br>
                        <label name='status'>Status: 
                            ${i.status}
                        </label><br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#EditCard1Modal"><i class="fas fa-edit mr-2"></i>Edit Card</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#DeleteCard1Modal"><i class="fas fa-edit mr-2"></i>Delete Card</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        </div>


       `        
    }
    displayArea.innerHTML = displayhtml;
    console.log('done show card function')

}
showCard();



async function logJson(){ 
    const data = await fetch('http://localhost:8080/todolist')
    jsonResponse = await data.json()
    console.log('with log function')
    console.log(jsonResponse)
    console.log('done log function')
    return jsonResponse;
};

logJson();




//ADD CARD ----- Fetch: POST with JSON format
const fetchAddCardForm = document.querySelector('#fetchAddCardForm')
fetchAddCardForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['id'] = form.fetchId.value;
    formObject['name'] = form.fetchName.value;
    formObject['description'] = form.fetchDescription.value;
    formObject['assignedto'] = form.fetchAssignedto.value;
    formObject['duedate'] = form.fetchDuedate.value;
    formObject['status'] = form.fetchStatus.value;
    const response = await fetch('http://localhost:8080/todolist/', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject),
    })
    let jsonResponse = await response.json();
})




//Edit Card
const saveArea = document.querySelector('#fetchSaveCardForm')
saveArea.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['id'] = form.putId.value;
    formObject['name'] = form.putName.value;
    formObject['description'] = form.putDescription.value;
    formObject['assignedto'] = form.putAssignedto.value;
    formObject['duedate'] = form.putDuedate.value;
    formObject['status'] = form.putStatus.value;
    const response = await fetch(`http://localhost:8080/todolist/${form.putId.value}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formObject),
    })
        let jsonResponse = await response.json();
    })


// Delete Card
const deleteArea = document.querySelector('#deleteButton')
console.log('doc button ok')  


deleteArea.addEventListener('click',  async () => {
console.log('click ok')  

const data = await fetch('http://localhost:8080/todolist')
const jsonResponse = await data.json()

console.log(`http://localhost:8080/todolist/`)  
console.log(`http://localhost:8080/todolist/${jsonResponse}`)  
console.log(`http://localhost:8080/todolist/${jsonResponse[0].id}`)  
    
fetch(`http://localhost:8080/todolist/${jsonResponse[0].id}`, {
    method: 'DELETE',
    headers: {
    "Content-Type": "application/json"
},
})
.then(res => res.text()) 
.then(res => console.log(res))
})


