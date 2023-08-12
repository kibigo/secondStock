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
    hideForm();
})
//creating a get request 



const getRequest = (material) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${material.id}</td>
        <td>${material.name}</td>
        <td>${material.quantity}</td>
        <td><i class="fa-solid fa-pencil"></i></td>
        <td><i class="fa-solid fa-trash-alt deleteIcon"></i></td>
    `
    table.appendChild(newRow);
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

add.addEventListener('click', () => {
    postToServer();
})

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