import 'whatwg-fetch'
import { randomWord } from './ChunkModule'

// Replace this with logging server url.
const api = "placeholder";

function getUserID() {
    if (localStorage.getItem("userID")) {
        return localStorage.getItem("userID");
    }
    const userID = randomWord(10);
    localStorage.setItem("userID", userID);
    return userID
}

function getSessionID() {
    if (sessionStorage.getItem("sessionID")) {
        return sessionStorage.getItem("sessionID");
    }
    const sessionID = randomWord(10);
    sessionStorage.setItem("sessionID", sessionID);
    return sessionID
}

function getMemoCount() {
    return parseInt(localStorage.getItem("memorisedCount"), 10) || 0;
}

export function sendGuess(guessData) {
    fetch(api + "/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: getUserID(),
            sessionID: getSessionID(),
            memorisedCount: getMemoCount(),
            ...guessData
        })
    }).then((response) => {
        if (!response.ok) {
            console.error(`Server response was not ok: ${response.status}, ${response.statusText}`);
        }
    }).catch((error) => {
        console.error(`Network error: ${error.message}`);
    })
}