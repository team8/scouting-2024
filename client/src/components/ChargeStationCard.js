import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';

const ChargeStationCard = (props) => {
    useEffect(()=>{
        console.log(props.stats.total)
    })

    return (
        <Card>
            <Title order={3}>Stage</Title>

            <Grid grow  >
                <Grid.Col span={4} >
                    <Flex justify='center'>
                        <Title order={4} >Endgame</Title>
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
                                    <td>{ props.stats.total.totalNoAttempt}</td>
                                    <td>{props.stats.total.parked }</td>
                                    <td>{ props.stats.total.totalClimb}</td>
                                    <td>{props.stats.total.totalHarmony}</td>
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

                </Grid.Col>
                <Divider orientation="vertical" size='sm' />
            </Grid>



        </Card>
    );
}

export default ChargeStationCard;