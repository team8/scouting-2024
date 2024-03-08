const { ref, set, onValue, remove } = require('firebase/database');
const firebase = require('../database.js');




const get_team = async (req, res) => {
    try {
        const event = req.params.event;
        const team = req.params.team;
        console.log(event, team)
        await onValue(ref(firebase, `scouting-data/${event}/${team}`), (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            res.send(data);
        }, { onlyOnce: true });
    } catch (error) {
        res.send(error.message);
    }
}

const get_match = async (req, res) => {
    try {
        const event = req.params.event;
        const team = req.params.team;
        const match = req.params.match;

        await onValue(ref(firebase, `scouting-data/${event}/${team}/qm/${match}`), (snapshot) => {
            const data = snapshot.val();
            res.send(JSON.stringify(data));
        }, { onlyOnce: true });
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {  get_team, get_match };