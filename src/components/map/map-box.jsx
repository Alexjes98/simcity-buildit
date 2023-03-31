import { Image } from "react-bootstrap"

import routeImage from '../../assets/map/road.png';
import grassImage from '../../assets/map/grass.png';
import noFound from '../../assets/map/nofound.png';

export default function MapBox(props) {
    const { value } = props

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
            <Image src={defineBlock(value)} alt={value} />
        </div>
    )
}