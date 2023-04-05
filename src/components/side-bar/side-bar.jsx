
import { Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faIndustry, faRoad, faSnowplow, faArrowPointer, faBuildingShield } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/ui/logo.png';
import { useState } from 'react';
import { Road } from '../../classes/road';
import { ResidentialZone } from '../../classes/residential-zone';
import { Service } from '../../classes/service';

import { __hash__ } from '../../utils/utils';

const sidebarNavItems = [
  {
    display: 'Construction',
    menuItems: [
      { name: "pointer", icon: faArrowPointer, value: -1 },
      { name: "delete", icon: faSnowplow, value: 0 },
      { name: "road", icon: faRoad, value: 1, class: new Road("road",0, 10, 0, false, []) },
      {
        name: "residential", icon: faHome, value: 2,
        class: new ResidentialZone(
          new Date().getTime().toString(),
          "activable_building",
          false, "residential", 0,
          "home", 20, 2, false,
          [], [], [], [], 0, [], 0
        )
      },
      { name: "factory", icon: faIndustry, value: 3 }
    ]
  },
  {
    display: 'Services',
    menuItems: [
      {
        name: "police", icon: faBuildingShield, value: 4,
        class: new Service(
          new Date().getTime().toString(),
          "activable_building",
          false, "service", 0,
          "police", 4,
          {
            id: __hash__(),
            factor: 0,
            parentId: new Date().getTime().toString(),
            type: 'police'
          }
        )
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
                  onClick={() => { setSelectedElement(item); setSelectedIcon(item.icon) }} />
              })}
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

