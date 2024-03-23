const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const findValue = (qualsList, valueToFind, type) => {
    let value = 0;

    if (type == 'min') value = Infinity; //Maybe there's a better way to do this but idk lol

    if (type == 'min' || type == 'max') {
        
        Object.keys(qualsList).map((qm) =>{



            if ((type == 'min' && value > qualsList[qm][valueToFind])
                || (type == 'max' && value < qualsList[qm][valueToFind])) value = qualsList[qm][valueToFind];

        })
    }
    else if (type == 'average' || type == 'total') {
        Object.keys(qualsList).map((qm) =>{

            if (qualsList[qm][valueToFind]){
            value += qualsList[qm][valueToFind];
}
        })
       
        if (type == 'average') value /= Object.keys(qualsList).length;
    }

    else console.log('Invalid type: [' + type + '] used in findValue');
    return value;
}

const calculateValues = (qualsList) => {
    let cumulativeValues = { 'min': {}, 'max': {}, 'average': {}, 'total': {} };
    let valueTypes = Object.keys(cumulativeValues);
    let autoCoordinatesList = [];
    let teleopCoordinatesList = [];


    for (let i = 0; qualsList.length(); i++) {
        // through each qual
        if (qualsList[i]['autoCoordinatesList']) {
            autoCoordinatesList = [...autoCoordinatesList, ...qualsList[i]['autoCoordinatesList']]
        }

        if (qualsList[i]['teleopCoordinatesList']) {
            teleopCoordinatesList = [...teleopCoordinatesList, ...qualsList[i]['teleopCoordinatesList']]
        }
    }

    cumulativeValues['total']['autoCoordinatesList'] = autoCoordinatesList
    cumulativeValues['total']['teleopCoordinatesList'] = teleopCoordinatesList

    let valuesToFind = [
        'autoSpeakerNotes', 'autoAmpNotes', 'autoFailedSpeakerNotes', 'autoFailedAmpNotes',
        'teleopSpeakerNotes', 'teleopAmpNotes', 'teleopFailedSpeakerNotes', 'teleopFailedAmpNotes',
        'traps', 'failedTraps', 'groundIntakes', 'substationIntakes', 'pointsScored',
        'driverRating', 'defenseRating', 'intakeRating', 'climbRating', 'died', 'autoPoints', 'teleopPoints', 'endgamePoints'];

    for (let i = 0; i < Object.keys(valueTypes).length; i++) {
        //Runs through 4 types of data to collect - min, max, average, total

        for (let j = 0; j < Object.keys(valuesToFind).length; j++) {
            //This for loop runs through each value to find and runs the function findValue for each one, and then adds that value to the cumulative values

            if (!(valuesToFind[j] == 'died') || i == 3) //For died & tipped, only total should be ran
                cumulativeValues[valueTypes[i]][valuesToFind[j]] = findValue(qualsList, valuesToFind[j], valueTypes[i]);

        }

    }
    return cumulativeValues;
}

module.exports = { calculateValues }
