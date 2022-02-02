import { getInfo, userDelete, userUpdate } from './module/fetch.js';

let userArray = [];

async function newStuff() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    userArray = await response.json();
    console.log(userArray)
    userRender(userArray)

}

newStuff();

function userRender(userArray) {
    $('#userTable').html('<tr><th>Name</th><th>Phone No.</th><th>Username</th><th>E-Mail</th><th>Website</th></tr>');
    userArray.forEach(element => {
        const userFrame = document.getElementById('userTable').appendChild(document.createElement('tr'));
        userFrame.innerHTML = `<td>${element.name}</td><td>${element.phone}</td><td>${element.username}</td><td>${element.email}</td><td>${element.website}</td><td><div class='userActions'>
        <div class='addUser'></div>
        <div class='deleteUser'></div>
        <div class='editUser'></div>
        <div class="akis"></div>
        </div></td>`
        userFrame.addEventListener('click', function(e) {
            if ($('.akis').is(e.target)) {
                console.log('akis', element.id);
                $('#popUp').css('display', 'flex');
                $('#popUpInnerContent').html('');
                const userInfo = document.getElementById('popUpInnerContent').appendChild(document.createElement('div'));
                userInfo.className = ('userInfo');
                userInfo.innerHTML = `<div><span class='veryBold'>address : </span>${element.address.city} ${element.address.geo.lat} ${element.address.geo.lng} ${element.address.street} ${element.address.suite} ${element.address.zipcode}</div><div><span class='veryBold'>company name : </span>${element.company.name} <span class='veryBold'> company catch phrase :</span> ${element.company.catchPhrase} <span class='veryBold'> company bs : </span>${element.company.bs}</div><div class='needsBold'>Name :</div><div>${element.name}<div class='needsBold'>Phone No.</div><div>${element.phone}</div><div class='needsBold'>e-mail :</div><div>${element.email}</div><div class='needsBold'>website :</div><div>${element.website}</div>`
            } else if ($('.editUser').is(e.target)) {
                console.log('edit');
                $('#popUp').css('display', 'flex');
                $('#popUpInnerContent').html('');
                let $editOptionLabel = $(`<label for='editSelect'>Select the option to edit : </label>`),
                    editSelector = $(`<select id='editSelect'><option value='name'>Name</option><option value='phone'>Phone No.</option><option value='username'>Username</option><option value='email'>E-mail</option><option value='website'>Website</option>`),
                    editField = $(`<div><input ='text' id='newUserData' placeholder='${element.name}'></div>`),
                    buttons = $(`<div id='editButtons'><button id='okChange'>Accept</button><button id='cancelChange'>Cancel</button></div>`);
                $('#popUpInnerContent').append($editOptionLabel, editSelector, editField, buttons)
                editSelector.on('change', function(e) {
                    let select = document.getElementById('editSelect');
                    let value = select.options[select.selectedIndex].value;
                    let leInput = document.getElementById('newUserData');
                    leInput.placeholder = element[value];
                    leInput.value = ''
                })
                $('#okChange').on('click', function() {
                    let select = document.getElementById('editSelect');
                    let value = select.options[select.selectedIndex].value;
                    let leInput = document.getElementById('newUserData').value;
                    let changeIndex = userArray.map(function(e) { return e.id; }).indexOf(element.id);
                    userArray[changeIndex][value] = leInput;
                    userRender(userArray);
                    userUpdate(element.id, userArray[changeIndex]);
                })
                $('#cancelChange').on('click', function() {
                    let leInput = document.getElementById('newUserData');
                    leInput.value = ''
                })


            } else if ($('.deleteUser').is(e.target)) {
                console.log('delete');
                let removeIndex = userArray.map(function(e) { return e.id; }).indexOf(element.id);
                userDelete(element.id);
                userArray.splice(removeIndex, 1);
                userRender(userArray);
            } else if ($('.addUser').is(e.target)) {
                console.log('add');
                $('#popUp').css('display', 'flex')

            }

        })

    })

}



$('#searchBar').on('input', function() {
    let searchArray = [];
    let content = this.value.toLowerCase();
    for (let index = 0; index < userArray.length; index++) {
        let userName = userArray[index].name.toLowerCase();
        let userPhone = userArray[index].phone.toString();
        let userMail = userArray[index].email.toLowerCase();
        let userUserName = userArray[index].username.toLowerCase();
        let userWebsite = userArray[index].website;
        if (userName.includes(content) || userPhone.includes(content) || userMail.includes(content) || userUserName.includes(content) || userWebsite.includes(content)) {
            searchArray.push(userArray[index])
        }
    }
    userRender(searchArray)
    console.log(searchArray)
})
$(function() {
    $(document).on('click', function(e) {
        if ($('#popUpClose').is(e.target) || $('#popUp').is(e.target)) {
            $('#popUp').css('display', 'none')
        }
    })


})
$