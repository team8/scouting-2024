const firebase = require('../database.js');
const { ref, set, onValue, remove } = require('firebase/database');

var loggedInUsers = {}

var attendance = {}

onValue(ref(firebase, `/attendance`), (snapshot) => {
    const data = snapshot.val();
    attendance = data
})

const idEntered = async (req, res, next) => {
    const id = req.params.id
    console.log('entered')
    if (Object.keys(loggedInUsers).includes(id)) {
        timeElapsed = Date.now() - loggedInUsers[id]
        console.log(timeElapsed)
        if (attendance[id].hours) {
            await set(ref(firebase, `/attendance/${id}/hours`), attendance[id].hours + timeElapsed / 3600000)
        }
        else {
            await set(ref(firebase, `/attendance/${id}/hours`), timeElapsed / 3600000)
        }
        delete loggedInUsers[id]
        res.send(loggedInUsers)
    } else {
        loggedInUsers[id] = Date.now()
        if (Object.keys(attendance).includes(id)) {
            res.send(loggedInUsers)
        } else {
            res.send("first login")
        }
    }
}

const login = (req, res, next) => {
    const id = req.params.id
    loggedInUsers[id] = Date.now()
    if (Object.keys(attendance).includes(id)) {
        res.send(loggedInUsers)
    } else {
        res.send("first login")
    }
}

const logout = async (req, res, next) => {
    const id = req.params.id
    if (Object.keys(loggedInUsers).includes(id)) {
        timeElapsed = Date.now() - loggedInUsers[id]
        console.log(timeElapsed)
        await set(ref(firebase, `/attendance/${id}/hours`), timeElapsed / 3600000)
        delete loggedInUsers[id]
        res.send(loggedInUsers)
    } else {
        res.send('not logged in')
    }
}

const getHours = () => {
    res.send(attendance)
}

module.exports = { login, logout, getHours, idEntered }