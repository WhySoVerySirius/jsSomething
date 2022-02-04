const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getInfo() {
    return fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(data => data)
}

export async function getUserInfo(id) {
    return fetch(`${API_URL}/users/${id}`)
        .then(response => response.json())
        .then(data => data)
}

export async function userPost(data) {
    return fetch(`${API_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application, json'
            }
        })
        .then(response => response.json())
}

export async function userUpdate(index, data) {
    return fetch(`${API_URL}/users/${index}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application, json'
            }
        })
        .then(response => response.json())
        .then(console.log('patch done'))
}

export async function userDelete(index) {
    return fetch(`${API_URL}/users/${index}`, {
            method: 'DELETE'
        })
        .then(response => response)
        .then(data => data)
        .catch(error => console.log('Err : ' + error))
}