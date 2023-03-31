import { Image } from "react-bootstrap"

import routeImage from '../../assets/map/road.png';
import grassImage from '../../assets/map/grass.png';
import noFound from '../../assets/map/nofound.png';

export default function MapBox(props) {
    
    const { value, xIndex, yIndex } = props.value

    const defineBlock = (value) => {
        switch (value) {
            case 0:
                return grassImage;
            case 1:
                return routeImage;        
            default:
                return noFound;
        }
    }

    return (
        <div>
            <Image src={defineBlock(value)} alt={value} onClick={()=>{
                console.log("X:",xIndex,"Y:",yIndex)
            }} />
        </div>
    )
}