import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Card, Title, Space, Button} from '@mantine/core';
import heatmapImages from './heatmap-images';
import React from "react";
import Field from '../assets/field.jpg';

const AutoHeatmap = (props) => {
    const [coordinatesList, setCoordinatesList] = useState();
    const [redAutoCoords, setRedAutoCoords] = useState();
    const [redAutoMax, setRedAutoMax] = useState();
    const [redAutocompleted, setRedAutocompleted] = useState();

    useEffect( () => {
        setCoordinatesList(props.coordinatesList);
        console.log(props.coordinatesList);
        setRedAutoCoords(Array(10).fill().map(()=>Array(10).fill()));
        setRedAutoMax(0);
        setRedAutocompleted(false);
        var tempCoords = Array(10).fill().map(()=>Array(10).fill());
        for(var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                tempCoords[i][j] = 0;
            }
        }
        if (props.coordinatesList) {
            for (j = 0; j < props.coordinatesList.length; j++) {
                tempCoords[props.coordinatesList[j][0]][props.coordinatesList[j][1]] += 1;
            }
            setRedAutoCoords(tempCoords);
            var maxRow = tempCoords.map(function(row){ return Math.max.apply(Math, row); });
            setRedAutoMax(Math.max.apply(null, maxRow));
            setRedAutocompleted(true);
        }

        }, []
    );

    return (
        <Card>
            <Space h="md"/>
            <Title order={3}>{props.title}</Title>
            <Space h="md"/>
            <Space h="md"/>
            <div id="mydiv" className="heatmap" >
                <img src={Field} resizeMode={'cover'} style={{width: '100%'}}/>
                    {coordinatesList && redAutocompleted && coordinatesList.map((coords, index) => (
                        <div 
                            key={index}
                            style={{
                                position: 'absolute',
                                left: (Number(coords[0]) * 4.8 + 6.1 + '%'),
                                top: (Number(coords[1]) * 6.7 + 25.5 + '%'),
                                backgroundColor: 'rgb(' + (55+200*(redAutoCoords[coords[0]][coords[1]]/redAutoMax)) + ', 0, 0)',
                                width: 10,
                                height: 10,
                                borderRadius: 50
                            }}
                        />
                    ))}
            </div>
        </Card>
    )
}

export default AutoHeatmap;