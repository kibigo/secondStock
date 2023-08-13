const form = document.getElementById('form');
const table = document.getElementById('table');
const addStock = document.getElementById('addStock');
const cancelBtn = document.getElementById('cancel');
const add = document.getElementById('add');

const hideForm = () => {
    form.style.visibility = 'hidden';
}

const openForm = () => {
    form.style.visibility = 'visible';
}


document.addEventListener('DOMContentLoaded', () => {
    hideForm();
})

addStock.addEventListener('click', () => {
    openForm();
})

cancelBtn.addEventListener('click', () => {
    const hideName = document.getElementById('name');
    hideName.value = '';

    const hideQuantity = document.getElementById('quantity');
    hideQuantity.value = '';

    hideForm();
})
//creating a get request 



const getRequest = (material) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${material.id}</td>
        <td>${material.name}</td>
        <td>${material.quantity}</td>
        <td><i class="fa-solid fa-pencil-alt editIcon"></i></td>
        <td><i class="fa-solid fa-trash-alt deleteIcon"></i></td>
    `
    table.appendChild(newRow);

    const editIcon = newRow.querySelector('.editIcon');
    editIcon.addEventListener('click', () => {
        displayToForm(material.id);
    })

    const dltFunc = newRow.querySelector('.deleteIcon');
    dltFunc.addEventListener('click', () => {
        deleteFunc(material.id);
    })

}

const enableGet = () => {
    fetch("http://localhost:3000/material")
    .then(response => response.json())
    .then(data => data.forEach((material) => getRequest(material)))
}
enableGet();

//posting data to json
const postToServer = () => {
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;

    const dataObj = {
        name:name,
        quantity:quantity
    }

    fetch("http://localhost:3000/material", {
        method: 'POST',
        body:JSON.stringify(dataObj),
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(response => response.json())
    .then(data => data)

}



//deleting items

const deleteFunc = (id) => {
    fetch("http://localhost:3000/material" + `/${id}`, {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(response => response.json())
    .then(data => data)
}

//displaying content when the form pops

let newData = null;

const displayToForm = (id) => {
    const fetchName = document.getElementById('name');
    const fetchQuantity = document.getElementById('quantity');

    fetch("http://localhost:3000/material" + `/${id}`)
    .then(response => response.json())
    .then(material => {
        fetchName.value = material.name;
        fetchQuantity.value = material.quantity;
        newData = material;
    })

    openForm();
}

//updating content: form pops with content, make changes, update changes to the server



const updateToServer = (id) => {
    const updateName = document.getElementById('name').value;
    const updateQuantity = document.getElementById('quantity').value;

    fetch("http://localhost:3000/material" + `/${id}`, {
        method:'PUT',
        body:JSON.stringify({
            name:updateName,
            quantity:updateQuantity
        }),
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then(response => response.json())
    .then(newData => newData)
}


const handleSubmit = () => {
    if (newData){
        updateToServer(newData.id);
    }else{
        postToServer();
    }
}

add.addEventListener('click', () => {
    handleSubmit();
})