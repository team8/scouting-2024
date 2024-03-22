import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Card, Title, Space, Button} from '@mantine/core';
import heatmapImages from './heatmap-images';
import React from "react";
import h337 from "heatmap.js";

const AutoHeatmap = (props) => {
    const [coordinatesList, setCoordinatesList] = useState();
    const [fieldOrientation, setFieldOrientation] = useState(1);

    const calcHeatmapData = (coordinatesList) => {
        const heatmapMap = new Map();
        let leftCount = 0;
        let rightCount = 0;

        coordinatesList.forEach(([x, y]) => {
            console.log([x, y])
            // leftCount is speaker on the left, so numbers will be 4+
            // rightCount is speaker on the right, so numbers will be 0-4
            if (x < 4) rightCount++;
            else leftCount++;
            x = (x * 5) + 110
            y = (y * 5) + 340
            const key = `${x}-${y}`;
            if (heatmapMap.has(key)) {
                heatmapMap.set(key, heatmapMap.get(key) + 1);
            } else {
                heatmapMap.set(key, 1);
            }
        });

        if (leftCount < rightCount) {
            setFieldOrientation(2);
        }

        const heatmapData = Array.from(heatmapMap.entries()).map(([key, value]) => {
            const [x, y] = key.split('-').map(Number);
            var radius = 20
            return { x, y, value, radius };
        });
        return heatmapData;
    }

    const handleHeatmap = () => {
        let heatmapInstance = h337.create({
            container: document.querySelector('.heatmap'),
            maxOpacity: .9,
            minOpacity: .5
        });

        const heatmapCoordinates = calcHeatmapData(props.coordinatesList)

        var data = {
            data: Object.values(heatmapCoordinates)
        }

        var data1 = {
            data: [
                {x: 70, y: 525, value: 4, radius: 20},
                {x: 550, y: 50, value: 4, radius: 20},
            ]

        }

        console.log(data)

        heatmapInstance.setData(data);

        var div = document.getElementById('mydiv');
        div.style.display = div?.style.display === "block" ? "none" : "block";

        document.addEventListener("DOMContentLoaded", function() {
            const button = document.createElement("button");
            button.textContent = "showHeatMap";
            button.addEventListener("click", handleHeatmap);

            const div = document.createElement("div");
            div.id = "mydiv";
            div.className = "heatmap";

            const img = document.createElement("img");
            img.src = heatmapImages[1][fieldOrientation];
            img.alt = "image";

            div.appendChild(img);

            document.body.appendChild(button);
            document.body.appendChild(div);
        })
    };

    useEffect( () => {
        setCoordinatesList(props.coordinatesList);
        }, []
    );

    return (
        <Card>
            <Space h="md"/>
            <Title order={3}>{props.title}</Title>
            <Space h="md"/>
            <Button onClick={handleHeatmap}>
                Show Heat Map
            </Button>
            <Space h="md"/>
            <div id="mydiv" className="heatmap" >
                <img src={heatmapImages[1][fieldOrientation]} width={"80%"} height={"80%"} alt="image"/>
            </div>
        </Card>
    )
}

export default AutoHeatmap;