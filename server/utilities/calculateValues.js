const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const findValue = (qualsList, valueToFind, type) => {
    let value = 0;
    if(type == 'min') value = 99999999; //Maybe there's a better way to do this but idk lol
    

    if(type == 'min' || type == 'max')
    for(let i = 0; i < qualsList.length; i++) {

        if((type == 'min' && value > qualsList[i][valueToFind]) 
        || (type == 'max' && value < qualsList[i][valueToFind])) value = qualsList[i][valueToFind];

    }

    else if(type == 'average' || type == 'total') {
        for(let i = 0; i < qualsList.length; i++) {

            value += qualsList[i][valueToFind];

        }

        if (type == 'average') value /= qualsList.length;
    }

    else console.log('Invalid type: [' + type + '] used in findValue');

    return value;
}

const calculateValues = (qualsList) => {
    let cumulativeValues = {'min': {}, 'max': {}, 'average': {}, 'total': {}};
    let valueTypes = Object.keys(cumulativeValues);

    let valuesToFind = [
    'autoSpeakerNotes', 'autoAmpNotes', 'autoFailedSpeakerNotes', 'autoFailedAmpNotes',
    'teleopSpeakerNotes', 'teleopAmpNotes', 'teleopFailedSpeakerNotes', 'teleopFailedAmpNotes',
    'traps', 'failedTraps', 'driverRating', 'defenseRating', 'intakeRating', 'climbRating', 'died', 'tipped'];

    for(let i = 0; i < Object.keys(valueTypes).length; i++) {
        //Runs through 4 types of data to collect - min, max, average, total

        for(let j = 0; j < Object.keys(valuesToFind).length; j++) {
            //This for loop runs through each value to find and runs the function findValue for each one, and then adds that value to the cumulative values

            if(!(j == 14 || j == 15) || i == 3) //For died & tipped, only total should be ran
            cumulativeValues[valueTypes[i]][valueTypes[i] + capitaliseFirstLetter(valuesToFind[j])] = findValue(qualsList, valuesToFind[j], valueTypes[i]);
            
        }

    }

    return cumulativeValues;
}