import { useState, useEffect, lazy, Suspense } from 'react';
import { AppShell, Footer, useMantineTheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import AppNavbar from "./components/AppNavbar";
import Team from './components/screens/Team';
import Match from './components/screens/Match'
import AppHeader from './components/AppHeader';
import Compare from './components/screens/Compare';
import Test from './components/screens/Test';
import Picklist from './components/screens/Picklist';

export default function App() {
  const theme = useMantineTheme();
  const defaultValue = "2024azgl"


  const [event, setEvent] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);


  
  useEffect(() => {
    setLoading(true);
    
    const getTeams = async () => {
      console.log(event)
      await fetch(`https://server.palyrobotics.com/event/get-teams/${event}/`)
      .then( (response) => response.json() )
      .then((teams) => {
        setTeams(teams.map(Number).sort(function(a, b){return a-b}));
        console.log(teams.map(Number).sort(function(a, b){return a-b}))
      });
    }

    const getMatches = async () => {
      await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/matches`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" }})
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
        <AppHeader defaultValue={defaultValue} setEvent={setEvent} />
      }
    >
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
            <Route path={`team/:number`} element={<Team event={event} />} />
            <Route path={`match/:number`} element={<Match event={event} />} />
            <Route path={`compare`} element={<Compare event={event} />} />
            <Route path={`picklist`} element={<Picklist event={event} />} />

        </Routes>
      </Suspense>
      
    </AppShell>
  );
}