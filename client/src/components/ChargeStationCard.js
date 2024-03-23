import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

const ChargeStationCard = (props) => {
    const [robotDied, setRobotDied] = useState(0);
    // useEffect(() => {
    //     console.log(props.stats)
    // })

    useEffect(() => {
        if (props.stats) {
            setRobotDied(props.stats.total.died)
        }
    }, [props]);

    return (
        (props.stats &&
            <Card>
                <Title order={3}>Endgame</Title>

                <Grid grow  >
                    <Grid.Col span={4} >
                        <Flex justify='center'>
                            <Title order={4} >Stage %</Title>
                        </Flex>

                        <Table>

                            <thead>
                                <tr>
                                    <th>N/A</th>
                                    <th>Parked</th>
                                    <th>Climb</th>
                                    <th>Harmony</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    {props.stats ? (
                                        <>
                                            <td>{Math.round((1 - (props.stats.percent.parkPercent + props.stats.percent.climbPercent + props.stats.percent.harmonyPercent)) * 10000)/100}</td>
                                            <td>{Math.round(props.stats.percent.parkPercent * 10000)/100}</td>
                                            <td>{Math.round(props.stats.percent.climbPercent * 10000)/100}</td>
                                            <td>{Math.round(props.stats.percent.harmonyPercent * 10000)/100}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </>

                                    )
                                    }

                                </tr>
                            </tbody>

                        </Table>
                        <Space h="md"/>

                        
                            <Table highlightOnHover>
                                <thead>
                                    <tr >
                                    <th>Avg. Trap</th>
                                    <th>Died</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                <tr>

                                    {props.stats ? (
                                        <>
                                            <td>{Math.round(props.stats.avg.traps*100)/100}</td>
                                            <td>{robotDied}</td>
                                            <td></td>
                                            <td></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>0</td>
                                            <td>0</td>
                                            <td></td>
                                            <td></td>
                                        </>

                                    )
                                    }

                                </tr>
                            </tbody>
                            </Table>



                    </Grid.Col>
                    <Divider orientation="vertical" size='sm' />
                </Grid>



            </Card>
        )
    );
}

export default ChargeStationCard;