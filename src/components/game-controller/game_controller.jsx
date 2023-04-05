import { useState } from 'react';

import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

import { defaultMainStats, effectClass } from '../../constants/constants';
import { __hash__ } from '../../utils/utils';
import { newPoliceStation, newResidentialZone, newRoad } from '../../constants/defaultBuildings';

export default function GameController() {

    const [mainStats, setMainStats] = useState(defaultMainStats)

    var mapGrid = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => { return { name: 'delete', element: {}, effects: [] } }));
    var selectedElement = { name: "pointer"}
    var auxiliarElement = {};

    const setSelectedElement = (element) => {
        if(selectedElement === element) return;
        selectedElement = element;
        return selectedElement;
    }

    const setBlock = (xindex, yindex) => {
        if (selectedElement.name === 'pointer') return console.log(xindex,yindex,mapGrid[xindex][yindex])
        if (cantBuild(xindex, yindex)) return;  
        defineBuildingValues(xindex, yindex);
        mapGrid[xindex][yindex] = auxiliarElement;
        return selectedElement.name;
    }

    const cantBuild = (xindex, yindex) => {
        if (mapGrid[xindex][yindex].name !== 'delete' && selectedElement !== 'delete') {
            return true;
        }
        return false;
    }

    const defineBuildingValues = (xindex, yindex) => {
        switch (selectedElement.name) {
            case 'road':
                auxiliarElement = newRoad()
                definePositionEffects(xindex, yindex);
                //TODO ACTIVATE ADJACENT BUILDINGS IF INACTIVE
                break;
            case 'residential':
                auxiliarElement = newResidentialZone()
                if (checkRoads(xindex, yindex)) {
                    auxiliarElement.setIsActive(true)
                    definePositionEffects(xindex, yindex);
                    console.log(auxiliarElement.notCoveredServices())
                }
                break;
            case 'police':
                auxiliarElement = newPoliceStation()
                if (checkRoads(xindex, yindex)) {
                    addEffects(xindex, yindex, auxiliarElement.cover_area)
                }
                break;
            default:
                break;
        }
        console.log("created ", auxiliarElement);

    }
    
    const checkRoads = (xindex, yindex) => {
        const adjacentPositions = checkAdjacentPositions(xindex, yindex)
        if (adjacentPositions.some(item => item.name === 'road')) {
            return true;
        }
        return false;
    }

    const definePositionEffects = (xindex, yindex) => {
        let combinedEffects = auxiliarElement.effects.concat(mapGrid[xindex][yindex].effects);
        auxiliarElement.effects = combinedEffects;
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
        mapGrid[xindex][yindex].effects.push(auxiliarElement.cover_service)
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