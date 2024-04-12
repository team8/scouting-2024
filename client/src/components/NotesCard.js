import { useEffect, useState } from 'react';
import { Table, Card, Space, Title, Text, Group } from '@mantine/core';

const NotesCard = (props) => {
    const [rows, setRows] = useState();

    useEffect(() => {
        if (props.matches) {
            let array = Object.entries(props.matches);            
            let row = [];
            
            for (var i = 0; i < array.length; i++) {
                row.push(Object.create({
                    "match": array[i][0],
                    "notes": array[i][1].notes?.replace(/[<>]/g, ' '),
                    "charge": array[i][1].climbNotes?.replace(/[<>]/g, ' '),
                    "scouter": array[i][1].scouter,
                    "key": i
                }));
            }
            setRows(row);
        }
    }, [props]);
    
    return (
        <Card>
            <Title order={3}>Notes</Title>
            <Space h="md" />
            <Table highlightOnHover>
            <thead>
                <tr>
                    <th>Qual</th>
                    <th>Notes</th>
                    <th>Charge Notes</th>
                    <th>Scouter</th>
                </tr>
            </thead>
            <tbody>{
                rows && rows.map((row) => (
                    <tr key={row.key}>
                        <td><Text>{row.match}</Text></td>
                        <td><Text>{row.notes}</Text></td>
                        <td><Text>{row.charge}</Text></td>
                        <td><Text>{row.scouter}</Text></td>
                    </tr>
                ))
            }</tbody>
        </Table>
        </Card>
        
    )

}

export default NotesCard;