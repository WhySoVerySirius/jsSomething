import { getInfo, userPost, userDelete, userUpdate, getUserInfo } from "./module/fetch.js";
// --------------------------- The main Render---------------------------------
function render(array) {
    $('#userTable').html('<tr><th>Name</th><th>Phone No.</th><th>Username</th><th>E-Mail</th><th>Website</th></tr>');
    array.forEach(element => {
        let $name = document.createElement('td'),
            username = document.createElement('td'),
            email = document.createElement('td'),
            website = document.createElement('td'),
            phone = document.createElement('td'),
            userActions = document.createElement('td'),
            userRow = document.createElement('tr'),
            editUser = document.createElement('div'),
            inspectUser = document.createElement('div'),
            deleteUser = document.createElement('div');
        $name.innerHTML = element.name;
        username.innerHTML = element.username;
        email.innerHTML = element.email;
        website.innerHTML = element.website;
        phone.innerHTML = element.phone;
        editUser.className = 'editUser';
        inspectUser.className = 'akis';
        deleteUser.className = 'deleteUser'
        userActions.className = 'userActions';
        inspectUser.addEventListener('click', function() {
            actionRender('inspect', element.id);
        });
        deleteUser.addEventListener('click', function() {
            actionRender('remove', element.id);
        });
        editUser.addEventListener('click', function() {
            actionRender('edit', element.id);
        });
        userActions.append(editUser, inspectUser, deleteUser);
        userRow.append($name, phone, username, email, website, userActions);
        $('#userTable').append(userRow);
    });

}

function inspectRender(object) {
    $('#popUp').css('display', 'flex');

}

async function actionRender(type, id) {
    switch (type) {
        case 'edit':

            break;
        case 'remove':
            try {
                let userArray = await getInfo();
                userArray.splice((id - 1), 1);
                userDelete(id);
                render(userArray);
            } catch (error) {
                alert('error :' + error)
            }

            break;
        case 'inspect':
            try {
                let theTarget = await getUserInfo(id);
                inspectRender(theTarget);
            } catch (error) {
                alert('error :' + error)
            }
            break;
        case 'add':

            break;
        default:
            let allUsers = await getInfo();
            render(allUsers);
            break;
    }
}
$(function() {
    actionRender();
    $('#popUp').on('click', function(e) {
        if ($('#popUp').is(e.target) || $('#popUpClose').is(e.target)) {
            $('#popUp').toggle()
        }
        console.log('click')
    })
})