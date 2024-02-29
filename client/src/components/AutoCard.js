import { useState, useEffect } from 'react';
import { Card, Title, Table, Tooltip, Text, Center, Space } from '@mantine/core';

import AutoModal from './AutoModal';

const AutoCard = (props) => {
    const [cones, setCones] = useState([]);
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        if (props.stats) {
            let avg = props.stats.avg;
            let max = props.stats.max;
            let min = props.stats.min;
            console.log(avg)

            let localN = [
                {type: 'Average', level1: avg.autoBRnAvg, level2: avg.autoMRnAvg, level3: avg.autoTRnAvg, key: 1 },
                {type: 'Maximum', level1: max.autoBRnMax, level2: max.autoMRnMax, level3: max.autoTRnMax, key: 2 },
                {type: 'Minimum', level1: min.autoBRnMin, level2: min.autoMRnMin, level3: min.autoTRnMin, key: 3 },
            ];

            let localB = [
                {type: 'Average', level1: avg.autoBRbAvg, level2: avg.autoMRbAvg, level3: avg.autoTRbAvg, key: 1 },
                {type: 'Maximum', level1: max.autoBRbMax, level2: max.autoMRbMax, level3: max.autoTRbMax, key: 2 },
                {type: 'Minimum', level1: min.autoBRbMin, level2: min.autoMRbMin, level3: min.autoTRbMin, key: 3 },
            ];

            setCones(localN);
            setCubes(localB);
        }
    }, [props]);

    const cubeRows = cubes.map((row) => (
        <tr key={row.key}>
            <td>{row.type}</td>
            <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the bottom row`}><Center><Text>{row.level1}</Text></Center></Tooltip></td>
            <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the middle row`}><Center><Text>{row.level2}</Text></Center></Tooltip></td>
            <td><Tooltip multiline width={180} openDelay={500} withArrow label={`${row.type} amount of cones scored on the top row`}><Center><Text>{row.level3}</Text></Center></Tooltip></td>
        </tr>
    ));

    return (
        <Card>
            <Title order={3}>Auto</Title>
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
            <AutoModal matches={props.matches} />

        </Card>
    )
}

export default AutoCard;