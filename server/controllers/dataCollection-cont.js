const firebase = require('../database.js');
const { ref, set, onValue } = require('firebase/database');
const { calculateValues} = require('../utilities/calculateValues.js');
const { calculatePoints} = require('../utilities/calculatePoints.js');
const { calculatePercents} = require('../utilities/calculatePercents.js');



var scoutingData = {}


onValue(ref(firebase, `/scouting-data`), (snapshot) => {
    const data = snapshot.val();
    scoutingData = data;
})

const addData = async (req, res, next) => {
    const data = req.body;
    let matchData = data;
    
    



    let totalSpeakerNotes = matchData.autoSpeakerNotes + matchData.teleopSpeakerNotes;
    let totalAmpNotes = matchData.autoAmpNotes + matchData.teleopAmpNotes;

    let allAttemptedSpeakerNotes = totalSpeakerNotes + matchData.autoFailedSpeakerNotes + matchData.teleopFailedSpeakerNotes;
    let allAttemptedAmpNotes = totalAmpNotes + matchData.autoFailedAmpNotes + matchData.teleopFailedAmpNotes;

    matchData.averageRating = (matchData.driverRating + matchData.defenseRating + matchData.intakeRating + matchData.climbRating)/4;
    matchData.speakerAccuracy = (totalSpeakerNotes)/(allAttemptedSpeakerNotes);
    matchData.ampAccuracy = (totalAmpNotes)/(allAttemptedAmpNotes);
    matchData.trapAccuracy = (matchData.traps)/(matchData.traps + matchData.failedTraps);
    //matchData.percentGroundIntake (i forgor to add it to collection app)
    //matchData.percentSourceIntake (that's the substation)
    matchData.attemptedSpeakerPercent = (allAttemptedSpeakerNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.attemptedAmpPercent = (allAttemptedAmpNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);



    matchData.pointsScored = calculatePoints(matchData.autoSpeakerNotes, matchData.autoAmpNotes, matchData.teleopSpeakerNotes, matchData.teleopAmpNotes, matchData.traps, matchData.climbStatus, matchData.mobility);

    await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/qm/${data.matchNo}`), matchData).then(async (i)=>{
        
        let cumulativeValues = calculateValues(scoutingData[data.event][data.team]['qm']);
        await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/min/`), cumulativeValues["min"]);
        await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/max/`), cumulativeValues["max"]);
        await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/average/`), cumulativeValues["average"]);
        await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/total/`), cumulativeValues["total"]);

        
        
    }).then(async (j)=> {
        let percentValues = calculatePercents(scoutingData[data.event][data.team]);
        console.log(percentValues)
        await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/percent/`), percentValues);
    });

    // await set(ref(firebase, `/scouting-data/${data.event}/${data.team}/qm/${data.matchNo}/`), matchData);
    
    

    res.send('Values updated ~');
    return;
}

module.exports = { addData };