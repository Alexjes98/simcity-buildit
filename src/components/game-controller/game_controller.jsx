import { useEffect, useState } from 'react';

import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

import { defaultMainStats } from '../../constants/constants';

import { newCleanElectricity, newFireHouse, newHospital, newPoliceStation, newResidentialZone, newResidualWater, newRoad, newTrashPlant, newUncleanElectricity } from '../../constants/defaultBuildings';

export default function GameController() {

    const [mainStats, setMainStats] = useState(defaultMainStats)
    const [buildingsStats, setBuildingsStats] = useState({
        residentials: 0,
        police: 0,
        firehouse: 0,
        hospitals: 0,
        residual_waters: 0,
        waste_plants: 0,
        electric_plants: 0,
    })

    const [mapGrid, setMapGrid] = useState(Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => { return { name: 'delete', effects: [] } })));
    var [selectedElement, setSelectedElement] = useState({ name: "pointer" })
    var auxiliarElement = {};

    const changeSelectedElement = (element) => {
        if (selectedElement === element) return;
        setSelectedElement(element);
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

    const defineHapiness = () => {
        let totalHapiness = 0
        let totalHouses = 0
        for (let i = 0; i < mapGrid.length; i++) {
            const houses = mapGrid[i].filter((item) => item.type === "residential")
            houses.forEach(residential => {
                console.log("ROW: ",i)
                totalHouses++
                totalHapiness += residential.calculateHapiness()
            });
        }
        const average_happiness_percentage = (totalHapiness / totalHouses)        
        const newStats = mainStats
        newStats.happiness = average_happiness_percentage.toFixed(1)
        setMainStats(newStats)
    }
    
    useEffect(() =>{
        defineHapiness()
    },[buildingsStats, mainStats])

    const defineBuildingValues = (xindex, yindex) => {
        switch (selectedElement.name) {
            case 'road':
                auxiliarElement = newRoad()
                auxiliarElement.effects = definePositionEffects(auxiliarElement.effects, mapGrid[xindex][yindex].effects);
                activateAdjacentBuildings(xindex, yindex);
                break;
            case 'residential':
                auxiliarElement = newResidentialZone()
                if (checkRoads(xindex, yindex)) {
                    auxiliarElement.is_active = true
                    auxiliarElement.effects = definePositionEffects(auxiliarElement.effects, mapGrid[xindex][yindex].effects);
                    setBuildingsStats({ ...buildingsStats, residentials: buildingsStats.residentials + 1 })
                    addGamePopulation(auxiliarElement.actual_population);
                }
                break;
            case 'police':
                auxiliarElement = newPoliceStation()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, police: buildingsStats.police + 1 })
                }
                break;
            case 'firehouse':
                auxiliarElement = newFireHouse()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, firehouse: buildingsStats.firehouse + 1 })
                }
                break;
            case 'health':
                auxiliarElement = newHospital()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, hospitals: buildingsStats.hospitals + 1 })
                }
                break;
            case 'residual-water':
                auxiliarElement = newResidualWater()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, residual_waters: buildingsStats.residual_waters + 1 })
                }
                break;
            case 'waste-plant':
                auxiliarElement = newTrashPlant()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, waste_plants: buildingsStats.waste_plants + 1 })
                }
                break;
            case 'electric-clean':
                auxiliarElement = newCleanElectricity()
                setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                setBuildingsStats({ ...buildingsStats, electric_plants: buildingsStats.electric_plants + 1 })
                break;
            case 'electric-unclean':
                auxiliarElement = newUncleanElectricity()
                if (checkRoads(xindex, yindex)) {
                    setService(xindex, yindex, auxiliarElement.cover_area, auxiliarElement.cover_service)
                    setBuildingsStats({ ...buildingsStats, electric_plants: buildingsStats.electric_plants + 1 })
                }
                break;
            default:
                break;
        }
        
        updateGrid(xindex, yindex, auxiliarElement)
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
            if (element.object.is_active) return;
            addEffects(element.x, element.y, element.object.cover_area, element.object.cover_service)
            element.object.is_active = true;
            updateGrid(element.x, element.y, element.object);
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

    const addGamePopulation = (population) => {
        const newPopulation = { ...mainStats, population: mainStats?.population + population }
        setMainStats(newPopulation)
    }

    const addExperience = (experience) => {
        const newExperience = { ...mainStats, experience: mainStats?.experience + experience}
        if(newExperience.experience >= 100){
            newExperience.experience = 0;
            newExperience.level = newExperience.level + 1;
        }
        setMainStats(newExperience)
    }

    const eventHandler = () => {

    }

    function checkAdjacentPositions(xindex, yindex) {
        if (xindex < 0 || xindex >= mapGrid.length || yindex < 0 || yindex >= mapGrid[0].length) {
            throw new Error("Index out of bounds");
        }
        const adjacentPositions = [{ object: {}, x: {}, y: {} }];
        // check top position
        if (xindex > 0) {
            adjacentPositions.push({ object: mapGrid[xindex - 1][yindex], x: xindex - 1, y: yindex });
        }
        // check bottom position
        if (xindex < mapGrid.length - 1) {
            adjacentPositions.push({ object: mapGrid[xindex + 1][yindex], x: xindex + 1, y: yindex });
        }
        // check left position
        if (yindex > 0) {
            adjacentPositions.push({ object: mapGrid[xindex][yindex - 1], x: xindex, y: yindex - 1 });
        }
        // check right position
        if (yindex < mapGrid[0].length - 1) {
            adjacentPositions.push({ object: mapGrid[xindex][yindex + 1], x: xindex, y: yindex + 1 });
        }
        return adjacentPositions;
    }

    return <div className='main-game-controller'>
        
        <Sidebar className="sidebar" events={{ setSelectedElement: changeSelectedElement }}></Sidebar>
        <StatsUI className='stats-main-row ' objProps={mainStats}></StatsUI>
        <Map className='map-container' mapGrid={mapGrid} events={{ eventHandler, setBlock }}></Map>
    </div>

}