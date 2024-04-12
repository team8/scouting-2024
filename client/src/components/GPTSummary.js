import { useState } from 'react';
import { Table, Card, Space, Title } from '@mantine/core';
import OpenAI from 'openai';

const openai = new OpenAI();

const GPTSummary = (props) => {
    
    const matches = props.matches;
    const [notesList, setNotesList] = useState([]);

    for(let x in matches) {
        let temp = notesList;
        temp.push(x.notes?.replace(/[<>]/g, ' '));
        setNotesList(temp);
    }

    const completion = openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"}],
        model: "gpt-3.5-turbo",
    });
    
    console.log(completion.choices[0].message.content);

    return(
        <Card>
            <Title order={3}>GPT Summary</Title>
            <Space h="md" />
            <Table highlightOnHover>
            <thead>
                <tr>
                    <tbody>
                    {completion.choices[0].message.content}
                    </tbody>
                </tr>
            </thead>

            </Table>

        </Card>
    )

}

export default GPTSummary;