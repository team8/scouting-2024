import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

const ChargeStationCard = (props) => {
    // useEffect(() => {
    //     console.log(props.stats)
    // })

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
                                            <td>{(1 - (props.stats.percent.parkPercent + props.stats.percent.climbPercent + props.stats.percent.harmonyPercent)) * 100}</td>
                                            <td>{props.stats.percent.parkPercent * 100}</td>
                                            <td>{props.stats.percent.climbPercent * 100}</td>
                                            <td>{props.stats.percent.harmonyPercent * 100}</td>
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

                        <Flex justify='center'>
                            <Table highlightOnHover>
                                <thead>
                                    <tr >
                                        <th ><Title order={4}>Avg Trap</Title></th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    props.stats.avg.traps
                                }</tbody>
                            </Table>
                        </Flex>



                    </Grid.Col>
                    <Divider orientation="vertical" size='sm' />
                </Grid>



            </Card>
        )
    );
}

export default ChargeStationCard;