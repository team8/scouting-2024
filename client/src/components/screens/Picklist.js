import { ActionIcon, Box, Button, Card, Flex, Grid, Space, Text, TextInput } from "@mantine/core"
import { IconDeviceFloppy, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable } from 'mantine-react-table';
var _ = require('lodash');

const Picklist = (props) => {
    const [rerenderKey, setRerenderKey] = useState(0);

    const [editingBucketName, setEditingBucketName] = useState("");
    const [editingNameValue, setEditingNameValue] = useState("");

    //Var that stores the remote bucket data from the previous fetch - this is to figure out if the remote data changed or the local data changed 
    const [remoteBucketsMemory, setRemoteBucketsMemory] = useState({});

    const columns = useMemo(
        () => [

            {
                accessorKey: 'team',
                header: 'Team',
            },
            {
                accessorKey: 'notes',
                header: 'Notes',
            },



        ],
        [],
    );


    const [buckets, setBuckets] = useState({})


    useEffect(() => {
        var stopRequesting = false
        const fetchData = async () => {

            setTimeout(async function () {
                if (!stopRequesting) {
                    try {
                        await fetch("https://server.palyrobotics.com/event/get-picklist/" + props.event).then(
                            (res) => res.json()
                        ).then(async (data) => {
                            console.log(data)
                            if (_.isEqual(data, remoteBucketsMemory)) {
                                console.log("remote is equal to mem")
                                if (!_.isEqual(buckets, data)) {
                                    console.log("Local Change")
                                    await fetch("https://server.palyrobotics.com/event/set-picklist/" + props.event, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(buckets)
                                    }).then((res) => {
                                        res.text()
                                    }).then((data) => {
                                        console.log(data)
                                    })
                                }


                            } else {
                                console.log("remote is not equal to mem")
                                setBuckets(data)
                                setRerenderKey(prevKey => prevKey + 1);
                                setRemoteBucketsMemory(data)
                            }
                        })

                    } catch (err) {
                        console.log(err.message)
                    }
                    fetchData()
                }
            }, 500)
        }

        fetchData()




        return function cleanup() {
            stopRequesting = true
        }
    }, [buckets])

    const handleSaveCell = (cell, value, name) => {
        const tempTableData = buckets[name].map((row, index) => {
            if (index === cell.row.index) {
                return { ...row, [cell.column.id]: value };
            }
            return row;
        });

        var tempBuckets = { ...buckets }
        tempBuckets[name] = tempTableData
        setBuckets(tempBuckets);
    };

    const renameKeys = (keysMap, object) => {

        return (Object.keys(object).reduce(
            (acc, key) => ({
                ...acc,
                ...{ [keysMap[key] || key]: object[key] },
            }),
            {}
        ))

    }





    return (
        <>

            <Flex direction={"column"} style={{ border: "0px solid red", }} h={"100%"}>
                <Flex style={{ padding: "1%", border: "0px solid red" }} >
                    <ActionIcon onClick={() => {
                        setBuckets({ ...buckets, "Unnamed Bucket": [{ team: '', notes: '' }] });
                    }} size={"100%"} color="green.5"><IconPlus size={48} /></ActionIcon>
                </Flex>

                {Object.keys(buckets).map((name) => {

                    return (
                        <Flex style={{ border: "0px solid red", justifyContent: "center" }} mb="lg">
                            <Card style={{ justifyContent: "center", }} w={"100%"}>
                                <Card.Section >
                                    <Card color="blue.7" style={{ backgroundColor: "#227319", }}>
                                        <Flex direction={"column"} align="center">


                                            {editingBucketName === name ?
                                                <TextInput value={editingNameValue} placeholder="Enter Name" onChange={(e) => {
                                                    setEditingNameValue(e.target.value)
                                                }}
                                                    onKeyDown={(e) => {
                                                        console.log(e.key)
                                                        if (e.key === "Enter") {
                                                            var keysMap = {}
                                                            keysMap[name] = editingNameValue
                                                            setBuckets(renameKeys(keysMap, buckets))
                                                            setEditingBucketName("")
                                                        }
                                                    }}
                                                />
                                                :
                                                <Text align="center">{name}</Text>
                                            }


                                            <Flex>
                                                <ActionIcon
                                                    mr={"md"}
                                                    color="red"
                                                    onClick={() => {
                                                        if (window.confirm("Are You Sure You Want To Delete This Bucket?")) {
                                                            var tempBuckets = { ...buckets }
                                                            delete tempBuckets[name]
                                                            setBuckets(tempBuckets)
                                                        }
                                                    }}
                                                >
                                                    <IconTrash />
                                                </ActionIcon>

                                                <ActionIcon mr={"md"} onClick={() => {
                                                    if (editingBucketName === name) {
                                                        //Slightly scuffed solution to renaming keys while having them in same position
                                                        var keysMap = {}
                                                        keysMap[name] = editingNameValue
                                                        setBuckets(renameKeys(keysMap, buckets))

                                                        setEditingBucketName("")
                                                    } else {
                                                        setEditingBucketName(name)
                                                        setEditingNameValue(name)
                                                    }
                                                }} color="green.5">
                                                    {editingBucketName === name ?
                                                        <IconDeviceFloppy size={48} />
                                                        :
                                                        <IconPencil size={48} />}
                                                </ActionIcon>

                                                <ActionIcon onClick={() => {
                                                    console.log(buckets)
                                                    var tempBuckets = { ...buckets }
                                                    tempBuckets[name] = [...buckets[name], { "team": "", "notes": "" }]
                                                    setBuckets(tempBuckets)
                                                }} color="green.5">
                                                    <IconPlus size={48} />
                                                </ActionIcon>
                                            </Flex>

                                        </Flex>
                                    </Card>

                                </Card.Section>

                                <Grid>
                                    <Grid.Col style={{ justifyContent: "center" }}>

                                        <MantineReactTable

                                            key={rerenderKey}

                                            autoResetPageIndex={false}
                                            columns={columns}
                                            data={buckets[name]}
                                            enableTopToolbar={false}
                                            enableBottomToolbar={false}
                                            enableRowOrdering
                                            enableSorting={false}
                                            mantineRowDragHandleProps={({ table }) => ({
                                                onDragEnd: () => {
                                                    const { draggingRow, hoveredRow } = table.getState();
                                                    if (hoveredRow && draggingRow) {
                                                        const result = Array.from(buckets[name]);
                                                        const [removed] = result.splice(draggingRow.index, 1);
                                                        result.splice(hoveredRow.index, 0, removed);
                                                        var tempBuckets = { ...buckets }
                                                        tempBuckets[name] = result

                                                        setBuckets(tempBuckets);
                                                        setRerenderKey(prevKey => prevKey + 1);
                                                    }
                                                },
                                            })}
                                            editDisplayMode="table"
                                            enableEditing
                                            enableRowActions
                                            mantineEditTextInputProps={({ cell }) => ({
                                                //onBlur is more efficient, but could use onChange instead
                                                onChange: (event) => {
                                                    handleSaveCell(cell, event.target.value, name);
                                                },
                                                variant: 'unstyled', //default for editDisplayMode="table"
                                            })}
                                            renderRowActions={({ row }) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>


                                                    <ActionIcon
                                                        color="red"
                                                        onClick={() => {
                                                            var tempTableData = [...buckets[name]]
                                                            tempTableData.splice(row.index, 1); //assuming simple data table

                                                            var tempBuckets = { ...buckets }
                                                            tempBuckets[name] = tempTableData
                                                            setBuckets(tempBuckets);
                                                            setRerenderKey(prevKey => prevKey + 1);

                                                        }}
                                                    >
                                                        <IconTrash />
                                                    </ActionIcon>
                                                </Box>
                                            )}


                                        />

                                    </Grid.Col>
                                </Grid>

                            </Card>

                        </Flex>
                    )
                }
                )
                }

            </Flex>
        </>
    )
}

export default Picklist