const findValue = (qualsList, valueToFind, type) => {
    let value = 0;
    if(type == 'min') value = 9999999;
    

    if(type == 'min' || type == 'max')
    for(let i = 0; i < qualsList.length; i++) {

        if((type == 'min' && value > qualsList[i][valueToFind]) 
        || (type == 'max' && value < qualsList[i][valueToFind])) value = qualsList[i][valueToFind];

    }

    if(type == 'average' || type == 'total') {
        for(let i = 0; i < qualsList.length; i++) {

            value += qualsList[i][valueToFind];

        }

        if (type == 'average') value /= qualsList.length;
    }
    

    return value;
}

const calculateValues = (qualsList) => {
    let cumulativeValues = {'min': {}, 'max': {}, 'average': {}, 'total': {}};
    let valueTypes = ['min', 'max', 'average', 'total'];

    let valuesToFind = [
    'autoSpeakerNotes', 'autoAmpNotes', 'autoFailedSpeakerNotes', 'autoFailedAmpNotes',
    'teleopSpeakerNotes', 'amplifiedSpeakerNotes', 'teleopAmpNotes', 'teleopFailedSpeakerNotes', 'teleopFailedAmpNotes',
    'traps', 'failedTraps', 'driverRating', 'defenseRating', 'intakeRating', 'climbRating'];

    //allMinimums.autoSpeakerNotes = findMin(teamData, 'autoSpeakerNotes');

    for(let i = 0; i < Object.keys(valueTypes).length; i++) {

        for(let j = 0; j < Object.keys(valuesToFind).length; j++) {

            cumulativeValues[valueTypes[i]].valuesToFind[j] = findValue(qualsList, valuesToFind[j], valueTypes[i]);
            
        }

    }

    return cumulativeValues;
}