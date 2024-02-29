import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';

const ChargeStationCard = (props) => {

    return (
        <Card>
            <Title order={3}>Charge Station</Title>

            <Grid grow  >
                <Grid.Col span={4} >
                    <Flex justify='center'>
                        <Title order={4} >Auto</Title>
                    </Flex>

                    <Table>

                        <thead>
                            <tr>
                                <th>N/A</th>
                                <th>Attempt</th>
                                <th>Docked</th>
                                <th>Engaged</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                
                                {props.stats ? (
                                    <>
                                    <td>{ props.stats.total.autoNoAttemptTot}</td>
                                    <td>{props.stats.total.autoAttemptedTot }</td>
                                    <td>{ props.stats.total.autoDockedTot}</td>
                                    <td>{props.stats.total.autoEngaged}</td>
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
                <Grid.Col span={4} style={{}}>
                    <Flex justify='center'>
                        <Title order={4}>Endgame</Title>
                    </Flex>

                    <Table>

                        <thead>
                            <tr>
                                <th>N/A</th>
                                <th>Parked</th>
                                <th>Docked</th>
                                <th>Engaged</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {props.stats ? (
                                    <>
                                    <td>{ props.stats.total.endgameNoAttemptTot}</td>
                                    <td>{props.stats.total.endgameAttemptedTot }</td>
                                    <td>{ props.stats.total.endgameDockedTot}</td>
                                    <td>{props.stats.total.endgameEngaged}</td>
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
            </Grid>



        </Card>
    );
}

export default ChargeStationCard;