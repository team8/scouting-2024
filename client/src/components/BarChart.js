import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


const BarChart = ({ team, event }) => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [auto, setAuto] = useState([]);
  const [teleAmp, setTeleAmp] = useState([]);
  const [teleSpeaker, setTeleSpeaker] = useState([]);
  const [endgame, setEndgame] = useState([]);
  

  useEffect(() => {
    setLoading(true);
    
    const getMatches = async () => {
      await fetch(`https://www.thebluealliance.com/api/v3/team/frc${team}/event/${event}/matches`, { headers: { "X-TBA-Auth-Key": `fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU` }})
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

    getMatches();
    setLoading(false);
  }, [team, event]);
      
  useEffect(() => {
    const asyncFunction = async () => {
      const setTeams = async (matches) => {
          let auto = [];
          let teleAmp = [];
          let teleSpeaker = [];
          let end = [];
          for (var i in matches) {
              await fetch(`https://server.palyrobotics.com/team/${event}/${team}/${matches[i]}`)
                  .then((response) => response.json())
                  .then((json) => {
                      const data = json || {}
                      console.log(data)
                      if (typeof(data.autoPoints) !== "undefined") {
                          auto.push(data.autoPoints);
                          teleAmp.push(data.teleopAmpNotes);
                          teleSpeaker.push(data.teleopPoints-data.teleopAmpNotes);
                          end.push(data.endgamePoints);
                      } else {
                          auto.push(0);
                          teleAmp.push(0);
                          teleSpeaker.push(0);
                          end.push(0);
                      }
                  });
          }
          return [auto, teleAmp, teleSpeaker, end];
      }

      if (matches) {
        let arr = await setTeams(matches);
        setAuto(arr[0]);
        setTeleAmp(arr[1]);
        setTeleSpeaker(arr[2]);
        setEndgame(arr[3]);
      } 
    }
    asyncFunction();
  }, [matches])

  const options = {
    scales: {
      x: {
          stacked: true,
      },
      y: {
          stacked: true,
      },
    },
  };

  const data = {
    labels: matches,
    datasets: [
      {
        label: "Endgame",
        backgroundColor: "#062e08",
        borderColor: "#062e08",
        data: endgame,
      },
      {
        label: "Teleop Amp",
        backgroundColor: "#134015",
        borderColor: "#134015",
        data: teleAmp,
      },
    {
        label: "Teleop Speaker",
        backgroundColor: "#245c26",
        borderColor: "#245c26",
        data: teleSpeaker,
    },
        {
        label: "Auto",
        backgroundColor: "#367538",
        borderColor: "#367538",
        data: auto,
    }
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );

}

export default BarChart;