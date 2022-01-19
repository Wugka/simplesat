import axios from 'axios'

const baseUrl = process.env.REACT_APP_SIMPLESAT_API;
const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}

export function getToDoList(){
    try {

        var result = axios({
            url: baseUrl + 'api/tasks',
            headers: headers,
            method: 'GET',
        })

        return result

    } catch (err) {
        console.log(err)
    }
}

//*****************************************************************************************

export function createToDoList(data){
    try {

        var result = axios({
            url: baseUrl + 'api/tasks',
            headers: headers,
            method: 'POST',
            data:data
        })

        return result

    } catch (err) {
        console.log(err)
    }
}

//*****************************************************************************************

export function updateToDoList(data){
    try {

        var result = axios({
            url: baseUrl + `api/tasks/${data.id}`,
            headers: headers,
            method: 'PUT',
            data:data
        })

        return result

    } catch (err) {
        console.log(err)
    }
}

//*****************************************************************************************

export function deleteAllToDoList(){
    try {
        var result = axios({
            url: baseUrl + 'api/tasks',
            headers: headers,
            method: 'DELETE',
        })

        return result

    } catch (err) {
        console.log(err)
    }
}

//*****************************************************************************************