import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

const RatingCard = (props) => {
    console.log(props)
    return (
        <Card>
           <Title order={3}>Avg Ratings</Title>
            <Space h="md" />
            <Table highlightOnHover>
            <thead>
                <tr>
                    <th>Intake</th>
                    <th>Driving</th>
                    <th>Defense</th>
                </tr>
            </thead>
            <tbody>{
                
                    <tr>
                        {props.stats ? (
                                    <>
                                    <td>{props.stats.avg.intakeRatingAvg === 0 ? 'N/A' :props.stats.avg.intakeRatingAvg}</td>
                                    <td>{ props.stats.avg.driverRatingAvg === 0 ? 'N/A' :props.stats.avg.driverRatingAvg}</td>
                                    <td>{props.stats.avg.defenseRatingAvg === 0 ? 'N/A' :props.stats.avg.defenseRatingAvg}</td>
                                    </>
                                ) : (
                                    <>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    </>
                                    
                                )
                            }
                    </tr>
               
            }</tbody>
        </Table>



        </Card>
    );
}

export default RatingCard;