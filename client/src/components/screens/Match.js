import React, { useState, useEffect } from "react"; 
import { Card, Grid, Title, Space, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';


import AllianceTable from "../AllianceTable";
import PredictionCard from "../PredictionCard";
import TeamImage from '../TeamImage';
import Field from '../../assets/field.jpg';
import PrematchCard from "../PrematchCard";

const Match = (props) => {
    const { number } = useParams();
    const [loading, setLoading] = useState();
    const [red, setRed] = useState(); // list of red alliance teams
    const [blue, setBlue] = useState(); // list of blue alliance teams
    const [reds, setReds] = useState();
    const [blues, setBlues] = useState();
    const [redStats, setRedStats] = useState();
    const [blueStats, setBlueStats] = useState();
    const [red1, setRed1] = useState();
    const [red2, setRed2] = useState();
    const [red3, setRed3] = useState();
    const [blue1, setBlue1] = useState();
    const [blue2, setBlue2] = useState();
    const [blue3, setBlue3] = useState();

    const testingMatrix = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]];
    const offset_x = 5.2;
    const offset_y = 14;
    const multip_x = 4.9;
    const multip_y = 8.5;

    useEffect(() => {
        setLoading(true);
    }, [props.event, number]);

    useEffect(() => {
        const getTeams = async () => {
            await fetch(`https://www.thebluealliance.com/api/v3/match/${props.event}_qm${number}/simple`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" }})
                .then((response) => response.json())
                .then((data) => {
                    setRed(data.alliances.red.team_keys);
                    setBlue(data.alliances.blue.team_keys);
                });
        }
        getTeams();
    }, [loading]);

    useEffect(() => {
        const asyncFunction = async () => {
            const setTeams = async (teams) => {
                let array = [];
                for (var i in teams) {
                    await fetch(`https://server.palyrobotics.com/team/${props.event}/${teams[i].replace(/frc/g, '')}/${number}`)
                        .then((response) => response.json())
                        .then((data) => {
                            array.push(Object.assign({}, data));
                        });
                }
                return array;
            }

            const setStats = async (teams) => {
                let array = [];
                for (var i in teams) {
                    await fetch(`https://server.palyrobotics.com/team/${props.event}/${teams[i].replace(/frc/g, '')}`)
                        .then((response) => response.json())
                        .then((data) => {
                            array.push(Object.assign({}, data));
                        })
                }
                // console.log(array);
                return array;
            }

            if (blue) {
                let redArray = await setTeams(red);
                let blueArray = await setTeams(blue);

                let redStats = await setStats(red);
                let blueStats = await setStats(blue);

                setReds(redArray);
                setBlues(blueArray);
                setRedStats(redStats);
                setBlueStats(blueStats);

                setLoading(false);
            } 
        }
        asyncFunction();
        
    }, [blue])

    const getStatboticsStuffCusFunnyWhyNotNoMatchDataYetSoNeedPredictionBecauseFunnyWhyNotXanderWantDataBigDataFunnyRobotsGoCrazyDataFromRobotsGetAllTimeData = async () => {
        await fetch(`https://api.statbotics.io/v3/team_year/${red[0].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setRed1(data);
            });
        await fetch(`https://api.statbotics.io/v3/team_year/${red[1].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setRed2(data);
            });
        await fetch(`https://api.statbotics.io/v3/team_year/${red[2].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setRed3(data);
            });
        await fetch(`https://api.statbotics.io/v3/team_year/${blue[0].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setBlue1(data);
            });
        await fetch(`https://api.statbotics.io/v3/team_year/${blue[1].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setBlue2(data);
            });
        await fetch(`https://api.statbotics.io/v3/team_year/${blue[2].replace("frc", "")}/2024`)
            .then((response) => response.json())
            .then((data) => {
                setBlue3(data);
            });
    }
    
    if (loading) return (
        <div className="container">Loading...</div>
    );
    
    // if (blues && typeof(blues[0].team) !== 'undefined') {
    //     return (
    //         <Card>
    //             <Title order={3}>Qual {number}</Title>
    //             <Space h="md" />
    //             <Grid>
    //                 <Grid.Col span={12}>
    //                     <AllianceTable red={reds} blue={blues} />
    //                 </Grid.Col>
    //             </Grid>
    //         </Card>        
    //     );
    // } else {

        
        var redAutoCoords = Array(10).fill().map(()=>Array(10).fill());
        var redAutoMax = 0;
        var redAutocompleted = false;
        for(var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                redAutoCoords[i][j] = 0;
            }
        }
        if (redStats) {
            for(i = 0; i < 3; i++) {
                // redStats[i].qm[number].autoCoordinatesList;
                if (redStats[i].qm[number] && redStats[i].qm[number].autoCoordinatesList) {
                    for (j = 0; j < redStats[i].qm[number].autoCoordinatesList.length; j++) {
                        redAutoCoords[redStats[i].qm[number].autoCoordinatesList[j][0]][redStats[i].qm[number].autoCoordinatesList[j][1]] += 1;
                    }
                }
            }
            var maxRow = redAutoCoords.map(function(row){ return Math.max.apply(Math, row); });
            redAutoMax = Math.max.apply(null, maxRow);
            redAutocompleted = true;
        }

        var blueAutoCoords = Array(10).fill().map(()=>Array(10).fill());
        var blueAutoMax = 0;
        var blueAutocompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                blueAutoCoords[i][j] = 0;
            }
        }
        if (blueStats) {
            for(i = 0; i < 3; i++) {
                if (blueStats[i].qm[number] && blueStats[i].qm[number].autoCoordinatesList) {
                    for (j = 0; j < blueStats[i].qm[number].autoCoordinatesList.length; j++) {
                        blueAutoCoords[blueStats[i].qm[number].autoCoordinatesList[j][0]][blueStats[i].qm[number].autoCoordinatesList[j][1]] += 1;
                    }
                }
            }
            maxRow = blueAutoCoords.map(function(row){ return Math.max.apply(Math, row); });
            blueAutoMax = Math.max.apply(null, maxRow);
            blueAutocompleted = true;
        }

        var redTeleopCoords = Array(10).fill().map(()=>Array(10).fill());
        var redTeleopMax = 0;
        var redTeleopcompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                redTeleopCoords[i][j] = 0;
            }
        }
        if (redStats) {
            for(i = 0; i < 3; i++) {
                if (redStats[i].qm[number] && redStats[i].qm[number].teleopCoordinatesList) {
                    for (j = 0; j < redStats[i].qm[number].teleopCoordinatesList.length; j++) {
                        redTeleopCoords[redStats[i].qm[number].teleopCoordinatesList[j][0]][redStats[i].qm[number].teleopCoordinatesList[j][1]] += 1;
                    }
                }
            }
            maxRow = redTeleopCoords.map(function(row){ return Math.max.apply(Math, row); });
            redTeleopMax = Math.max.apply(null, maxRow);
            redTeleopcompleted = true;
        }

        var blueTeleopCoords = Array(10).fill().map(()=>Array(10).fill());
        var blueTeleopMax = 0;
        var blueTeleopcompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                blueTeleopCoords[i][j] = 0;
            }
        }
        if (blueStats) {
            for(i = 0; i < 3; i++) {
                if (blueStats[i].qm[number] && blueStats[i].qm[number].teleopCoordinatesList) {
                    for (j = 0; j < blueStats[i].qm[number].teleopCoordinatesList.length; j++) {
                        blueTeleopCoords[blueStats[i].qm[number].teleopCoordinatesList[j][0]][blueStats[i].qm[number].teleopCoordinatesList[j][1]] += 1;
                    }
                }
            }
            maxRow = blueTeleopCoords.map(function(row){ return Math.max.apply(Math, row); });
            blueTeleopMax = Math.max.apply(null, maxRow);
            blueTeleopcompleted = true;
        }

        if (!(reds && blues && false)) {
            getStatboticsStuffCusFunnyWhyNotNoMatchDataYetSoNeedPredictionBecauseFunnyWhyNotXanderWantDataBigDataFunnyRobotsGoCrazyDataFromRobotsGetAllTimeData();
        }

        var allredAutoCoords = Array(10).fill().map(()=>Array(10).fill());
        var allredAutoMax = 0;
        var allredAutocompleted = false;
        for(var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                allredAutoCoords[i][j] = 0;
            }
        }
        if (redStats) {
            for(i = 0; i < 3; i++) {
                for(var k = 0; k < Object.keys(redStats[i].qm).length; k++) {
                    var qual = redStats[i].qm[Object.keys(redStats[i].qm)[k]]
                    if (qual && qual.autoCoordinatesList) {
                        for (j = 0; j < redStats[i].qm[Object.keys(redStats[i].qm)[k]].autoCoordinatesList.length; j++) {
                            // console.log(qual.autoCoordinatesList);
                            try {
                                allredAutoCoords[qual.autoCoordinatesList[j][0]][qual.autoCoordinatesList[j][1]] += 1;
                            }
                            catch {

                            }
                        }
                    }
                }
            }
            var maxRow = allredAutoCoords.map(function(row){ return Math.max.apply(Math, row); });
            allredAutoMax = Math.max.apply(null, maxRow);
            allredAutocompleted = true;
        }

        var allblueAutoCoords = Array(10).fill().map(()=>Array(10).fill());
        var allblueAutoMax = 0;
        var allblueAutocompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                blueAutoCoords[i][j] = 0;
            }
        }
        if (blueStats) {
            for(i = 0; i < 3; i++) {
                for(var k = 0; k < Object.keys(blueStats[i].qm).length; k++) {
                    var qual = blueStats[i].qm[Object.keys(blueStats[i].qm)[k]]
                    if (qual && qual.autoCoordinatesList) {
                        for (j = 0; j < blueStats[i].qm[Object.keys(blueStats[i].qm)[k]].autoCoordinatesList.length; j++) {
                            // console.log(qual.autoCoordinatesList);
                            try {
                                allblueAutoCoords[qual.autoCoordinatesList[j][0]][qual.autoCoordinatesList[j][1]] += 1;
                            }
                            catch {
                                
                            }
                        }
                    }
                }
            }
            var maxRow = allblueAutoCoords.map(function(row){ return Math.max.apply(Math, row); });
            allblueAutoMax = Math.max.apply(null, maxRow);
            allblueAutocompleted = true;
        }

        var allredTeleopCoords = Array(10).fill().map(()=>Array(10).fill());
        var allredTeleopMax = 0;
        var allredTeleopcompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                allredTeleopCoords[i][j] = 0;
            }
        }
        if (redStats) {
            for(i = 0; i < 3; i++) {
                for(var k = 0; k < Object.keys(redStats[i].qm).length; k++) {
                    var qual = redStats[i].qm[Object.keys(redStats[i].qm)[k]]
                    if (qual && qual.teleopCoordinatesList) {
                        for (j = 0; j < redStats[i].qm[Object.keys(redStats[i].qm)[k]].teleopCoordinatesList.length; j++) {
                            // console.log(qual.teleopCoordinatesList);
                            try {
                                allredTeleopCoords[qual.teleopCoordinatesList[j][0]][qual.teleopCoordinatesList[j][1]] += 1;
                            }
                            catch {
                                
                            }
                        }
                    }
                }
            }
            var maxRow = allredTeleopCoords.map(function(row){ return Math.max.apply(Math, row); });
            allredTeleopMax = Math.max.apply(null, maxRow);
            allredTeleopcompleted = true;
        }

        var allblueTeleopCoords = Array(10).fill().map(()=>Array(10).fill());
        var allblueTeleopMax = 0;
        var allblueTeleopcompleted = false;
        for(i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                allblueTeleopCoords[i][j] = 0;
            }
        }
        if (blueStats) {
            for(i = 0; i < 3; i++) {
                for(var k = 0; k < Object.keys(blueStats[i].qm).length; k++) {
                    var qual = blueStats[i].qm[Object.keys(blueStats[i].qm)[k]]
                    if (qual && qual.teleopCoordinatesList) {
                        for (j = 0; j < blueStats[i].qm[Object.keys(blueStats[i].qm)[k]].teleopCoordinatesList.length; j++) {
                            // console.log(qual.teleopCoordinatesList);
                            try {
                                allblueTeleopCoords[qual.teleopCoordinatesList[j][0]][qual.teleopCoordinatesList[j][1]] += 1;
                            }
                            catch {
                                
                            }
                        }
                    }
                }
            }
            var maxRow = allblueTeleopCoords.map(function(row){ return Math.max.apply(Math, row); });
            allblueTeleopMax = Math.max.apply(null, maxRow);
            allblueTeleopcompleted = true;
        }

        return (
            reds && blues && false? <Grid>
                <Grid.Col span={12} >
                    <Card>
                        <Title order={3}>QM {number}</Title>
                        <Space h="md" />
                        <Grid>
                            <Grid.Col span={6}>
                                <PredictionCard keys={red} alliance={redStats} color={"red"}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PredictionCard keys={blue} alliance={blueStats} color={"blue"}/>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    {
                        <Card> 
                            <Title order={4}>Autos</Title>
                            <div>
                                <img src={Field} resizeMode={'cover'} style={{width: '100%'}}/>
                                {redStats && redAutocompleted && redStats.map((team) => (
                                    team.qm[number] && team.qm[number].autoCoordinatesList && team.qm[number].autoCoordinatesList.map((coords, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: (Number(coords[0]) * multip_x + offset_x + '%'),
                                                top: (Number(coords[1]) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(' + (55+200*(redAutoCoords[coords[0]][coords[1]]/redAutoMax)) + ', 0, 0)',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50
                                            }}
                                        />
                                    ))
                                ))}
                                {blueStats && blueAutocompleted && blueStats.map((team) => (
                                    team.qm[number] && team.qm[number].autoCoordinatesList && team.qm[number].autoCoordinatesList.map((coords, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: ((9+Number(coords[0])) * multip_x + offset_x + '%'),
                                                top: (Number(coords[1]) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(0, 0, ' + (55+200*(blueAutoCoords[coords[0]][coords[1]]/blueAutoMax)) + ')',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50
                                            }}
                                        />
                                    ))
                                ))}   
                            </div>
                        </Card>
                    
                    }
                </Grid.Col>
                <Grid.Col span={6}>
                    { 
                        <Card>
                        <Title order={4}>Teleop</Title>
                        <div>
                            <img src={Field} resizeMode={'cover'} style={{width: '100%'}}/>
                            {redStats && redTeleopcompleted && redStats.map((team) => (
                                    team.qm[number] && team.qm[number].teleopCoordinatesList && team.qm[number].teleopCoordinatesList.map((coords, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: (Number(coords[0]) * multip_x + offset_x + '%'),
                                                top: (Number(coords[1]) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(' + (55+200*(redTeleopCoords[coords[0]][coords[1]]/redTeleopMax)) + ', 0, 0)',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50
                                            }}
                                        />
                                    ))
                                ))}
                            {blueStats && blueTeleopcompleted && blueStats.map((team) => (
                                    team.qm[number] && team.qm[number].teleopCoordinatesList && team.qm[number].teleopCoordinatesList.map((coords, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: ((9+Number(coords[0])) * multip_x + offset_x + '%'),
                                                top: (Number(coords[1]) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(0, 0, ' + (55+200*(blueTeleopCoords[coords[0]][coords[1]]/blueTeleopMax)) + ')',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50
                                            }}
                                        />
                                    ))
                                ))}   
                        </div>
                    </Card>
                    }
                </Grid.Col>
            </Grid> : 
            <Grid> {/* if there is no qm data */}
                <Grid.Col span={12} >
                    <Card>
                        <Title order={3}>QM {number} Robot Averages</Title>
                        <Space h="md" />
                        <Grid>
                            <Grid.Col span={6}>
                                {red1 && red2 && red3 && blue1 && blue2 && blue3 && redStats?<PrematchCard team1={red1} team2={red2} team3={red3} opps1={blue1} opps2={blue2} opps3={blue3} color={"red"} alliance={redStats} keys={red}/> : <div>Loading...</div>}
                            </Grid.Col>
                            <Grid.Col span={6}>
                                {red1 && red2 && red3 && blue1 && blue2 && blue3 && blueStats?<PrematchCard team1={blue1} team2={blue2} team3={blue3} opps1={red1} opps2={red2} opps3={red3} color={"blue"} alliance={blueStats} keys={blue}/> : <div>Loading...</div>}
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    {
                        <Card> 
                            <Title order={4}>Autos</Title>
                            <div>
                            <img src={Field} resizeMode={'cover'} style={{width: '100%'}}/>
                                {redStats && allredAutocompleted && allredAutoCoords.map((row, r) => (
                                    row.map((col, c) => (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                left: (Number(r) * multip_x + offset_x + '%'),
                                                top: (Number(c) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(' + (55+200*(allredAutoCoords[r][c]/allredAutoMax)) + ', 0, 0)',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50,
                                                display: allredAutoCoords[r][c] == 0? "none" : "block"
                                            }}
                                        />
                                    ))
                                ))}
                                {blueStats && allblueAutocompleted && allblueAutoCoords.map((row, r) => (
                                    row.map((col, c) => (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                left: ((9+Number(r)) * multip_x + offset_x + '%'),
                                                top: (Number(c) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(0, 0, ' + (55+200*(allblueAutoCoords[c][r]/allblueAutoMax)) + ')',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50,
                                                display: allblueAutoCoords[r][c] == 0? "none" : "block"
                                            }}
                                        />
                                    ))
                                ))}
                            </div>
                        </Card>
                    
                    }
                </Grid.Col>
                <Grid.Col span={6}>
                    { 
                        <Card>
                        <Title order={4}>Teleop</Title>
                        <div>
                            <img src={Field} resizeMode={'cover'} style={{width: '100%'}}/>
                                {redStats && allredTeleopcompleted && allredTeleopCoords.map((row, r) => (
                                    row.map((col, c) => (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                left: (Number(r) * multip_x + offset_x + '%'),
                                                top: (Number(c) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(' + (55+200*(allredTeleopCoords[r][c]/allredTeleopMax)) + ', 0, 0)',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50,
                                                display: allredTeleopCoords[r][c] == 0? "none" : "block"
                                            }}
                                        />
                                    ))
                                ))}
                                {blueStats && allblueTeleopcompleted && allblueTeleopCoords.map((row, r) => (
                                    row.map((col, c) => (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                left: ((9+Number(r)) * multip_x + offset_x + '%'),
                                                top: (Number(c) * multip_y + offset_y + '%'),
                                                backgroundColor: 'rgb(0, 0, ' + (55+200*(allblueTeleopCoords[c][r]/allblueTeleopMax)) + ')',
                                                width: 10,
                                                height: 10,
                                                borderRadius: 50,
                                                display: allblueTeleopCoords[r][c] == 0? "none" : "block"
                                            }}
                                        />
                                    ))
                                ))}
                            </div>
                    </Card>
                    }
                </Grid.Col>
            </Grid>
        );
    // }
}

export default Match;
