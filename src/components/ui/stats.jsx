import React from "react"
export default function StatsUI(props) {
    return (
        <div className="grid-container stats-main-row">
            <h4 className="grid-element">Level {props.objProps.level ?? 0} </h4>
            <h4 className="grid-element">Experience {props.objProps.experience ?? 0}</h4>
            <h4 className="grid-element">Population {props.objProps.population ?? 0}</h4>
            <h4 className="grid-element">Happiness {props.objProps.happiness ?? 0}%</h4>
            <h4 className="grid-element">Simoleones {props.objProps.simoleons ?? 0}</h4>
        </div>
    )
}