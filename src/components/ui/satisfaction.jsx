import React from "react";
import {
  faHome,
  faIndustry,
  faRoad,
  faSnowplow,
  faArrowPointer,
  faBuildingShield,
  faFireExtinguisher,
  faHeartPulse,
  faDropletSlash,
  faTrash,
  faPlugCirclePlus,
  faPlugCircleExclamation,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Satisfaction = () => {
  return (
    <div className="satisfaction-container">
      <div>
        <FontAwesomeIcon
          className="satisfaction-icon"
          icon={faPlugCirclePlus}
          size="2x"
          color="red"
        />
        <div>Electricity</div>
      </div>
      <div>
        <FontAwesomeIcon
          className="satisfaction-icon"
          icon={faFireExtinguisher}
          size="2x"
          color="red"
        />
        <div>Firehouse</div>
      </div>
      <div>
        <FontAwesomeIcon
          className="satisfaction-icon"
          icon={faBuildingShield}
          size="2x"
          color="red"
        />
        <div>Police</div>
      </div>
    </div>
  );
};

export default Satisfaction;
