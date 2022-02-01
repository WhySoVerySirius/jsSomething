import { getInfo } from './module/fetch.js';

// let userArray = [];

function userRender(userArray) {
    $('#userTable').html('<tr><th>Name</th><th>Phone No.</th><th>Username</th><th>E-Mail</th><th>Website</th></tr>');
    userArray.forEach(element => {
        const userFrame = document.getElementById('userTable').appendChild(document.createElement('tr'));
        userFrame.innerHTML = `<td>${element.name}</td><td>${element.phone}</td><td>${element.username}</td><td>${element.email}</td><td>${element.website}</td>`
    })

}
getInfo()
    .then(data => userRender(data))
    .catch(err => console.log(err))

function meh() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                console.log(element)
            });
        })

}
meh()