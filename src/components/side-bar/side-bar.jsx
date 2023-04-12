
import { Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faPlugCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/ui/logo.png';
import { useState } from 'react';


const sidebarNavItems = [
  {
    display: 'Construction',
    menuItems: [
      { name: "pointer", icon: faArrowPointer, value: -1},
      { name: "delete", icon: faSnowplow, value: 0},
      { name: "road", icon: faRoad, value: 1},
      {
        name: "residential", icon: faHome, value: 2
      },

    ]
  },
  {
    display: 'Services',
    menuItems: [
      {
        name: "police", icon: faBuildingShield, value: 4
      },
      {
        name: "firehouse", icon: faFireExtinguisher, value: 5
      },
      {
        name: "health", icon: faHeartPulse, value: 6
      },
      {
        name: "residual-water", icon: faDropletSlash, value: 7
      },
      {
        name: "waste-plant", icon: faTrash, value: 8
      },
      {
        name: "electric-clean", icon: faPlugCirclePlus, value: 9
      },
      {
        name: "electric-unclean", icon: faPlugCircleExclamation, value: 10
      }
    ]
  },
  {
    display: 'Inventary',
    menuItems: [
    ]
  },

  {
    display: 'Specialities',
    menuItems: [
    ]
  },
]

export default function Sidebar(props) {
  const { setSelectedElement } = props.events;
  const [selectedIcon, setSelectedIcon] = useState(faArrowPointer);

  return <div className='sidebar'>
    <div>
      <Image className="side-bar-logo" src={logo} alt="logo"></Image>
    </div>
    <div className='text-center'>
      <div>Selected</div>
      <FontAwesomeIcon className='menu-icon' size='2x' icon={selectedIcon}></FontAwesomeIcon>
    </div>
    <div className="sidebar-menu text-center">
      {
        sidebarNavItems?.map((item, index) => (
          <div key={index}>
            <div className="sidebar-menu-item-text">
              <h4>{item.display}</h4>
              
            </div>
            <div className="row row-cols-2">
              {item?.menuItems?.map((item, index) => {
                return (
                  <div key={index}>
                    <FontAwesomeIcon key={item.value}
                      className='menu-icon col' icon={item.icon}
                      size='2x'
                      onClick={() => { setSelectedElement({ name: item.name }); setSelectedIcon(item.icon) }} />
                    <div>{item.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

