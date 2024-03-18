import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Divider, Menu, Text } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import FieldDepth from '../FieldDepth';



const Compare = (props) => {
    const [loading, setLoading] = useState();
    const [teams, setTeams] = useState();
    const [stats, setStats] = useState();

    const [currentField, setCurrentField] = useState();

    const fieldDepthAction = (internalColumnMenuItems, field) => {
        return (
            <>
                <Menu.Item onClick={() => {
                    console.log(field)
                    setCurrentField(field)
                }}>
                    <Text color='green' weight="bold">Show Field Depth</Text>
                </Menu.Item>

                <Divider />
                {internalColumnMenuItems}
            </>)


    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'team', header: "Team",
            },
            {
                accessorKey: "ampNotes", header: "Amp Notes Avg", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "ampNotes")
                ),
            },
            {
                accessorKey: "speakerNotes", header: "Speaker Notes Avg", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "speakerNotes")
                ),
            },
            {
                accessorKey: 'autoPoints', header: "Auto Pts Avg", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "autoPoints")
                ),
            },
            {
                accessorKey: 'teleopPoints', header: "Teleop Pts Avg", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "teleopPoints")
                ),
            },
            {
                accessorKey: 'endgamePoints', header: "Endgame Pts Avg", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "endgamePoints")
                ),
            },
            {
                accessorKey: 'pointsScored', header: "Avg Total Pt Contribution", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "pointsScored")
                ),
            },
            {
                accessorKey: 'driverRating', header: "Driver Rating", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "driverRating")
                ),
            },
            {
                accessorKey: 'defenseRating', header: "Defense Rating", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "defenseRating")
                ),
            },
            {
                accessorKey: 'intakeRating', header: "Intake Rating", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "intakeRating")
                ),
            },
            {
                accessorKey: 'climbRating', header: "Climb Rating", renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
                    fieldDepthAction(internalColumnMenuItems, "climbRating")
                ),
            }
        ],
        [],
    );




    useEffect(() => {
        setLoading(true);
        for (var i = 0; i < columns.length; i++) {
            columns[i].renderColumnActionsMenuItems = ({ internalColumnMenuItems }) => (
                <>
                    <Menu.Item >
                        Show Field Depth
                    </Menu.Item>

                    <Divider />
                    {internalColumnMenuItems}
                </>
            )
        }
    }, []);

    useEffect(() => {
        setLoading(true);
    }, [props.event]);


    useEffect(() => {
        const asyncFunction = async () => {
            const getTeams = async (event) => {
                let array = [];

                await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/teams/simple`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" } })
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
                    await fetch(`http://localhost:4000/team/${props.event}/${teams[i]}`, { headers: { "X-TBA-Auth-Key": "fLKsnM61nLrIA7CDpmFybAXvRYFeCQbIRrPYm5sKSSrs77vsUhL2whnLIHizc3iU" } })
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log(data)
                            var record = {
                                team: teams[i],
                                ampNotes: data.average.autoAmpNotes + data.average.teleopAmpNotes,
                                speakerNotes: data.average.autoSpeakerNotes + data.average.teleopSpeakerNotes,
                                ...data.average
                            }
                            Object.keys(record).map((key) => {
                                record[key] = Math.round(record[key] * 100) / 100
                            })
                            array.push(record);
                        });
                }
                console.log(array)
                return array;
            }

            let local = await getStats();
            console.log(local)
            setStats(local);
            setLoading(false);
        }
        asyncFunction();
    }, [teams]);



    if (loading) {
        return <div className="container">Loading... this may take some time</div>
    }





    return (
        <>
            {currentField &&
                <>
                    <FieldDepth field={currentField} data={stats} />
                </>
            }
            <MantineReactTable
                columns={columns}
                data={stats ? stats : []}
                state={{ isLoading: false }}

            />
        </>

    );
}

export default Compare;