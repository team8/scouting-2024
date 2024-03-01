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

    for (let i in qmList){ if(qmList[i][varName] == value) total++; }

    return total;
    
}

const calculateAverages = (teamData) => {
    let averages = {};

    let qmList = teamData.qm;
    let totals = teamData.total;

    additiveValuesToCalc = ['park', 'climb', 'harmony', 'mobility', 'outsideStarting', 'middleStarting', 'insideStarting', 'coopertition', 'botDied', 'botTipped'];
    associatedVarNames = ['climbStatus', 'climbStatus', 'climbStatus', 'mobility', 'startingPosition', 'startingPosition', 'startingPosition', 'coopertition', 'died', 'tipped'];
    associatedVarValues = ['park', 'climb', 'harmony', true, 'outisde', 'middle', 'inside', true, true, true];

    for(let i in associatedVarNames) {
        averages[valuesToCalc[i] + 'Percent'] = findTotalValue(qmList, associatedVarNames[i], associatedVarValues[i])/Object.keys(qmList);
    }
    
    averages.attemptedSpeakerPercent = 
    (totals.autoSpeakerNotes + totals.autoFailedSpeakerNotes + totals.teleopSpeakerNotes + totals.teleopFailedSpeakerNotes)/
    (totals.autoSpeakerNotes + totals.autoAmpNotes + totals.autoFailedSpeakerNotes + totals.autoFailedAmpNotes + totals.teleopSpeakerNotes + totals.teleopAmpNotes + totals.teleopFailedSpeakerNotes + totals.teleopFailedAmpNotes);

    averages.attemptedAmpPercent =
    (totals.autoAmpNotes + totals.autoFailedAmpNotes + totals.teleopAmpNotes + totals.teleopFailedAmpNotes)/
    (totals.autoSpeakerNotes + totals.autoAmpNotes + totals.autoFailedSpeakerNotes + totals.autoFailedAmpNotes + totals.teleopSpeakerNotes + totals.teleopAmpNotes + totals.teleopFailedSpeakerNotes + totals.teleopFailedAmpNotes); 

    averages.accurateSpeakerPercent = (totals.autoSpeakerNotes + totals.teleopSpeakerNotes)/
    (totals.autoSpeakerNotes + totals.autoFailedSpeakerNotes + totals.teleopSpeakerNotes + totals.teleopFailedSpeakerNotes);

    averages.accurateAmpPercent = (totals.autoAmpNotes + totals.teleopAmpNotes)/
    (totals.autoAmpNotes + totals.autoFailedAmpNotes + totals.teleopAmpNotes + totals.teleopFailedAmpNotes);

    averages.accurateTrapPercent = (totals.traps)/(totals.traps + totals.failedTraps);

    return averages;
}