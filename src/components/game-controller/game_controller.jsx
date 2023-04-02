import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';


export default function GameController() {
    var mainStats = {
        level: 'test',
        experience: 'test',
        population: 'test',
        happiness: 'test',
        simoleons: 'test'
    }
    var mapGrid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => { return { visual: 0, effects: [] } }));

    var selectedElement = -1

    const setSelectedElement = (element) => {
        console.log(selectedElement, "CHANGED TO: ", element)
        selectedElement = element;
        return selectedElement;
    }

    const setBlock = (xindex, yindex) => {
        console.log("BLOCK: ", xindex, "AND", yindex)
        if (selectedElement !== -1) {
            console.log("BLOCK: ", xindex, "AND", yindex, "WITH SELECTED: ", selectedElement);
            mapGrid[xindex][yindex].visual = selectedElement;
            return selectedElement;            
        }
        
    }

    const eventHandler = () => {

    }

    return <div className='main-game-controller'>
        <Sidebar className="sidebar" events={{ setSelectedElement }}></Sidebar>
        <StatsUI className='stats-main-row ' objProps={mainStats}></StatsUI>
        <Map className='main-content' mapGrid={mapGrid} events={{ eventHandler, setBlock }}></Map>
    </div>

}