import { Card, Divider, Text, Title, Group, Center, Table, Grid, Flex, Space } from '@mantine/core';
import { useEffect, useState } from 'react';

const RatingCard = (props) => {
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
                    <th>Climb</th>
                </tr>
            </thead>
            <tbody>{
                
                    <tr>
                        {props.stats ? (
                                    <>
                                    <td>{props.stats.avg.intakeRating === 0 ? 'N/A' :props.stats.avg.intakeRating}</td>
                                    <td>{ props.stats.avg.driverRating === 0 ? 'N/A' :props.stats.avg.driverRating}</td>
                                    <td>{props.stats.avg.defenseRating === 0 ? 'N/A' :props.stats.avg.defenseRating}</td>
                                    <td>{props.stats.avg.climbRating === 0 ? 'N/A' :props.stats.avg.climbRating}</td>

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