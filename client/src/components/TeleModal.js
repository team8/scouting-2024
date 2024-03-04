import { useEffect, useState } from 'react';
import { Modal, Group, Button, Accordion, Image, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import ModalData from './ModalData';
import blueMiddle from '../assets/blue-middle.jpg';
import redMiddle from '../assets/red-middle.jpg';
import blueLower from '../assets/blue-lower.jpg'
import redLower from '../assets/red-lower.jpg';
import blueUpper from '../assets/blue-upper.jpg';
import redUpper from '../assets/red-upper.jpg';

const TeleModal = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [matches, setMatches] = useState();

    useEffect(() => {
        if (props.matches) {
            setMatches(Object.entries(props.matches));

        }
    }, [props]);


    // blue lower 1xsYf67RbjGboPJTIIY5IJRTYBINHaOCi
    // blue middle 1k7091pXb3KnvGvsRxn3OQ4rJn6XWxUmP
    // blue upper 1kaiT66FVgBxbfBdqeLlXlRWiWPGyfL-l

    // red lower 1vn0HN_M0hq0voQJP97z7ybObkmTgB24Q
    // red middle 1PVkIF82MXbDtxdsYSgg_LomBEP5lSlzl
    // red upper 12Yg3rb0noIeQY_Mb8b-nnMKB3aMtcv5y

    return (
        <>
            <Modal opened={opened} onClose={close} centered size="100%">
                <Accordion variant="separated">
                    {
                        matches && matches.map((match, key) => (
                            <Accordion.Item value={`${match[0]}`}>
                                <Accordion.Control disabled={(match[1].scouter ? false : true)}>{`Quals ${match[0]}`}</Accordion.Control>
                                <Accordion.Panel>
                                    {match.startingPosition === "middle" ?
                                        <ModalData match={match} blue={blueMiddle} red={redMiddle}/>
                                        : match.startingPosition === "inside" ?
                                            <ModalData match={match} blue={blueLower} red={redLower}/>
                                            :
                                            <ModalData match={match} blue={blueUpper} red={redUpper}/>
                                    }
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </Modal>

            <Group position="center">
                <Button color="teal" onClick={open}>Get Paths</Button>
            </Group>
        </>
    );
}

export default TeleModal;