const firebase = require('../database.js');
const { ref, set, onValue } = require('firebase/database');
const { calculateValues} = require('../utilities/calculateValues.js');
const { calculatePoints} = require('../utilities/calculatePoints.js');
const { calculatePercents} = require('../utilities/calculatePercents.js');
const { renameKeys, correctValueTypes, stringToJSON } = require('../utilities/decode.js');




var scoutingData = {}


onValue(ref(firebase, `/scouting-data`), (snapshot) => {
    const data = snapshot.val();
    scoutingData = data;
})

const addData = async (req, res, next) => {
    try{
    const data = renameKeys(correctValueTypes(stringToJSON(req.body.raw)));
    
    let matchData = data;

    
    const event = matchData.event.slice(0, 8)

    console.log(event)

    let totalSpeakerNotes = matchData.autoSpeakerNotes + matchData.teleopSpeakerNotes;
    let totalAmpNotes = matchData.autoAmpNotes + matchData.teleopAmpNotes;

    let allAttemptedSpeakerNotes = totalSpeakerNotes + matchData.autoFailedSpeakerNotes + matchData.teleopFailedSpeakerNotes;
    let allAttemptedAmpNotes = totalAmpNotes + matchData.autoFailedAmpNotes + matchData.teleopFailedAmpNotes;

    matchData.averageRating = (parseFloat(matchData.driverRating) + parseFloat(matchData.defenseRating) + parseFloat(matchData.intakeRating) + parseFloat(matchData.climbRating))/4;
    matchData.speakerAccuracy = (totalSpeakerNotes)/(allAttemptedSpeakerNotes);
    matchData.ampAccuracy = (totalAmpNotes)/(allAttemptedAmpNotes);
    matchData.trapAccuracy = (matchData.traps)/(matchData.traps + matchData.failedTraps);
    //matchData.percentGroundIntake (i forgor to add it to collection app)
    //matchData.percentSourceIntake (that's the substation)
    matchData.attemptedSpeakerPercent = (allAttemptedSpeakerNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);
    matchData.attemptedAmpPercent = (allAttemptedAmpNotes)/(allAttemptedSpeakerNotes + allAttemptedAmpNotes);



    matchData.pointsScored = calculatePoints(matchData.autoSpeakerNotes, matchData.autoAmpNotes, matchData.teleopSpeakerNotes, matchData.teleopAmpNotes, matchData.traps, matchData.climbStatus, matchData.mobility);


    console.log(matchData)

    await set(ref(firebase, `/scouting-data/${event}/${data.team}/qm/${data.match}`), matchData).then(async (i)=>{
        
        let cumulativeValues = calculateValues(scoutingData[event][data.team]['qm']);
        await set(ref(firebase, `/scouting-data/${event}/${data.team}/min/`), cumulativeValues["min"]);
        await set(ref(firebase, `/scouting-data/${event}/${data.team}/max/`), cumulativeValues["max"]);
        await set(ref(firebase, `/scouting-data/${event}/${data.team}/average/`), cumulativeValues["average"]);
        await set(ref(firebase, `/scouting-data/${event}/${data.team}/total/`), cumulativeValues["total"]);

        
        
    }).then(async (j)=> {
        let percentValues = calculatePercents(scoutingData[event][data.team]);
        console.log(percentValues)
        await set(ref(firebase, `/scouting-data/${event}/${data.team}/percent/`), percentValues);
    });

    // await set(ref(firebase, `/scouting-data/${event}/${data.team}/qm/${data.matchNo}/`), matchData);
    
    

    res.send('Values updated ~');
    return;
}
catch(e){
    res.send(e.message)
}
}

module.exports = { addData };