const MainUrl = 'http://localhost:5000/photos';


// export async function getPhotos() {
//     let photoArray = axios.get(`${MainUrl}`);
//     return photoArray.data;
// }

export async function getPhotos(count) {
    try {
        return fetch(`${MainUrl}?limit=${count}`)
            .then(res => res.json())
            .then(data => data)
    } catch (error) {
        alert('Error :' + error)
    }
}