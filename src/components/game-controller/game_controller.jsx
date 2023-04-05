import { useState } from 'react';

import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

import { defaultMainStats, effectClass } from '../../constants/constants';

export default function GameController() {

    const [mainStats, setMainStats] = useState(defaultMainStats)

    var mapGrid = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => { return { value: 0, element: {}, class: {effects: []} } }));
    var selectedElement = { name: "pointer", value: -1, class: {} }

    const setSelectedElement = (element) => {
        if(selectedElement === element) return;
        selectedElement = element;
        return selectedElement;
    }

    const setBlock = (xindex, yindex) => {
        if (selectedElement.value === -1) return console.log(xindex,yindex,mapGrid[xindex][yindex].class.effects)
        if (cantBuild(xindex, yindex)) return;
        defineBuildingValues(xindex, yindex);
        mapGrid[xindex][yindex] = selectedElement;
        return selectedElement.value;
    }

    const cantBuild = (xindex, yindex) => {
        if (mapGrid[xindex][yindex].value !== 0 && selectedElement.value !== 0) {
            return true;
        }
        return false;
    }

    const defineBuildingValues = (xindex, yindex) => {
        switch (selectedElement.class.type) {
            case 'road':
                console.log("ROAD")
                definePositionEffects(xindex, yindex);
                //TODO ACTIVATE ADJACENT BUILDINGS IF INACTIVE
                break;
            case 'residential':
                console.log("RESIDENTIAL")
                if (checkRoads(xindex, yindex)) {
                    definePositionEffects(xindex, yindex);
                    selectedElement.class.defineHappiness();
                    console.log(selectedElement.class.notCoveredServices())
                }
                break;
            case 'service':
                console.log("SERVICE")
                if (checkRoads(xindex, yindex)) {
                    addEffects(xindex, yindex, selectedElement.class.cover_area)
                }
                break;
            default:
                break;
        }
        console.log("created ", selectedElement?.class?.id);

    }
    
    const checkRoads = (xindex, yindex) => {
        const adjacentPositions = checkAdjacentPositions(xindex, yindex)
        if (adjacentPositions.some(item => item.value === 1)) {
            return true;
        }
        return false;
    }

    const definePositionEffects = (xindex, yindex) => {
        let combinedEffects = selectedElement.class.effects.concat(mapGrid[xindex][yindex].class.effects);
        selectedElement.class.effects = combinedEffects;
    }

    
    function addEffects(x, y, cover_area) {
      for (let i = x - cover_area; i <= x + cover_area; i++) {
        for (let j = y - cover_area; j <= y + cover_area; j++) {
          if (i >= 0 && i < mapGrid.length-1 && j >= 0 && j < mapGrid[0].length-1) {
            addMapBoxEffect(i,j);
          }
        }
      }
    }

    const addMapBoxEffect = (xindex, yindex) => {
        mapGrid[xindex][yindex].class.effects.push(selectedElement.class.cover_service)
    }

    const addGamePopulation = () => {
        const newPopulation = { ...mainStats, population: mainStats.population + selectedElement.class.actual_population }
        setMainStats(newPopulation)
    }

    const eventHandler = () => {

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

    return <div className='main-game-controller'>
        <Sidebar className="sidebar" events={{ setSelectedElement }}></Sidebar>
        <StatsUI className='stats-main-row ' objProps={mainStats}></StatsUI>
        <Map className='main-content' mapGrid={mapGrid} events={{ eventHandler, setBlock }}></Map>
    </div>

}