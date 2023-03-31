import MapBox from "./map-box";

export default function Map(props) {
    const { mapGrid } = props

    return (
        mapGrid.map((row, rowIndex) => (
            <div className="map-grid" >
                {row.map((value, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="map-box">
                        <MapBox value={value} ></MapBox>
                    </div>
                ))
                }
            </div>
        ))
    );

}