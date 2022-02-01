const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getInfo() {
    return fetch(`${API_URL}/users`)
        .then(response => response.json())
}

export async function userPost(data) {
    return fetch(`${API_URL}`, {
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
}

export async function userDelete(index, data) {
    return fetch(`${API_URL}/users/${index}`), {
            method: 'DELETE',
        }
        .then(response => response.json())
}