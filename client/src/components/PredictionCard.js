import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PredictionCard = (props) => {
    const [teams, setTeams] = useState();
    const [keys, setKeys] = useState();

    const { number } = useParams();


    useEffect(() => {
        if (props.alliance && keys) {
            let correctedTeams = []
            
            Object.keys(props.alliance).map((i)=> {
                
                console.log(props.alliance[i])
                correctedTeams.push({"key": keys[i].slice(3), "match": (props.alliance[i].qm || {})[number]})
            })
            setTeams(correctedTeams);
        }
        if (props.keys) {
            setKeys(props.keys);
        }
    }, [props])

    if (teams) {
        return ( 
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
                    { accessor: 'column2', title: String(teams[0].key), width: 15, textAlignment: 'center'},
                    { accessor: 'column3', title: String(teams[1].key), width: 15, textAlignment: 'center'},
                    { accessor: 'column4', title: String(teams[2].key), width: 15, textAlignment: 'center'}, 
                    // Replace with keys String(teams[0].team) -> keys
                ]}
            />
                        
        );
    }
    
}

export default PredictionCard;