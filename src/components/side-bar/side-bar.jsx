
import { Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faIndustry, faRoad, faSnowplow, faArrowPointer, faBuildingShield } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/ui/logo.png';
import { useState } from 'react';
import { newResidentialZone, newRoad, newPoliceStation } from '../../constants/defaultBuildings';

const sidebarNavItems = [
  {
    display: 'Construction',
    menuItems: [
      { name: "pointer", icon: faArrowPointer, value: -1 },
      { name: "delete", icon: faSnowplow, value: 0 },
      { name: "road", icon: faRoad, value: 1, class: newRoad },
      {
        name: "residential", icon: faHome, value: 2,
        class: newResidentialZone
      },
      { name: "factory", icon: faIndustry, value: 3 }
    ]
  },
  {
    display: 'Services',
    menuItems: [
      {
        name: "police", icon: faBuildingShield, value: 4,
        class: newPoliceStation()
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
              {item.display}
            </div>
            <div className="sidebar-menu-item-icon">
              {item?.menuItems?.map((item, index) => {
                return <FontAwesomeIcon key={item.value}
                  className='menu-icon' icon={item.icon}
                  size='2x'
                  onClick={() => { setSelectedElement({name: item.name}); setSelectedIcon(item.icon) }} />
              })}
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

