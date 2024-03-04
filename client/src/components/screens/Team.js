import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, Title } from '@mantine/core';

import BarChart from '../BarChart';
import TeamImage from "../TeamImage";
import AutoCard from '../AutoCard';
import NotesCard from '../NotesCard';
import TeleCard from '../TeleCard';
import ChargeStationCard from '../ChargeStationCard'
import RatingCard from '../RatingCard';


const Team = (props) => {
  const { number } = useParams();
  const [loading, setLoading] = useState(false);
  const [nick, setNick] = useState();
  const [stats, setStats] = useState();
  const [matches, setMatches] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    },1000);

  }, [number, props.event]);

  console.log(props.team);

  useEffect(() => {
    const getTeam = async () => {
      await fetch(`https://server.palyrobotics.com/team/${props.event}/${number}`)
        .then((response) => {
            response.json()
            console.log(response)
        })
        .then((team) => {
          setNick(team.name);
          console.log(team.stats)
          setStats(team.stats);
          
          setMatches(team.qm);
          setImage(team.pit.robotImage);

      });
    }

    getTeam();
  }, [loading]);

  // if (loading) return (
  //   <div className="container">Loading...</div>
  // );

  return ( 
    <Grid>
      {/* row one */}
      <Grid.Col span={8}>
        <Card>
          <Title order={2}>{ number } - { nick }</Title>
          <BarChart team={number} event={props.event}/>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <TeamImage image={image} />
      </Grid.Col>

      {/* row two */}
      <Grid.Col span={6}>
        <AutoCard stats={stats} matches={matches}/>
      </Grid.Col>

      <Grid.Col span={6}>
        <TeleCard stats={stats} matches={matches}/>
      </Grid.Col>

      {/* row three */}
      <Grid.Col span={12}>
        <ChargeStationCard stats={stats}></ChargeStationCard>
      </Grid.Col>

      <Grid.Col span={12}>
        <RatingCard stats={stats}></RatingCard>
      </Grid.Col>
      
      {/* row fourt */}
      <Grid.Col span={12}>
        <Card>
          <NotesCard matches={matches}/>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default Team;