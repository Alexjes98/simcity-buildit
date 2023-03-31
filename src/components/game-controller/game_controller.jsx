import StatsUI from '../../components/ui/stats';
import Map from '../map/map';

export default function GameController () {
    var mainStats = {
        level: 'test',
        experience: 'test',
        population: 'test',
        happiness: 'test',
        simoleons: 'test'
    }
    var mapGrid =  Array.from({ length: 25 }, () => Array.from({ length: 25 }, () => 0));

    return <div className='main-game-controller'>
        <StatsUI className='stats-container'  objProps={mainStats}></StatsUI>
        <Map className='map-container' mapGrid={mapGrid}></Map>
    </div>

}