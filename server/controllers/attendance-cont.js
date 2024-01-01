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
        if (((attendance || {})[id] || {}).hours) {
            await set(ref(firebase, `/attendance/${id}/hours`), attendance[id].hours + timeElapsed / 3600000)
        }
        else {
            await set(ref(firebase, `/attendance/${id}/hours`), timeElapsed / 3600000)
        }
        delete loggedInUsers[id]
        res.send({action: 'logout', name: attendance[id].name})
    } else {
        loggedInUsers[id] = Date.now()
        
        if ((attendance || {})[id]){
            res.send({action: 'login', name: attendance[id].name})
        } else{
            console.log('first login')
            res.send('first login')
        }
    }
}



const getHours = (req, res, next) => {
    res.send(attendance)
}

const setUserInfo = async (req, res, next) => {

    const userdata = req.body
    console.log(userdata)
    await set(ref(firebase, `/attendance/${userdata.id}/name`), userdata.name)
    await set(ref(firebase, `/attendance/${userdata.id}/subteam`), userdata.subteam)
    res.send("data set")
}

module.exports = { getHours, idEntered, setUserInfo }