const firebase = require('../database.js');
const { ref, set, onValue, remove } = require('firebase/database');

const { attendancePassword } = require("../config.js")

var loggedInUsers = {}

var attendance = {}

onValue(ref(firebase, `/attendance`), (snapshot) => {
    const data = snapshot.val();
    attendance = data
})

const idEntered = async (req, res, next) => {
    const id = req.params.id
    var name = ''
    console.log('entered')


    for (i in attendance.studentData) {
        if (attendance.studentData[i].studentId == id) {

            name = attendance.studentData[i].firstName
            break
        }

    }
    if (!name) {
        res.send("id does not exist")
        return
    }


    if (Object.keys(loggedInUsers).includes(id)) {
        timeElapsed = Date.now() - loggedInUsers[id]
        console.log(timeElapsed)

        if (timeElapsed / 3600000 < 10) {
            if (((attendance || {})[id] || {}).hours) {
                await set(ref(firebase, `/attendance/${id}/hours`), attendance[id].hours + (timeElapsed / 3600000))
            }
            else {
                await set(ref(firebase, `/attendance/${id}/hours`), timeElapsed / 3600000)
            }
        }
        delete loggedInUsers[id]
        res.send({ action: 'logout', name: name })
    } else {
        loggedInUsers[id] = Date.now()
        res.send({ action: 'login', name: name })

    }
}



const getHours = (req, res, next) => {
    res.send(attendance)
}


const checkPassword = (req, res, next) => {
    const attempt = req.params.attempt
    res.send(attempt === attendancePassword)

}

module.exports = { getHours, idEntered, checkPassword }