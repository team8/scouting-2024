import { useEffect, useState } from 'react';
import { Grid, Image } from '@mantine/core';
import { IconBox, IconCone, IconSquareRounded, IconCheck, IconX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';

const ModalData = (props) => {
    const [match, setMatch] = useState();
    const [blue, setBlue] = useState();
    const [red, setRed] = useState();
    const [bottom, setBottom] = useState();

    useEffect(() => {
        if (props.match[1]) {
            
            setMatch(props.match);

            if (props.match[1].autoGrid) {
                let bottomRow = 0; 
                if (props.match[1].autoGrid[0][0].includes("Hybrid")) {
                    bottomRow = 0;
                }
                if (props.match[1].autoGrid[0][2].includes("Hybrid")) {
                    bottomRow = 2;
                }
                setBottom(bottomRow);
            }
            
             
        }
        if (props.blue) {
            setBlue(props.blue);
        }
        if (props.red) {
            setRed(props.red);
        }

    }, [props.match])

    const whatIcon = (row, col, bottom) => {
        // console.log(col === bottom)
        if (col === bottom) {
     
            if (props.match[1].autoGrid[0][0] === "Hybrid") {
                return <IconSquareRounded size={24} strokeWidth={2} color={'white'} />
            } else {
                if (props.match[1].autoGrid[row][col].includes("Cube")) {
                    return <IconBox size={24} strokeWidth={2} color={'white'} />
                } else if (props.match[1].autoGrid[row][col].includes("Cone")) {
                    return <IconCone size={24} strokeWidth={2} color={'white'} />
                } else {
                    return <IconSquareRounded size={24} strokeWidth={2} color={'white'} />
                }
                
            }

        } else {
            if (!props.match[1].autoGrid[row][col].includes("Pre")) {
                if (props.match[1].autoGrid[row][col].toUpperCase().includes("CUBE")) {
                    return <IconBox size={24} strokeWidth={2} color={'white'} />
                } else {
                    return <IconCone size={24} strokeWidth={2} color={'white'} />
                }
            } else {
                return <IconSquareRounded size={24} strokeWidth={2} color={'white'} />
            }
        }
        
    }


    if (match && match[1].scouter) {
        return (
            <Grid>
                <Grid.Col span={4}>
                    <DataTable 
                        withBorder
                        withColumnBorders
                        striped
                        highlightOnHover
                        records={[
                            {column1: "Mobility", column2: (match[1].mobility ? <IconCheck size={24} strokeWidth={2} color={'green'} /> : <IconX size={24} strokeWidth={2} color={'red'}/>)},
                            {column1: "Charge Station", column2: `${match[1].autoChargeStation}`},
                            {column1: "Auto points", column2: `${match[1].autoPts}`}
                        ]}
                        columns={[
                            { accessor: 'column1', title: "Data"},
                            { accessor: 'column2', title: "Result"}
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Image maw={560} mx="auto" radius="md" src={(match[1].alliance === "blue" ? blue : red)} alt="Random field" />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DataTable 
                        withBorder
                        withColumnBorders
                        striped
                        highlightOnHover
                        records={[
                            {level1: whatIcon(0, 0, bottom), level2: whatIcon(0, 1, bottom), level3: whatIcon(0, 2, bottom)},
                            {level1: whatIcon(1, 0, bottom), level2: whatIcon(1, 1, bottom), level3: whatIcon(1, 2, bottom)},
                            {level1: whatIcon(2, 0, bottom), level2: whatIcon(2, 1, bottom), level3: whatIcon(2, 2, bottom)},
                            {level1: whatIcon(3, 0, bottom), level2: whatIcon(3, 1, bottom), level3: whatIcon(3, 2, bottom)},
                            {level1: whatIcon(4, 0, bottom), level2: whatIcon(4, 1, bottom), level3: whatIcon(4, 2, bottom)},
                            {level1: whatIcon(5, 0, bottom), level2: whatIcon(5, 1, bottom), level3: whatIcon(5, 2, bottom)},
                            {level1: whatIcon(6, 0, bottom), level2: whatIcon(6, 1, bottom), level3: whatIcon(6, 2, bottom)},
                            {level1: whatIcon(7, 0, bottom), level2: whatIcon(7, 1, bottom), level3: whatIcon(7, 2, bottom)},
                            {level1: whatIcon(8, 0, bottom), level2: whatIcon(8, 1, bottom), level3: whatIcon(8, 2, bottom)}
                        ]}
                        columns={[
                            { accessor: 'level1', title: (bottom === 2 ? "Lvl 3" : "Lvl 1"), width: 15},
                            { accessor: 'level2', title: "Lvl 2", width: 15},
                            { accessor: 'level3', title: (bottom === 2 ? "Lvl 1" : "Lvl 3"), width: 15}
                        ]}
                    
                    />
                </Grid.Col>
            </Grid>
        );
    }
}

export default ModalData;