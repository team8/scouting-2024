const firebase = require('../database.js');
const { ref, set, onValue, remove } = require('firebase/database');

const { attendancePassword } = require("../config.js")

var loggedInUsers = {}

var attendance = {}

onValue(ref(firebase, `/attendance`), (snapshot) => {
    const data = snapshot.val();
    attendance = data
    loggedInUsers = data.loggedInUsers || {}
})





const idEntered = async (req, res, next) => {
    const endsOfWeeks = { 1: 1705190400000, 2: 1705795200000, 3: 1706400000000, 4: 1707004800000, 5: 1707609600000, 6: 1708214400000, 7: 1708819200000, 8: 1709424000000, 9: 1710028800000, 10: 1710633600000, 11: 1711238400000 }
    var week = 0
    for (i in Object.keys(endsOfWeeks)) {
        if (endsOfWeeks[i] > Date.now()) {
            week = i
            break
        }

    }
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


    if (Object.keys(loggedInUsers || {}).includes(id)) {
        timeElapsed = Date.now() - loggedInUsers[id]
        console.log(timeElapsed)

        if (timeElapsed / 3600000 < 10) {
            if (((attendance || {})[id] || {}).hours) {
                await set(ref(firebase, `/attendance/${id}/hoursList/${week}`), attendance[id].hours + (timeElapsed / 3600000))
                await set(ref(firebase, `/attendance/${id}/hours`), attendance[id].hours + (timeElapsed / 3600000))
            }
            else {
                await set(ref(firebase, `/attendance/${id}/hoursList/${week}`), timeElapsed / 3600000)
                await set(ref(firebase, `/attendance/${id}/hours`), timeElapsed / 3600000)
            }
        }
        delete loggedInUsers[id]
        res.send({ action: 'logout', name: name })
    } else {
        loggedInUsers[id] = Date.now()
        res.send({ action: 'login', name: name })
    }
    await set(ref(firebase, `/attendance/loggedInUsers`), loggedInUsers)
}



const getTableData = (req, res, next) => {
    res.send(attendance)
}


const checkPassword = (req, res, next) => {
    const attempt = req.params.attempt
    res.send(attempt === attendancePassword)

}

const getStudentData = (req, res, next) => {
    const id = req.params.id
    try{
    for (i in attendance.studentData) {
        if (attendance.studentData[i].studentId == id) {
            res.send({ ...attendance.studentData[i], hours: attendance[id].hours })
            return
        }
    }}catch{
        res.send("id not found")
    }
    res.send("id not found")
}

const getSubteamHours = (req, res, next) => {

    res.send("Hahahaa")
}

const addHours = async (req, res, next) => {
    const id = req.body.id
    const hours = parseFloat(req.body.hours)

    const endsOfWeeks = { 1: 1705190400000, 2: 1705795200000, 3: 1706400000000, 4: 1707004800000, 5: 1707609600000, 6: 1708214400000, 7: 1708819200000, 8: 1709424000000, 9: 1710028800000, 10: 1710633600000, 11: 1711238400000 }
    var week = 0
    for (i in Object.keys(endsOfWeeks)) {
        if (endsOfWeeks[i] > Date.now()) {
            week = i
            break
        }

    }

    try{
        if (((attendance || {})[id] || {}).hours) {
            await set(ref(firebase, `/attendance/${id}/hoursList/${week}`), attendance[id].hours + hours)
            await set(ref(firebase, `/attendance/${id}/hours`), attendance[id].hours + hours)
        }
        else {
            await set(ref(firebase, `/attendance/${id}/hoursList/${week}`), hours)
            await set(ref(firebase, `/attendance/${id}/hours`), hours)
        }
    res.send("added")
}catch{
    res.send("no hours")
}
    

}

const correctStudentData = async (req, res, next) => {
    for (i in attendance.studentData){
        var student = attendance.studentData[i];
        attendance[student.studentId] = {...attendance[student.studentId], ...student}
    }
    await set(ref(firebase, `/attendance`), attendance)
    res.send("corrected")

}

const getHours = (req, res, next) => {
    var hours = 0
    for (i in Object.keys(attendance)){
        const id = Object.keys(attendance)[i]
        if(parseInt(id)){
            if(attendance[id].fullName.toLowerCase().split(' ').join('') === req.body.user_name){
                hours = attendance[id].hours
                break
            }
        }
    }
    res.send("You have spent "+ (Math.round(hours * 100) / 100).toString() +" hours at lab this season.")
}

module.exports = { getTableData, idEntered, checkPassword, getSubteamHours, getStudentData, addHours, correctStudentData, getHours }