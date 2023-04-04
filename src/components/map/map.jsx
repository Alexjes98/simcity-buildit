import MapBox from "./map-box";

export default function Map(props) {
    const mapGrid = props.mapGrid
    const { setBlock } = props.events

    return (
        mapGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="map-grid" >
                {row.map((value, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="map-box">
                        <MapBox values={{ value: value.value, xIndex: rowIndex, yIndex: colIndex, setBlock: setBlock }} ></MapBox>
                    </div>
                ))
                }
            </div>
        ))
    );

}