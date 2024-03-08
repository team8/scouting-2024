import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';

const AllianceTable = (props) => {
    const [red, setRed] = useState();
    const [blue, setBlue] = useState();

    useEffect(() => {
        if (props) {
            setRed(props.red);
            setBlue(props.blue);
        }
    }, [props]);
    
    if (blue) {
        return (
            <DataTable
                withBorder
                // borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                // provide data
                records={[
                    { // mobility
                        column1: (red[0].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>), 
                        column2: (red[1].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>), 
                        column3: (red[2].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>),
                        data: "Mobility",
                        column4: (blue[0].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>), 
                        column5: (blue[1].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>), 
                        column6: (blue[2].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>),
                    }, 
                    { // cube piece count auto
                        column1: (red[0].autoTRb + red[0].autoMRb + red[0].autoBRb),
                        column2: (red[1].autoTRb + red[1].autoMRb + red[1].autoBRb),
                        column3: (red[2].autoTRb + red[2].autoMRb + red[2].autoBRb),
                        data: "Auto cubes",
                        column4: (blue[0].autoTRb + blue[0].autoMRb + blue[0].autoBRb),
                        column5: (blue[1].autoTRb + blue[1].autoMRb + blue[1].autoBRb),
                        column6: (blue[2].autoTRb + blue[2].autoMRb + blue[2].autoBRb),

                    },
                    { // cone piece count auto
                        column1: (red[0].autoTRn + red[0].autoMRn + red[0].autoBRn),
                        column2: (red[1].autoTRn + red[1].autoMRn + red[1].autoBRn),
                        column3: (red[2].autoTRn + red[2].autoMRn + red[2].autoBRn),
                        data: "Auto cones",
                        column4: (blue[0].autoTRn + blue[0].autoMRn + blue[0].autoBRn),
                        column5: (blue[1].autoTRn + blue[1].autoMRn + blue[1].autoBRn),
                        column6: (blue[2].autoTRn + blue[2].autoMRn + blue[2].autoBRn),
                    },
                    { // auto charge station
                        column1: (red[0].autoChargeStation),
                        column2: (red[1].autoChargeStation),
                        column3: (red[2].autoChargeStation),
                        data: "Auto CS",
                        column4: (blue[0].autoChargeStation),
                        column5: (blue[1].autoChargeStation),
                        column6: (blue[2].autoChargeStation),
                    },
                    { // total auto points
                        column1: (red[0].autoPts),
                        column2: (red[1].autoPts),
                        column3: (red[2].autoPts),
                        data: "Auto points",
                        column4: (blue[0].autoPts),
                        column5: (blue[1].autoPts),
                        column6: (blue[2].autoPts),
                    },
                    { // cube piece count teleop
                        column1: (red[0].teleTRb + red[0].teleMRb + red[0].teleBRb),
                        column2: (red[1].teleTRb + red[1].teleMRb + red[1].teleBRb),
                        column3: (red[2].teleTRb + red[2].teleMRb + red[2].teleBRb),
                        data: "Tele cubes",
                        column4: (blue[0].teleTRb + blue[0].teleMRb + blue[0].teleBRb),
                        column5: (blue[1].teleTRb + blue[1].teleMRb + blue[1].teleBRb),
                        column6: (blue[2].teleTRb + blue[2].teleMRb + blue[2].teleBRb),
                    },
                    { // cone piece count teleop
                        column1: (red[0].teleTRn + red[0].teleMRn + red[0].teleBRn),
                        column2: (red[1].teleTRn + red[1].teleMRn + red[1].teleBRb),
                        column3: (red[2].teleTRb + red[2].teleMRb + red[2].teleBRb),
                        data: "Tele cones",
                        column4: (blue[0].teleTRn + blue[0].teleMRn + blue[0].teleBRn),
                        column5: (blue[1].teleTRn + blue[1].teleMRn + blue[1].teleBRb),
                        column6: (blue[2].teleTRb + blue[2].teleMRb + blue[2].teleBRb),
                    },
                    { // total tele points
                        column1: (red[0].telePts),
                        column2: (red[1].telePts),
                        column3: (red[2].telePts),
                        data: "Tele points",
                        column4: (blue[0].telePts),
                        column5: (blue[1].telePts),
                        column6: (blue[2].telePts),
                    },
                    { // endgame charge station
                        column1: (red[0].endgameChargeStation),
                        column2: (red[1].endgameChargeStation),
                        column3: (red[2].endgameChargeStation),
                        data: "Endgame CS",
                        column4: (blue[0].endgameChargeStation),
                        column5: (blue[1].endgameChargeStation),
                        column6: (blue[2].endgameChargeStation),
                    },
                    { // total point contribution
                        column1: (red[0].ptContribution),
                        column2: (red[1].ptContribution),
                        column3: (red[2].ptContribution),
                        data: "Pt. contribution",
                        column4: (blue[0].ptContribution),
                        column5: (blue[1].ptContribution),
                        column6: (blue[2].ptContribution)
                    }
                
                // more records...
                ]}
                // define columns
                columns={[
                { accessor: 'column1', title: `${red[0].team}`, width: 40, textAlignment: 'center'},
                { accessor: 'column2', title: `${red[1].team}`, width: 40, textAlignment: 'center'},
                { accessor: 'column3', title: `${red[2].team}`, width: 40, textAlignment: 'center'},
                { accessor: 'data', title: "Data", width: 30, textAlignment: 'center'},
                { accessor: 'column4', title: `${blue[0].team}`, width: 40, textAlignment: 'center'},
                { accessor: 'column5', title: `${blue[1].team}`, width: 40, textAlignment: 'center'},
                { accessor: 'column6', title: `${blue[2].team}`, width: 40, textAlignment: 'center'}
                ]}
            />
        );
    }
    
     
}

export default AllianceTable;