import { useState } from 'react';

import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

import { defaultMainStats } from '../../constants/constants';

import { newPoliceStation, newResidentialZone, newRoad } from '../../constants/defaultBuildings';

export default function GameController() {

    const [mainStats, setMainStats] = useState(defaultMainStats)
    const [buildingsStats, setBuilingsStats] = useState({
        police: 0,
        firehouse: 0,
        hospitals: 0,
    })

    const [mapGrid, setMapGrid] = useState(Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => { return { name: 'delete', effects: [] } })));
    var selectedElement = { name: "pointer" }
    var auxiliarElement = {};

    const setSelectedElement = (element) => {
        if (selectedElement === element) return;
        selectedElement = element;
        return selectedElement;
    }

    const setBlock = (xindex, yindex) => {
        if (selectedElement.name === 'pointer') return console.log(xindex, yindex, mapGrid[xindex][yindex])
        if (cantBuild(xindex, yindex)) return;
        defineBuildingValues(xindex, yindex);
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
                auxiliarElement.effects = definePositionEffects(auxiliarElement.effects,mapGrid[xindex][yindex].effects);
                activateAdjacentBuildings(xindex, yindex);
                break;
            case 'residential':
                auxiliarElement = newResidentialZone()
                if (checkRoads(xindex, yindex)) {
                    auxiliarElement.is_active = true
                    auxiliarElement.effects = definePositionEffects(auxiliarElement.effects,mapGrid[xindex][yindex].effects);
                }
                break;
            case 'police':
                auxiliarElement = newPoliceStation()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area,auxiliarElement.cover_service)
                    setBuilingsStats({...buildingsStats, police: buildingsStats.police + 1})
                }
                break;
            default:
                break;
        }
        updateGrid(xindex, yindex, auxiliarElement)
        //console.log("created ", mapGrid[xindex][yindex]);
    }

    const updateGrid = (xindex, yindex, element) => {
        var newGrid = mapGrid;
        newGrid[xindex][yindex] = element;
        setMapGrid(newGrid)
    }

    const setService = (xindex, yindex, cover_area, cover_service) => {
        addEffects(xindex, yindex, cover_area, cover_service)
        auxiliarElement.is_active = true
    }

    const activateAdjacentBuildings = (xindex, yindex) => {
        const adjacentPositions = checkAdjacentPositions(xindex, yindex)
        const adjacentBuildings = adjacentPositions.filter(element => element.object.type_id !== undefined)
        adjacentBuildings.forEach(element => {
            addEffects(element.x, element.y, element.object.cover_area, element.object.cover_service)
            element.object.is_active = true;
            updateGrid(element.x, element.y,element.object);
        });
    }

    const checkRoads = (xindex, yindex) => {
        const adjacentPositions = checkAdjacentPositions(xindex, yindex)
        if (adjacentPositions.some(item => item.object.name === 'road')) {
            return true;
        }
        return false;
    }

    const definePositionEffects = (targetEffects, sourceEffects) => {
        let combinedEffects = targetEffects.concat(sourceEffects)
        return combinedEffects;
    }

    function addEffects(x, y, cover_area, effect) {
        for (let i = x - cover_area; i <= x + cover_area; i++) {
            for (let j = y - cover_area; j <= y + cover_area; j++) {
                if (i >= 0 && i < mapGrid.length - 1 && j >= 0 && j < mapGrid[0].length - 1) {
                    addMapBoxEffect(i, j, effect);
                }
            }
        }
    }

    const addMapBoxEffect = (xindex, yindex, effect) => {
        const newGrid = mapGrid;
        newGrid[xindex][yindex].effects.push(effect)
        setMapGrid(newGrid);
    }

    const addGamePopulation = () => {
        const newPopulation = { ...mainStats, population: mainStats.population + selectedElement.actual_population }
        setMainStats(newPopulation)
    }

    const eventHandler = () => {

    }

    function checkAdjacentPositions(xindex, yindex) {
        if (xindex < 0 || xindex >= mapGrid.length || yindex < 0 || yindex >= mapGrid[0].length) {
            throw new Error("Index out of bounds");
        }
        const adjacentPositions = [{object: {}, x: {}, y:{}}];
        // check top position
        if (xindex > 0) {
            adjacentPositions.push({object: mapGrid[xindex - 1][yindex], x: xindex-1, y: yindex});            
        }
        // check bottom position
        if (xindex < mapGrid.length - 1) {
            adjacentPositions.push({object: mapGrid[xindex + 1][yindex], x: xindex+1,y: yindex});
        }
        // check left position
        if (yindex > 0) {
            adjacentPositions.push({object: mapGrid[xindex][yindex - 1], x: xindex, y: yindex-1});
        }
        // check right position
        if (yindex < mapGrid[0].length - 1) {
            adjacentPositions.push({object: mapGrid[xindex][yindex + 1], x: xindex, y: yindex +1});
        }
        return adjacentPositions;
    }

    return <div className='main-game-controller'>
        <Sidebar className="sidebar" events={{ setSelectedElement }}></Sidebar>
        <StatsUI className='stats-main-row ' objProps={mainStats}></StatsUI>
        <Map className='map-container' mapGrid={mapGrid} events={{ eventHandler, setBlock }}></Map>
    </div>

}