import { useState, useEffect } from 'react';
import { Card, Title, Table, Tooltip, Text, Center, Space } from '@mantine/core';

const TeleCard = (props) => {
    const [cones, setCones] = useState([]);
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        if (props.stats) {
            let avg = props.stats.avg;
            let max = props.stats.max;
            let min = props.stats.min;

            let localN = [
                {type: 'Average', level1: avg.teleBRnAvg, level2: avg.teleMRnAvg, level3: avg.teleTRnAvg, key: 1 },
                {type: 'Maximum', level1: max.teleBRnMax, level2: max.teleMRnMax, level3: max.teleTRnMax, key: 2 },
                {type: 'Minimum', level1: min.teleBRnMin, level2: min.teleMRnMin, level3: min.teleTRnMin, key: 3 },
            ];

            let localB = [
                {type: 'Average', level1: avg.teleBRbAvg, level2: avg.teleMRbAvg, level3: avg.teleTRbAvg, key: 1 },
                {type: 'Maximum', level1: max.teleBRbMax, level2: max.teleMRbMax, level3: max.teleTRbMax, key: 2 },
                {type: 'Minimum', level1: min.teleBRbMin, level2: min.teleMRbMin, level3: min.teleTRbMin, key: 3 },
            ];

            setCones(localN);
            setCubes(localB);
        }
    }, [props]);

    if (props.stats) {
        return (
            <Card>
                <Title order={3}>Tele</Title>
                <Space h="md" />
                
                <Table highlightOnHover>
                    <thead>
                        <tr>
                            <th><Title order={4}>Cones</Title></th>
                            <th>Bottom row</th>
                            <th>Middle row</th>
                            <th>Top row</th>
                        </tr>
                    </thead>
                    <tbody>{   
                        cones.map((row) => (
                            <tr key={row.key}>
                                <td>{row.type}</td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the bottom row`}><Center><Text>{row.level1}</Text></Center></Tooltip></td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the middle row`}><Center><Text>{row.level2}</Text></Center></Tooltip></td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the top row`}><Center><Text>{row.level3}</Text></Center></Tooltip></td>
                            </tr>
                        ))
                    }</tbody>
                </Table>
                
                <Space h="md" />
                <Table highlightOnHover>
                    <thead>
                        <tr>
                            <th><Title order={4}>Cubes</Title></th>
                            <th>Bottom row</th>
                            <th>Middle row</th>
                            <th>Top row</th>
                        </tr>
                    </thead>
                    <tbody>{
                        cubes.map((row) => (
                            <tr key={row.key}>
                                <td>{row.type}</td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the bottom row`}><Center><Text>{row.level1}</Text></Center></Tooltip></td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the middle row`}><Center><Text>{row.level2}</Text></Center></Tooltip></td>
                                <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the top row`}><Center><Text>{row.level3}</Text></Center></Tooltip></td>
                            </tr>
                        ))
                    }</tbody>
                </Table>

                <Space h="md" />
                <Text><b>{`Robot died total: ${props.stats.total.diedTotal}`}</b></Text>
            </Card>
        )
    }
    
}

export default TeleCard;