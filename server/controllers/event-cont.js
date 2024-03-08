const teamModel = require('../models/team.json');
const { getEventData } = require('../utilities/TBAInteractor.js');
const pitModel = require('../models/pit.json')

const firebase = require('../database.js'); 
const { ref, set, onValue, remove } = require('firebase/database');


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
                console.log(result);
                const data = JSON.parse(result)

                data.map((team) => {
                    teams.push(team.team_number)
                })
                console.log(teams)
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
            teamData[eventData[i].team] = {...teamModel, qm: matches, pit: pitModel};
        }
        await set(ref(firebase, `/scouting-data/${eventKey}`), teamData).then(() => {
            res.send('Initialized event successfully');
        });
    } catch (error) {
        res.send(error.stack);
    }
}


module.exports = { getTeams, initializeEvent }