import { useState } from 'react';
import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

import { defaultMainStats } from '../../constants/constants';

export default function GameController() {

    const [mainStats, setMainStats] = useState(defaultMainStats)

    var mapGrid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => { return { value: 0, element: {}, effects: [] } }));
    var selectedElement = { name: "pointer", value: -1 }

    const setSelectedElement = (element) => {
        console.log(selectedElement, "CHANGED TO: ", element)
        selectedElement = element;
        return selectedElement;
    }

    const setBlock = (xindex, yindex) => {
        console.log("BLOCK: ", xindex, "AND", yindex)
        if (selectedElement.value === -1) return
        if (cantBuild(xindex, yindex)) return;
        console.log("BLOCK: ", xindex, "AND", yindex, "WITH SELECTED: ", selectedElement);
        defineBuildingValues(xindex, yindex);
        mapGrid[xindex][yindex] = selectedElement;
        //console.log(mapGrid)
        //console.log(mapGrid[xindex][yindex]?.class?.is_active)
        return selectedElement.value;
    }

    const interact = () => {

    }
    const cantBuild = (xindex, yindex) => {
        if (mapGrid[xindex][yindex].value !== 0 && selectedElement.value !== 0) {
            console.log("CANT BUILD THERE'S ANOTHER BUILDING")
            return true;
        }
        return false;
    }

    const defineBuildingValues = (xindex, yindex) => {
        switch (selectedElement.class.type) {
            case 'residential':
                if (checkRoads(xindex, yindex)) addPopulation();
                console.log("PUTTING A RESIDENTIAL BUILDING")
                break;
            default:
                break;
        }

    }

    const checkRoads = (xindex, yindex) => {
        const adjacentPositions = checkAdjacentPositions(xindex, yindex)
        console.log(adjacentPositions)
        if (adjacentPositions.some(item => item.value === 1)) {
            return true;
        }
        console.log("CASA CONECTADA A UNA CALLE NO ESTA ACTIVA")
        return false;
    }

    function checkAdjacentPositions(xindex, yindex) {
        if (xindex < 0 || xindex >= mapGrid.length || yindex < 0 || yindex >= mapGrid[0].length) {
            throw new Error("Index out of bounds");
        }
        const adjacentPositions = [];
        // check top position
        if (xindex > 0) {
            adjacentPositions.push(mapGrid[xindex - 1][yindex]);
        }
        // check bottom position
        if (xindex < mapGrid.length - 1) {
            adjacentPositions.push(mapGrid[xindex + 1][yindex]);
        }
        // check left position
        if (yindex > 0) {
            adjacentPositions.push(mapGrid[xindex][yindex - 1]);
        }
        // check right position
        if (yindex < mapGrid[0].length - 1) {
            adjacentPositions.push(mapGrid[xindex][yindex + 1]);
        }
        return adjacentPositions;
    }

    const addPopulation = () => {
        const newPopulation = { ...mainStats, population: mainStats.population + selectedElement.class.actual_population }
        setMainStats(newPopulation)

    }

    const eventHandler = () => {

    }

    return <div className='main-game-controller'>
        <Sidebar className="sidebar" events={{ setSelectedElement }}></Sidebar>
        <StatsUI className='stats-main-row ' objProps={mainStats}></StatsUI>
        <Map className='main-content' mapGrid={mapGrid} events={{ eventHandler, setBlock }}></Map>
    </div>

}