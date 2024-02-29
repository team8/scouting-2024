import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';

const PredictionCard = (props) => {
    const [teams, setTeams] = useState();
    const [keys, setKeys] = useState();

    useEffect(() => {
        if (props.alliance) {
            console.log(props.alliance[0])
            setTeams(props.alliance);
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
                        column1: (keys[0].replace("frc", "")),
                        column2: (teams[0].stats.avg.autoPtsAvg),
                        column3: (teams[0].stats.avg.telePtsAvg),
                        column4: (teams[0].stats.avg.endgamePtsAvg),
                        column5: (teams[0].stats.avg.ptContributionAvg),
                    },
                    {
                        column1: (keys[1].replace("frc", "")),
                        column2: (teams[1].stats.avg.autoPtsAvg),
                        column3: (teams[1].stats.avg.telePtsAvg),
                        column4: (teams[1].stats.avg.endgamePtsAvg),
                        column5: (teams[1].stats.avg.ptContributionAvg),
                    },
                    {
                        column1: (keys[2].replace("frc", "")),
                        column2: (teams[2].stats.avg.autoPtsAvg),
                        column3: (teams[2].stats.avg.telePtsAvg),
                        column4: (teams[2].stats.avg.endgamePtsAvg),
                        column5: (teams[2].stats.avg.ptContributionAvg),
                    },
                    {
                        column1: "Alliance",
                        column2: <b>{teams[0].stats.avg.autoPtsAvg + teams[1].stats.avg.autoPtsAvg + teams[2].stats.avg.autoPtsAvg}</b>,
                        column3: <b>{teams[0].stats.avg.telePtsAvg + teams[1].stats.avg.telePtsAvg + teams[2].stats.avg.telePtsAvg}</b>,
                        column4: <b>{teams[0].stats.avg.endgamePtsAvg + teams[1].stats.avg.endgamePtsAvg + teams[2].stats.avg.endgamePtsAvg}</b>,
                        column5: <b>{teams[0].stats.avg.ptContributionAvg + teams[1].stats.avg.ptContributionAvg + teams[2].stats.avg.ptContributionAvg}</b>,
                    }
                ]}
                columns={[
                    { accessor: 'column1', title: "Team / Avg pts", width: 20, textAlignment: 'center', ellipsis: true},
                    { accessor: 'column2', title: "Auto", width: 15, textAlignment: 'center'},
                    { accessor: 'column3', title: "Tele", width: 15, textAlignment: 'center'},
                    { accessor: 'column4', title: "Endgame", width: 15, textAlignment: 'center'},
                    { accessor: 'column5', title: "Total", width: 15, textAlignment: 'center'},
                ]}
            />
                        
        );
    }
    
}

export default PredictionCard;