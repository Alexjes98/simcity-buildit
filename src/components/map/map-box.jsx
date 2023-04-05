import { Image } from "react-bootstrap"

import routeImage from '../../assets/map/road.png';
import grassImage from '../../assets/map/grass.png';
import houseImage from '../../assets/map/house.png';
import factoryImage from '../../assets/map/fabric.png';
import policeImage from '../../assets/map/police.png';
import fireHouseImage from '../../assets/map/firehouse.png';
import healthImage from '../../assets/map/hospital.png';
import noFound from '../../assets/map/nofound.png';
import { useState } from "react";

export default function MapBox(props) {
    
    const { xIndex, yIndex, setBlock } = props.values
    const [value, setValue] = useState(props.values.value)
    const defineBlock = (value) => {
        switch (value) {
            case 0:
                return grassImage;
            case 1:
                return routeImage;
            case 2:
                return houseImage;
            case 3:
                return factoryImage;
            case 4: 
                return policeImage;
            case 5:
                return fireHouseImage;
            case 6:
                return healthImage;
            default:
                return noFound;
        }
    }

    return (
        <div>
            <Image src={defineBlock(value)} alt={value} onClick={() => setValue(setBlock(xIndex, yIndex)??value)} />
        </div>
    )
}