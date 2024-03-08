const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const TBA_KEY  = "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU";
const TBA_BASE = 'https://www.thebluealliance.com/api/v3';

async function getEventData(eventKey) {
    try {
        const response = await axios.get(`${TBA_BASE}/event/${eventKey}/teams/simple`, { headers: { "X-TBA-Auth-Key": TBA_KEY } });
        const res = await response.data;

        let teamList = [];
        for (var i in res) {
            let teamNum = res[i].team_number;
            let teamName = res[i].nickname;
            let matches = await getTeamMatches(teamNum, eventKey);
            teamList.push({ team: teamNum, name: teamName, matches: matches });
            if (teamList.length == res.length) {
                teamList.sort((a, b) => a.team - b.team);
            }
        }
        return teamList;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamMatches(teamNum, eventKey) {
    try {
        const response = await axios.get(`${TBA_BASE}/team/frc${teamNum}/event/${eventKey}/matches/simple`, { headers: { "X-TBA-Auth-Key": TBA_KEY } });
        let matches = response.data;
        let matchList = [];
        for (var i in matches) {
            matches[i].comp_level == "qm" ? matchList.push(matches[i].match_number) : "";
        }
        return (matchList.sort((a, b) => a - b));

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getEventData};