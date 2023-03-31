import StatsUI from '../../components/ui/stats';

export default function GameController () {
    var mainStats = {
        level: 'test',
        experience: 'test',
        population: 'test',
        happiness: 'test',
        simoleons: 'test'
    }
    return <div>
        <StatsUI objProps={mainStats}></StatsUI>
        
    </div>

}