const firebase = require('../database.js');
const { ref, set, onValue, remove } = require('firebase/database');


var scoutingData = {}


onValue(ref(firebase, `/scouting-data`), (snapshot) => {
    const data = snapshot.val();
    scoutingData = data;
})

const addData = async (req, res, next) => {
    const data = req.params.data;
    matchData = data;
    delete matchData.event;
    delete matchData.team;
    delete matchData.matchNo;

    var totalSpeakerNotes = matchData.autoSpeakerNotes + matchData.teleopSpeakerNotes;
    var totalAmpNotes = matchData.autoAmpNotes + matchData.teleopAmpNotes;

    var allAttemptedSpeakerNotes = totalSpeakerNotes + matchData.autoFailedSpeakerNotes + matchData.teleopFailedSpeakerNotes;
    var allAttemptedAmpNotes = totalAmpNotes + matchData.autoFailedAmpNotes + matchData.teleopFailedAmpNotes;

    matchData.averageRating = (matchData.driverRating + matchData.defenseRating + matchData.intakeRating + matchData.climbRating)/4;
    matchData.speakerAccuracy = (totalSpeakerNotes)/(allAttemptedSpeakerNotes);
    matchData.ampAccuracy = (totalAmpNotes)/(allAttemptedAmpNotes);
    //percentGroundIntake (i forgor to add it to collection app)
    //percentSourceIntake (that's the substation)
    matchData.attemptedSpeakerPercent = (allAttemptedSpeakerNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.attemptedAmpPercent = (allAttemptedAmpNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.amplifiedSpeakerPercent = (matchData.amplifiedSpeakerNotes)/(matchData.teleopSpeakerNotes + matchData.amplifiedSpeakerNotes);
    
    /*
    Note: % parked vs solo climb vs harmony will be added in a diff function as that's for all of a team's data
    */

    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/${data.matchNo}/`), matchData);
    return;
}