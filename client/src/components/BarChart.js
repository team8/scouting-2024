import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


const BarChart = ({ team, event }) => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [auto, setAuto] = useState([]);
  const [tele, setTele] = useState([]);
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
          let array1 = [];
          let array2 = [];
          let array3 = [];
          for (var i in matches) {
              await fetch(`http://localhost:4000/team/${event}/${team}/${matches[i]}`)
                  .then((response) => response.json())
                  .then((json) => {
                      const data = json || {}
                      console.log('herre')
                      console.log(data)
                      if (typeof(data.autoPts) !== "undefined") {
                        array1.push(data.autoPts);
                        array2.push(data.telePts);
                        array3.push(data.endgamePts);
                      } else {
                        array1.push(0);
                        array2.push(0);
                        array3.push(0);
                      }
                  });
          }
          return [array1, array2, array3];
      }

      if (matches) {
        let arr = await setTeams(matches);
        setAuto(arr[0]);
        setTele(arr[1]);
        setEndgame(arr[2]);
          
      } 
    }
    asyncFunction();
  }, [matches])

  const options = {
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Chart.js Bar Chart - Stacked',
    //   },
    // },
    // responsive: true,
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
        backgroundColor: "#173518",
        borderColor: "#173518",
        data: endgame,
      },
      {
        label: "Tele",
        backgroundColor: "#1e4620",
        borderColor: "#1e4620",
        data: tele,
      },
      {
        label: "Auto",
        backgroundColor: "#265828",
        borderColor: "#265828",
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