const getTeams = async (req, res, next) => {
    const eventKey = req.params.event


    // await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`, {headers: {"X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU"}}).then((i)=>{
    //     i.json()
    //     res.send(i)
    // }).then((raw)=>{
    //     // const data = JSON.parse(raw)
    //     res.send(raw)
    // })

    teams = []

    const axios = require('axios');
    let data = '';
    let config = {
        method: 'get',
    maxBodyLength: Infinity,
        url: `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`,
        headers: {
        'X-TBA-Auth-Key': 'fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU'
        },
    data : data
};
    axios.request(config)
        .then((response) => {
            console.log(response.data);
            response.data.map((team) => {
                teams.push(team.team_number)
            })
            console.log(teams)
            res.send(teams)

        })
        .catch((error) => {
            console.log(error);
        });

}

module.exports = {getTeams}