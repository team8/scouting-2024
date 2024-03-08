const findPercent = (value, allValues) => {

    if(typeof allValues != 'Array') return value/allValues;
    else {
    let totalValues = 0;
    for (let x of allValues) {
        totalValues += x;
    }
    return value/totalValues;
    }
}

const findTotalValue = (qmList, varName, value) => {
    let total = 0;

    Object.keys(qmList).map((qm)=>{

       
        let newVarName = typeof qmList[qm][varName] === "string" ? qmList[qm][varName].toLowerCase() : qmList[qm][varName]
        value = typeof value === "string" ? value.toLowerCase() : value
       
        if(newVarName == value) {
            total++
        }; 
    })
    return total;
    
}

const calculatePercents = (teamData) => {
    let percents = {};
    let qmList = {};
 
    Object.keys(teamData.qm).map((qual)=>{
        if (!teamData.qm[qual]["-"]){
            qmList[qual] = teamData.qm[qual]
        }
    })
    let totals = teamData.total;

    additiveValuesToCalc = ['park', 'climb', 'harmony', 'mobility', 'outsideStarting', 'middleStarting', 'insideStarting', 'coopertition', 'botDied',];
    associatedVarNames = ['climbStatus', 'climbStatus', 'climbStatus', 'mobility', 'startingPosition', 'startingPosition', 'startingPosition', 'coopertition', 'died'];
    associatedVarValues = ['park', 'climb', 'harmony', true, 'outside', 'middle', 'inside', true, true];

    for(let i in associatedVarNames) {
        percents[additiveValuesToCalc[i] + 'Percent'] = findTotalValue(qmList, associatedVarNames[i], associatedVarValues[i])/Object.keys(qmList).length;
    }
    
    percents.attemptedSpeakerPercent = 
    (totals.autoSpeakerNotes + totals.autoFailedSpeakerNotes + totals.teleopSpeakerNotes + totals.teleopFailedSpeakerNotes)/
    (totals.autoSpeakerNotes + totals.autoAmpNotes + totals.autoFailedSpeakerNotes + totals.autoFailedAmpNotes + totals.teleopSpeakerNotes + totals.teleopAmpNotes + totals.teleopFailedSpeakerNotes + totals.teleopFailedAmpNotes);

    percents.attemptedAmpPercent =
    (totals.autoAmpNotes + totals.autoFailedAmpNotes + totals.teleopAmpNotes + totals.teleopFailedAmpNotes)/
    (totals.autoSpeakerNotes + totals.autoAmpNotes + totals.autoFailedSpeakerNotes + totals.autoFailedAmpNotes + totals.teleopSpeakerNotes + totals.teleopAmpNotes + totals.teleopFailedSpeakerNotes + totals.teleopFailedAmpNotes); 

    percents.accurateSpeakerPercent = (totals.autoSpeakerNotes + totals.teleopSpeakerNotes)/
    (totals.autoSpeakerNotes + totals.autoFailedSpeakerNotes + totals.teleopSpeakerNotes + totals.teleopFailedSpeakerNotes);

    percents.accurateAmpPercent = (totals.autoAmpNotes + totals.teleopAmpNotes)/
    (totals.autoAmpNotes + totals.autoFailedAmpNotes + totals.teleopAmpNotes + totals.teleopFailedAmpNotes);

    percents.groundIntakePercent = (totals.groundIntakes)/(totals.groundIntakes + totals.substationIntakes);
    percents.substationIntakePercent = (totals.substationIntakes)/(totals.groundIntakes + totals.substationIntakes);

    percents.accurateTrapPercent = (totals.traps)/(totals.traps + totals.failedTraps);
    return percents;
}

module.exports = {calculatePercents}