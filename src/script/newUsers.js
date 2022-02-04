import { getInfo, userPost, userDelete, userUpdate, getUserInfo } from "./module/fetch.js";
// -------------------------------------------------------------------------------------------------------
// --------------------------------------- The main Render-------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
function render(array) {
    $('#userTable').html(`<tr><th>Name</th><th>Phone No.</th><th>Username</th><th>E-Mail</th><th>Website</th></tr>`);
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
            actionControll('inspect', element.id);
        });
        deleteUser.addEventListener('click', function() {
            actionControll('remove', element.id);
        });
        editUser.addEventListener('click', function() {
            actionControll('edit', element.id);
        });
        userActions.append(editUser, inspectUser, deleteUser);
        userRow.append($name, phone, username, email, website, userActions);
        $('#userTable').append(userRow);
    });

}
// -----------------------------------------------------------------------------------------------
// ------------------------ Inspect Render---------------------------------------------------------
// -------------------------------------------------------------------------------------------------
function inspectRender(object) {
    $('#popUpInnerContent').html('');
    for (const [key, value] of Object.entries(object)) {
        let $userKey = document.createElement('h2'),
            userKeyValue = document.createElement('p'),
            userKeyContainer = document.createElement('div');
        $userKey.innerHTML = key;
        $userKey.className = 'keyValues';
        // ----------------------------------------------------------
        //-------------------------- Check for nest ------------------
        // ------------------------------------------------------------
        if (typeof value == 'object') {
            let newObject = object[key];
            userKeyContainer.append($userKey);
            for (const [keyInner, valueInner] of Object.entries(newObject)) {
                let $nestedUserKeyValue = document.createElement('p'),
                    nestedUserKey = document.createElement('h3'),
                    nestedContainer = document.createElement('div');
                $nestedUserKeyValue.innerHTML = valueInner;
                nestedUserKey.innerHTML = keyInner + ' : ';
                nestedContainer.className = 'nestedContainer';
                userKeyContainer.className = 'nestedKeyContainer';
                nestedContainer.append(nestedUserKey, $nestedUserKeyValue);
                userKeyContainer.append(nestedContainer)
            }
        } else {
            userKeyValue.innerHTML = value;
            userKeyContainer.className = 'keyContainer';
            userKeyContainer.append($userKey, userKeyValue);
        }
        $('#popUpInnerContent').append(userKeyContainer);
    }
    $('#popUp').css('display', 'flex');
}
// ------------------------------------------------------------------------------------------------------
// ------------------------ Delete render-----------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
async function deleteThisUser(id) {
    let deleteCheck = confirm('Do you wish to delete this user')
    switch (deleteCheck) {
        case true:
            try {
                let userArray = await getInfo();
                userArray.splice((id - 1), 1);
                userDelete(id);
                render(userArray);
                break;
            } catch (error) {
                alert('Error (Delete render) :' + error)
            }
    }
}
// -----------------------------------------------------------------------------------------------------------
// --------------------------- Edit render --------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
async function userEdit(id) {
    try {
        let userToEdit = await getUserInfo(id);
        $('#popUpInnerContent').html('');
        let userToReturn = await {...userToEdit };
        let $confirmButton = document.createElement('button'),
            cancelButton = document.createElement('button'),
            buttonContainer = document.createElement('div');
        // -------------------------------------------------------
        // ------------------------ Edit buttons-------------------
        // ---------------------------------------------------------
        $confirmButton.innerHTML = 'Apply changes';
        cancelButton.innerHTML = 'Cancel';
        buttonContainer.className = 'editButtonsContainer';
        $confirmButton.addEventListener('click', function() {
            try {
                userUpdate(id, userToReturn);
                $('#popUp').toggle();
                actionControll();
            } catch (error) {
                alert('User patch fail : ' + error)
            }
        })
        cancelButton.addEventListener('click', function() {
                try {
                    userEdit(id);
                } catch (error) {
                    alert('User patch cancel failed : ' + error)
                }
            })
            // ------------------------------------------------------
            // ----------------------- Edit loop ---------------------
            // --------------------------------------------------------
        for (const [key, value] of Object.entries(userToEdit)) {
            let $userKey = document.createElement('h2'),
                userKeyValue = document.createElement('input'),
                userKeyContainer = document.createElement('div');
            $userKey.innerHTML = key;
            $userKey.className = 'keyValues';
            userKeyValue.value = value;
            userKeyValue.addEventListener('input', function() {
                    let newValue = this.value;
                    userToReturn[key] = newValue;
                })
                // ----------------------------------------------------------
                //-------------------------- Check for nest ------------------
                // ------------------------------------------------------------
            if (typeof value == 'object') {
                let newObject = userToEdit[key];
                userKeyContainer.append($userKey);
                for (const [keyInner, valueInner] of Object.entries(newObject)) {
                    let $nestedUserKeyValue = document.createElement('input'),
                        nestedUserKey = document.createElement('h3'),
                        nestedContainer = document.createElement('div');
                    $nestedUserKeyValue.value = valueInner;
                    nestedUserKey.innerHTML = keyInner + ' : ';
                    nestedContainer.className = 'nestedContainer';
                    userKeyContainer.className = 'nestedKeyContainer';
                    $nestedUserKeyValue.addEventListener('input', function() {
                        let newValue = this.value;
                        userToReturn[key][keyInner] = newValue;
                    })
                    nestedContainer.append(nestedUserKey, $nestedUserKeyValue);
                    userKeyContainer.append(nestedContainer)
                }
            } else {
                userKeyContainer.className = 'keyContainer';
                userKeyContainer.append($userKey, userKeyValue);
            }
            $('#popUpInnerContent').append(userKeyContainer);
        }
        buttonContainer.append($confirmButton, cancelButton);
        $('#popUpInnerContent').append(buttonContainer)
        $('#popUp').css('display', 'flex');
        // console.log(userToEdit);
        // const flatUserObject = (ob) => {
        //     let result = {};
        //     for (const i in ob) {
        //         if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
        //             const temp = flatUserObject(ob[i]);
        //             for (const j in temp) {
        //                 result[i + '.' + j] = temp[j];
        //             }
        //         } else {
        //             result[i] = ob[i];
        //         }
        //     }
        //     return result;
        // };
        // let flatUser = flatUserObject(userToEdit);
        // console.log(flatUser);
    } catch (error) {
        alert('Error (User edit render) : ' + error)
    }
}
// ---------------------------------------------------------------------------------------------------------
// --------------------------------------------------- User Add ---------------------------------------------
// -----------------------------------------------------------------------------------------------------------
async function userAdd() {
    try {
        let existingUser = await getUserInfo(1);
        $('#popUpInnerContent').html('');
        let userToReturn = await {...existingUser };
        let $confirmButton = document.createElement('button'),
            cancelButton = document.createElement('button'),
            buttonContainer = document.createElement('div');
        // -------------------------------------------------------
        // ------------------------ Edit buttons-------------------
        // ---------------------------------------------------------
        $confirmButton.innerHTML = 'Apply changes';
        cancelButton.innerHTML = 'Cancel';
        buttonContainer.className = 'editButtonsContainer';
        $confirmButton.addEventListener('click', function() {
            try {
                userPost(userToReturn);
                $('#popUp').toggle();
                actionControll();
            } catch (error) {
                alert('User add confirm fail : ' + error)
            }
        })
        cancelButton.addEventListener('click', function() {
                try {
                    userAdd();
                } catch (error) {
                    alert('User add cancel failed : ' + error)
                }
            })
            // ------------------------------------------------------
            // ----------------------- Edit loop ---------------------
            // --------------------------------------------------------
        for (const [key, value] of Object.entries(existingUser)) {
            let $userKey = document.createElement('h2'),
                userKeyValue = document.createElement('input'),
                userKeyContainer = document.createElement('div');
            $userKey.innerHTML = key;
            $userKey.className = 'keyValues';
            userKeyValue.placeholder = key;
            userKeyValue.required = true;
            userKeyValue.addEventListener('input', function() {
                    let newValue = this.value;
                    userToReturn[key] = newValue;
                })
                // ----------------------------------------------------------
                //-------------------------- Check for nest ------------------
                // ------------------------------------------------------------
            if (typeof value == 'object') {
                let newObject = existingUser[key];
                userKeyContainer.append($userKey);
                for (const [keyInner, valueInner] of Object.entries(newObject)) {
                    let $nestedUserKeyValue = document.createElement('input'),
                        nestedUserKey = document.createElement('h3'),
                        nestedContainer = document.createElement('div');
                    $nestedUserKeyValue.placeholder = keyInner;
                    $nestedUserKeyValue.required = true;
                    nestedUserKey.innerHTML = keyInner + ' : ';
                    nestedContainer.className = 'nestedContainer';
                    userKeyContainer.className = 'nestedKeyContainer';
                    $nestedUserKeyValue.addEventListener('input', function() {
                        let newValue = this.value;
                        userToReturn[key][keyInner] = newValue;
                    })
                    nestedContainer.append(nestedUserKey, $nestedUserKeyValue);
                    userKeyContainer.append(nestedContainer)
                }
            } else {
                userKeyContainer.className = 'keyContainer';
                userKeyContainer.append($userKey, userKeyValue);
            }
            $('#popUpInnerContent').append(userKeyContainer);
        }
        buttonContainer.append($confirmButton, cancelButton);
        $('#popUpInnerContent').append(buttonContainer)
        $('#popUp').css('display', 'flex');
    } catch (error) {
        alert('Error (User render) : ' + error)
    }
}
// ------------------------------------------------------------------------------------------------------
// --------------------------------------------------- SEARCH --------------------------------------------
// --------------------------------------------------------------------------------------------------------
async function userSearch(input) {
    let allUsers = await getInfo();
    let renderArray = [];
    allUsers.forEach(element => {
        if (element.name.toLowerCase().includes(input) ||
            element.phone.toString().includes(input) ||
            element.username.toLowerCase().includes(input) ||
            element.email.toLowerCase().includes(input) ||
            element.website.toLowerCase().includes(input)) {
            renderArray.push(element)
        }
    });
    render(renderArray)
}
// ---------------------------------------------------------------------------------------------------------
// ------------------------------------------------ User Action Controll-------------------------------------
// -----------------------------------------------------------------------------------------------------------
async function actionControll(type, id) {
    switch (type) {
        case 'edit':
            try {
                userEdit(id);
            } catch (error) {
                alert('Error (Action controll) : ' + error)
            }
            break;
        case 'remove':
            try {
                deleteThisUser(id)
            } catch (error) {
                alert('Error (Action controll) : ' + error)
            }
            break;
        case 'inspect':
            try {
                let theTarget = await getUserInfo(id);
                inspectRender(theTarget);
            } catch (error) {
                alert('Error (Action controll) : ' + error)
            }
            break;
        case 'add':
            try {
                userAdd();
                actionControll();
            } catch (error) {
                alert('Error (Action controll) : ' + error)
            }
            break;
        default:
            try {
                let allUsers = await getInfo();
                render(allUsers);
            } catch (error) {
                alert('error : ' + error)
            }
            break;
    }
}
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ User page START --------------------------------------------
// --------------------------------------------------------------------------------------------------------------
$(function() {
    actionControll();
    $('#popUp').on('click', function(e) {
        if ($('#popUp').is(e.target) || $('#popUpClose').is(e.target)) {
            $('#popUp').toggle()
        }
    });
    $('#searchBar').on('input', function() {
        let searchContent = this.value.toLowerCase();
        userSearch(searchContent)
    });
    $('#addUserButton').on('click', function() {
        actionControll('add');
    })
})