import React from "react";
import {
  faBuildingShield,
  faFireExtinguisher,
  faHeartPulse,
  faDroplet,
  faTrash,
  faPlugCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Satisfaction = ({ satisfaction }) => {
  const icons = [
    {
      icon: faPlugCirclePlus,
      label: "Electricity",
      satisfied:
        satisfaction.filter((s) => s.type === "electricity").length === 0,
    },
    {
      icon: faDroplet,
      label: "Water",
      satisfied:
        satisfaction.filter((s) => s.type === "residual-water").length === 0,
    },
    {
      icon: faFireExtinguisher,
      label: "Firehouse",
      satisfied:
        satisfaction.filter((s) => s.type === "firehouse").length === 0,
    },
    {
      icon: faBuildingShield,
      label: "Police",
      satisfied: satisfaction.filter((s) => s.type === "police").length === 0,
    },
    {
      icon: faHeartPulse,
      label: "Health",
      satisfied: satisfaction.filter((s) => s.type === "health").length === 0,
    },
    {
      icon: faTrash,
      label: "Cleanliness",
      satisfied:
        satisfaction.filter((s) => s.type === "cleanliness").length === 0,
    },
  ];

  return (
    <div className="satisfaction-container">
      {icons.map(({ icon, label, satisfied }) => (
        <div key={label}>
          <FontAwesomeIcon
            className="satisfaction-icon"
            icon={icon}
            size="2x"
            color={satisfied ? "green" : "red"}
          />
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default Satisfaction;
