const teamModel = require('../models/team.json');
const { getEventData } = require('../utilities/TBAInteractor.js');
const pitModel = require('../models/pit.json')

const firebase = require('../database.js');
const { ref, set, onValue, remove } = require('firebase/database');

var picklists = {}

onValue(ref(firebase, `/picklists`), (snapshot) => {
    const data = snapshot.val();
    picklists = data;
})


const getTeams = async (req, res, next) => {
    try {
        const eventKey = req.params.event



        let teams = []
        const myHeaders = new Headers();
        myHeaders.append("X-TBA-Auth-Key", "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result)

                data.map((team) => {
                    teams.push(team.team_number)
                })
                res.send(teams)
            })
            .catch((error) => console.error(error));


    } catch (e) {
        console.log(e.message)
        res.send(e.message)
    }

}

const initializeEvent = async (req, res, next) => {
    try {
        const eventKey = req.params.key;
        const eventData = await getEventData(eventKey);
        var teamData = {};
        for (var i in eventData) {
            let matches = {};
            eventData[i].matches.forEach(match => {
                matches[match] = { "-": "-" };
            });
            teamData[eventData[i].team] = { ...teamModel, qm: matches, pit: pitModel, name: eventData[i].name };
        }
        await set(ref(firebase, `/scouting-data/${eventKey}`), teamData).then(() => {
            res.send('Initialized event successfully');
        });
    } catch (error) {
        res.send(error.stack);
    }
}

const getPicklist = (req, res, next) => {
    const event = req.params.event;
    res.send((picklists || {})[event] || {})
}

const setPicklist = async (req, res, next) => {
    const event = req.params.event;
    const picklist = req.body
    try {
  
        await set(ref(firebase, `/picklists/${event}`), picklist).then(()=>{
            res.send("set successfully")
        })
        
    } catch (e) {
        res.send(e.stack)
    }
}

module.exports = { getTeams, initializeEvent, getPicklist, setPicklist }