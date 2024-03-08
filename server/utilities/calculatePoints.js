const calculatePoints = (autoSN, autoAN, teleSN, teleAN, traps, climbStatus, mobility) => {
    let autoPoints = 0
    let teleopPoints = 0
    let endgamePoints = 0

    if (mobility) autoPoints += 2;
    if (traps > 0) autoPoints += 5;
    autoPoints += autoAN * 2;
    autoPoints += autoSN * 5;

    teleopPoints += teleSN * 2
    teleopPoints += teleAN;



    if(climbStatus == 'Parked') 
    endgamePoints += 1;
    else if(climbStatus == 'Climb')
    endgamePoints += 3; //Spotlighting is not scouted
    else if(climbStatus == 'Harmony')
    endgamePoints += 3 + 2;

    

    return [autoPoints, teleopPoints, endgamePoints];
}
module.exports = {calculatePoints}
