import React from 'react'
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
