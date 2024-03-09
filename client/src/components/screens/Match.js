import { useState, useEffect } from "react"; 
import { Card, Grid, Title, Space, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

import AllianceTable from "../AllianceTable";
import PredictionCard from "../PredictionCard";
import TeamImage from '../TeamImage';

const Match = (props) => {
    const { number } = useParams();
    const [loading, setLoading] = useState();
    const [red, setRed] = useState(); // list of red alliance teams
    const [blue, setBlue] = useState(); // list of blue alliance teams
    const [reds, setReds] = useState();
    const [blues, setBlues] = useState();
    const [redStats, setRedStats] = useState();
    const [blueStats, setBlueStats] = useState();
    
    useEffect(() => {
        setLoading(true);
    }, [props.event, number]);

    useEffect(() => {
        const getTeams = async () => {
            await fetch(`https://www.thebluealliance.com/api/v3/match/${props.event}_qm${number}/simple`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" }})
                .then((response) => response.json())
                .then((data) => {
                    setRed(data.alliances.red.team_keys);
                    setBlue(data.alliances.blue.team_keys);
                });
        }
        getTeams();
    }, [loading]);

    useEffect(() => {
        const asyncFunction = async () => {
            const setTeams = async (teams) => {
                let array = [];
                for (var i in teams) {
                    await fetch(`https://server.palyrobotics.com/team/${props.event}/${teams[i].replace(/frc/g, '')}/${number}`)
                        .then((response) => response.json())
                        .then((data) => {
                            array.push(Object.assign({}, data));
                        });
                }
                return array;
            }

            const setStats = async (teams) => {
                let array = [];
                for (var i in teams) {
                    await fetch(`https://server.palyrobotics.com/team/${props.event}/${teams[i].replace(/frc/g, '')}`)
                        .then((response) => response.json())
                        .then((data) => {
                            array.push(Object.assign({}, data));
                        })
                }
                return array;
            }

            if (blue) {
                let redArray = await setTeams(red);
                let blueArray = await setTeams(blue);

                let redStats = await setStats(red);
                let blueStats = await setStats(blue);

                setReds(redArray);
                setBlues(blueArray);
                setRedStats(redStats);
                setBlueStats(blueStats);

                setLoading(false);
            } 
        }
        asyncFunction();
        
    }, [blue])
    
    if (loading) return (
        <div className="container">Loading...</div>
    );
    
    if (blues && typeof(blues[0].team) !== 'undefined') {
        return (
            <Card>
                <Title order={3}>Qual {number}</Title>
                <Space h="md" />
                <Grid>
                    <Grid.Col span={12}>
                        <AllianceTable red={reds} blue={blues} />
                    </Grid.Col>
                </Grid>
            </Card>        
        );
    } else {
        return (
            <Grid>
                <Grid.Col span={12} >
                    <Card>
                        <Title order={3}>Prediction</Title>
                        <Space h="md" />
                        <Grid>
                            <Grid.Col span={6}>
                                <PredictionCard keys={red} alliance={redStats} color={"red"}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PredictionCard keys={blue} alliance={blueStats} color={"blue"}/>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    { redStats &&
                        redStats.map((team, key) => (
                            <>
                                <Card>
                                    <Title order={4}>{`${team.name} - ${red[key].replace("frc", "")}`}</Title>
                                    <TeamImage image={(team.pit || {}).robotImage} />
                                </Card>
                            </>
                        ))
                    }
                </Grid.Col>
                <Grid.Col span={6}>
                    { blueStats && 
                        blueStats.map((team, key) => (
                            <>
                                <Card>
                                    <Title order={4}>{`${team.name} - ${blue[key].replace("frc", "")}`}</Title>
                                    <TeamImage image={(team.pit || {}).robotImage} />
                                </Card>
                            </>
                        ))
                    }
                </Grid.Col>
            </Grid>
        );
    }
}

export default Match;