import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';

const PrematchCard = (props) => {
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [team3, setTeam3] = useState();

    const [opps1, setOpps1] = useState();
    const [opps2, setOpps2] = useState();
    const [opps3, setOpps3] = useState();
    
    const [allTimeToggle, setToggle] = useState(true);

    const [teams, setTeams] = useState();
    const [keys, setKeys] = useState();

    useEffect(() => {
        if (props.alliance && keys) {
            let correctedTeams = []
            
            Object.keys(props.alliance).map((i)=> {
                
                console.log(props.alliance[i])
                correctedTeams.push({"key": keys[i].slice(3), "match": (props.alliance[i].qm || {})})
            })
            setTeams(correctedTeams);
        }
        if (props.keys) {
            setKeys(props.keys);
        }
    }, [props])

    useEffect(() => {
        if (props) {
            setTeam1(props.team1);
            setTeam2(props.team2);
            setTeam3(props.team3);
            setOpps1(props.opps1);
            setOpps2(props.opps2);
            setOpps3(props.opps3);
        }
      });

    const toggle = () => {
        setToggle(!allTimeToggle);
      };

    if (team1 && team2 && team3 && opps1 && opps2 && opps3) {
        if (allTimeToggle) 
            return ( 
                <>
                    <DataTable 
                        withBorder
                        withColumnBorders
                        striped
                        highlightOnHover
                        borderColor={(props.color)}
                        records={[
                            {
                                column1: ("Autos Points"),
                                column2: (team1.epa.breakdown.auto_points.mean),
                                column3: (team2.epa.breakdown.auto_points.mean),
                                column4: (team3.epa.breakdown.auto_points.mean),
                                
                            },
                            {
                                column1: ("Autos Notes"),
                                column2: (team1.epa.breakdown.auto_notes.mean),
                                column3: (team2.epa.breakdown.auto_notes.mean),
                                column4: (team3.epa.breakdown.auto_notes.mean),
                            },
                            {
                                column1: ("Autos Note Points"),
                                column2: (team1.epa.breakdown.auto_note_points.mean),
                                column3: (team2.epa.breakdown.auto_note_points.mean),
                                column4: (team3.epa.breakdown.auto_note_points.mean),
                            },
                            {
                                column1: ("Teleop Points"),
                                column2: (team1.epa.breakdown.teleop_points.mean),
                                column3: (team2.epa.breakdown.teleop_points.mean),
                                column4: (team3.epa.breakdown.teleop_points.mean),
                                
                            },
                            {
                                column1: ("Teleop Notes"),
                                column2: (team1.epa.breakdown.teleop_notes.mean),
                                column3: (team2.epa.breakdown.teleop_notes.mean),
                                column4: (team3.epa.breakdown.teleop_notes.mean),
                            },
                            {
                                column1: ("Teleop Note Points"),
                                column2: (team1.epa.breakdown.teleop_note_points.mean),
                                column3: (team2.epa.breakdown.teleop_note_points.mean),
                                column4: (team3.epa.breakdown.teleop_note_points.mean),
                            },
                            {
                                column1: ("Amp Notes"),
                                column2: (team1.epa.breakdown.amp_notes.mean),
                                column3: (team2.epa.breakdown.amp_notes.mean),
                                column4: (team3.epa.breakdown.amp_notes.mean),
                                
                            },
                            {
                                column1: ("Speaker Notes"),
                                column2: (team1.epa.breakdown.speaker_notes.mean),
                                column3: (team2.epa.breakdown.speaker_notes.mean),
                                column4: (team3.epa.breakdown.speaker_notes.mean),
                            },
                            {
                                column1: ("Stage Points"),
                                column2: (team1.epa.breakdown.endgame_on_stage_points.mean),
                                column3: (team2.epa.breakdown.endgame_on_stage_points.mean),
                                column4: (team3.epa.breakdown.endgame_on_stage_points.mean),
                            },
                            {
                                column1: ("Estimated Points"),
                                column2: ((team1.epa.breakdown.total_points.mean + team2.epa.breakdown.total_points.mean + team3.epa.breakdown.total_points.mean).toFixed(0)),
                                column3: ("Win Percentage"),
                                column4: (((1 / ( 1 + Math.pow(10,( ((opps1.epa.breakdown.total_points.mean + opps2.epa.breakdown.total_points.mean + opps3.epa.breakdown.total_points.mean) - (team1.epa.breakdown.total_points.mean + team2.epa.breakdown.total_points.mean + team3.epa.breakdown.total_points.mean)) / 30 )) ) ) * 100).toFixed(2) + '%'),
                            }
                        ]}
                        columns={[
                            { accessor: 'column1', title: "Data", width: 20, textAlignment: 'center', ellipsis: true},
                            { accessor: 'column2', title: String(team1.team), width: 15, textAlignment: 'center'},
                            { accessor: 'column3', title: String(team2.team), width: 15, textAlignment: 'center'},
                            { accessor: 'column4', title: String(team3.team), width: 15, textAlignment: 'center'}, 
                            // Replace with keys String(teams[0].team) -> keys
                        ]}
                    />
                <Button onClick={toggle}>
                    All Time Data To Current
                </Button>
            </>          
        ); 
        else
        return (
            <>
                <DataTable 
                    withBorder
                    withColumnBorders
                    striped
                    highlightOnHover
                    borderColor={(props.color === "red" ? props.color : props.color)}
                    records={[
                        {
                            // column1: (keys[0].replace("frc", "")),
                            column1: ("Autos Scored"),
                            column2: (teams[0].match.autoSpeakerNotes + teams[0].match.autoAmpNotes),
                            column3: (teams[1].match.autoSpeakerNotes + teams[1].match.autoAmpNotes),
                            column4: (teams[2].match.autoSpeakerNotes + teams[2].match.autoAmpNotes),
                            
                        },
                        {
                            column1: ("Autos Failed"),
                            column2: (teams[0].match.autoFailedSpeakerNotes + teams[0].match.autoFailedAmpNotes),
                            column3: (teams[1].match.autoFailedSpeakerNotes + teams[1].match.autoFailedAmpNotes),
                            column4: (teams[2].match.autoFailedSpeakerNotes + teams[2].match.autoFailedAmpNotes),
                        },
                        {
                            column1: ("Teleop Scored"),
                            column2: (teams[0].match.teleopSpeakerNotes + teams[0].match.teleopAmpNotes),
                            column3: (teams[1].match.teleopSpeakerNotes + teams[1].match.teleopAmpNotes),
                            column4: (teams[2].match.teleopSpeakerNotes + teams[2].match.teleopAmpNotes),
                        },
                        {
                            column1: ("Teleop Failed"),
                            column2: (teams[0].match.teleopFailedSpeakerNotes + teams[0].match.teleopFailedAmpNotes),
                            column3: (teams[1].match.teleopFailedSpeakerNotes + teams[1].match.teleopFailedAmpNotes),
                            column4: (teams[2].match.teleopFailedSpeakerNotes + teams[2].match.teleopFailedAmpNotes),
                        },
                        {
                            column1: ("Total Points"),
                            column2: (teams[0].match.pointsScored),
                            column3: (teams[1].match.pointsScored),
                            column4: (teams[2].match.pointsScored),
                        },
                        {
                            column1: ("Speaker Accuracy"),
                            column2: (teams[0].match.speakerAccuracy * 100).toFixed(2) + "%",
                            column3: (teams[1].match.speakerAccuracy * 100).toFixed(2) + "%",
                            column4: (teams[2].match.speakerAccuracy * 100).toFixed(2) + "%",
                        },
                        {
                            column1: ("Amp Accuracy"),
                            column2: (teams[0].match.ampAccuracy * 100).toFixed(2) + "%",
                            column3: (teams[1].match.ampAccuracy * 100).toFixed(2) + "%",
                            column4: (teams[2].match.ampAccuracy * 100).toFixed(2) + "%",
                        },
                        {
                            column1: ("Climb Status"),
                            column2: (teams[0].match.climbStatus),
                            column3: (teams[1].match.climbStatus),
                            column4: (teams[2].match.climbStatus),
                        },
                        {
                            column1: ("Died"),
                            column2: (teams[0].match.died?"Buddy Died" : "he livin"),
                            column3: (teams[1].match.died?"Buddy Died" : "he livin"),
                            column4: (teams[2].match.died?"Buddy Died" : "he livin"),
                        }
                    ]}
                    columns={[
                        { accessor: 'column1', title: "Data", width: 20, textAlignment: 'center', ellipsis: true},
                        { accessor: 'column2', title: String(team1.team), width: 15, textAlignment: 'center'},
                        { accessor: 'column3', title: String(team2.team), width: 15, textAlignment: 'center'},
                        { accessor: 'column4', title: String(team3.team), width: 15, textAlignment: 'center'}, 
                        // Replace with keys String(teams[0].team) -> keys
                    ]}
                />
            <Button onClick={toggle}>
                Current To All Time Data
            </Button>
        </>          
        );
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default PrematchCard;