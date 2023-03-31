import StatsUI from '../../components/ui/stats';
import Map from '../map/map';
import Sidebar from '../side-bar/side-bar';

export default function GameController () {
    var mainStats = {
        level: 'test',
        experience: 'test',
        population: 'test',
        happiness: 'test',
        simoleons: 'test'
    }
    var mapGrid =  Array.from({ length: 35 }, () => Array.from({ length: 35 }, () => 0));

    return <div className='main-game-controller'>
        <Sidebar className="sidebar"></Sidebar>
        <StatsUI className='stats-main-row '  objProps={mainStats}></StatsUI>
        
        <Map className='main-content' mapGrid={mapGrid}></Map>
    </div>

}