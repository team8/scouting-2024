import { Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
const FieldDepth = (props) => {

    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])


    useEffect(() => {
        var unsortedFieldData = {}
        props.data.map((team) => {
            unsortedFieldData[team.team] = team[props.field]
        })
        const sortedDataList = Object.entries(unsortedFieldData)
            .sort(([, a], [, b]) => b-a)
        var tempLabels = []
        var tempValues = []
        sortedDataList.map((pair)=>{
            tempLabels.push(pair[0])
            tempValues.push(pair[1])
        })
        setLabels(tempLabels)
        setValues(tempValues)


    }, [props.field])

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: "#265828",
                borderColor: "#265828",
                data: values,
                label: props.field
            }
        ]

    }
    return (
        <>
            <Bar data={data}></Bar>
        </>
    )
}

export default FieldDepth;