const firebase = require('../database.js');
const { ref, set, onValue } = require('firebase/database');
//const { calculateValues } = require('../utilities');


var scoutingData = {}


onValue(ref(firebase, `/scouting-data`), (snapshot) => {
    const data = snapshot.val();
    scoutingData = data;
})

const addData = async (req, res, next) => {
    const data = req.body;
    let matchData = data;
    
    delete matchData.event;
    delete matchData.team;
    delete matchData.matchNo;
    

    //let cumulativeValues = calculateValues(scoutingData[data.event][data.team]['qm']);

    let totalSpeakerNotes = matchData.autoSpeakerNotes + matchData.teleopSpeakerNotes;
    let totalAmpNotes = matchData.autoAmpNotes + matchData.teleopAmpNotes;

    let allAttemptedSpeakerNotes = totalSpeakerNotes + matchData.autoFailedSpeakerNotes + matchData.teleopFailedSpeakerNotes;
    let allAttemptedAmpNotes = totalAmpNotes + matchData.autoFailedAmpNotes + matchData.teleopFailedAmpNotes;

    matchData.averageRating = (matchData.driverRating + matchData.defenseRating + matchData.intakeRating + matchData.climbRating)/4;
    matchData.speakerAccuracy = (totalSpeakerNotes)/(allAttemptedSpeakerNotes);
    matchData.ampAccuracy = (totalAmpNotes)/(allAttemptedAmpNotes);
    matchData.trapAccuracy = (matchData.traps)/(matchData.traps + matchData.failedTraps);
    //percentGroundIntake (i forgor to add it to collection app)
    //percentSourceIntake (that's the substation)
    matchData.attemptedSpeakerPercent = (allAttemptedSpeakerNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.attemptedAmpPercent = (allAttemptedAmpNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.amplifiedSpeakerPercent = (matchData.amplifiedSpeakerNotes)/(matchData.teleopSpeakerNotes + matchData.amplifiedSpeakerNotes);


    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/qm/${data.matchNo}/`), matchData);

    /*
    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/min/`), cumulativeValues[0]);
    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/max/`), cumulativeValues[1]);
    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/average/`), cumulativeValues[2]);
    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/total/`), cumulativeValues[3]);
    */

    res.send('Values updated ~');
    return;
}

module.exports = { addData };