import { useState, useEffect } from 'react';
import { Card, Title, Table, Tooltip, Text, Center, Space } from '@mantine/core';

const TeleCard = (props) => {
    const [amp, setAmp] = useState(0);
    const [speaker, setSpeaker] = useState(0);
    const [robotDied, setRobotDied] = useState(0);

    useEffect(() => {
        if (props.stats) {
            setAmp(Math.round(props.stats.avg.teleopAmpNotes * 100)/100)
            setSpeaker(Math.round(props.stats.avg.teleopSpeakerNotes * 100)/100)
            setRobotDied(props.stats.total.died)
        }
    }, [props]);

        return (
            <Card>
                <Title order={3}>Tele</Title>
                <Space h="md" />
                
                <Table highlightOnHover>
                    <thead>
                        <tr>
                            <th><Title order={4}>Amp</Title></th>
                        </tr>
                    </thead>
                    <tbody>{
                        amp
                    }</tbody>
                </Table>
                
                <Space h="md" />
                <Table highlightOnHover>
                    <thead>
                        <tr>
                            <th><Title order={4}>Speaker</Title></th>
                        </tr>
                    </thead>
                    <tbody>{
                        speaker
                    }</tbody>
                </Table>

                <Space h="md" />
                <Text><b>{`Robot died total: ${robotDied}`}</b></Text>

                <Space h="md" />
                {/* <TeleModal matches={props.matches} /> */}
            </Card>
        )
    
}

export default TeleCard;