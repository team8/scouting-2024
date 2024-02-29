import { useState, useEffect, lazy, Suspense } from 'react';
import { AppShell, Footer, useMantineTheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import AppNavbar from "./components/AppNavbar";
import Team from './components/screens/Team';
import Match from './components/screens/Match'
import AppHeader from './components/AppHeader';
import Compare from './components/screens/Compare';

export default function App() {
  const theme = useMantineTheme();

  const [event, setEvent] = useState("2023idbo");
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    
    const getTeams = async () => {
      await fetch(`https://server.palyrobotics.com/event/${event}/teams`)
      .then((response) => response.json())
      .then((teams) => {
        setTeams(teams);
      });
    }

    const getMatches = async () => {
      await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/matches`, { headers: { "X-TBA-Auth-Key": "oSSXMWPE2jOJrLTYpgMvgP5BTvbtOJRwR6LSv1ytb0g5FS6RlaWBx70Pw0B8cwvA" }})
        .then((response) => response.json())
        .then((data) => {
          let matchList = [];
          for (var i = 0; i < Object.keys(data).length; i++) {
            if (data[i].comp_level === "qm") {
              matchList.push(data[i].match_number);
            }
          }
          setMatches(matchList.sort((a, b) => a - b));
      });
    }
    console.log('here')
    getTeams();
    getMatches();
    setLoading(false);
  }, [event]);
  
  if (loading) return (
    <div className="container">Loading...</div>
  );

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar teams={teams} matches={matches}/>}
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <AppHeader set={setEvent} />
      }
    >
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
            <Route path={`team/:number`} element={<Team event={event} />} />
            <Route path={`match/:number`} element={<Match event={event} />} />
            <Route path={`compare`} element={<Compare event={event} />} />
        </Routes>
      </Suspense>
      
    </AppShell>
  );
}