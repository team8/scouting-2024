import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Card, Title, Space, Button} from '@mantine/core';
import heatmapImages from './heatmap-images';
import React from "react";
import Field from '../assets/field.jpg';

const AutoHeatmap = (props) => {
    const [coordinatesList, setCoordinatesList] = useState([]);
    const [redAutoCoords, setRedAutoCoords] = useState([]);
    const [redAutoMax, setRedAutoMax] = useState(0);
    const [redAutocompleted, setRedAutocompleted] = useState(false);
    const testingMatrix = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]];
    const offset_x = 5.2;
    const offset_y = 14;
    const multip_x = 4.9;
    const multip_y = 8.5;

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
                    {coordinatesList && redAutocompleted && testingMatrix.map((coords, index) => (
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