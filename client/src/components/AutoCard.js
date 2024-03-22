import { useState, useEffect } from 'react';
import { Card, Title, Table, Tooltip, Text, Center, Space } from '@mantine/core';

const AutoCard = (props) => {
    const [amp, setAmp] = useState(0);
    const [speaker, setSpeaker] = useState(0);

    useEffect(() => {
        if (props.stats) {
            setAmp(Math.round(props.stats.avg.autoAmpNotes * 100)/100)
            setSpeaker(Math.round(props.stats.avg.autoSpeakerNotes * 100)/100)
        }
    }, [props]);

    return (
        <Card>
            <Title order={3}>Auto</Title>
            <Space h="md" />
            
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th><Title order={4}>Amp Notes</Title></th>
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
            {/* <AutoModal matches={props.matches} /> */}

        </Card>
    )
}

export default AutoCard;