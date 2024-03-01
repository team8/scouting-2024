const calculatePoints = (autoSN, autoAN, teleSN, teleAN, traps, climbStatus, mobility) => {
    let totalPoints = 0;

    if (mobility) totalPoints += 2;
    if (traps > 0) totalPoints += 5;
    totalPoints += teleAN;
    totalPoints += (autoAN + teleSN) * 2;
    totalPoints += autoSN * 5;

    if(climbStatus == 'Parked') 
    totalPoints += 1;
    else if(climbStatus == 'Climb')
    totalPoints += 3; //Spotlighting is not scouted
    else if(climbStatus == 'Harmony')
    totalPoints += 3 + 2;

    return totalPoints;
}