import { useEffect, useState } from "react";
import { DataTable } from 'mantine-datatable';
// import { DataTableSortStatus } from "mantine-datatable";
import { Box } from "@mantine/core";

const Compare = (props) => {
    const [loading, setLoading] = useState();
    const [teams, setTeams] = useState();
    const [stats, setStats] = useState();
    // const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });

    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        setLoading(true);
    }, [props.event]);


    useEffect(() => {
        const asyncFunction = async () => {
            const getTeams = async (event) => {
                let array = [];

                await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/teams/simple`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" }})
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach(element => {
                            array.push(element.key.replace("frc", ""));
                        });
                    });
                
                return array;
            }
            let local = await getTeams(props.event);
            setTeams(local);
        } 
        asyncFunction();
        
    }, [loading]);

    useEffect(() => {
        const asyncFunction = async () => {
            const getStats = async () => {
                let array = [];
                for (var i in teams) {
                    await fetch(`https://server.palyrobotics.com/team/${props.event}/${teams[i]}`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" }})
                        .then((response) => response.json())
                        .then((data) => {
                            array.push({
                                team: teams[i],
                                ...data.stats.avg
                            });
                    });
                }
                return array;
            }

            let local = await getStats();
            setStats(local);
            setLoading(false);
        }
        asyncFunction();
    }, [teams]);

    if (loading) {
        return <div className="container">Loading... this may take some time</div>
    }

    return (
        <Box sx={{ height: 600 }}>
            <DataTable 
                columns={[
                    { accessor: 'team', }, {accessor: 'autoPtsAvg', }, {accessor: 'telePtsAvg', }, {accessor: 'endgamePtsAvg', }, {accessor: 'ptContributionAvg', }, {accessor: 'driverRatingAvg', }, {accessor: 'defenseRatingAvg', }, {accessor: 'coneIntakeRatingAvg', }, {accessor: 'cubeIntakeRatingAvg', } 
                ]}
                records={stats}
            />  
        </Box>
        
        
    );
}

export default Compare;