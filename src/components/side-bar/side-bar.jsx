
import { Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faIndustry, faRoad, faSnowplow, faArrowPointer } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/ui/logo.png';
import { useState } from 'react';
import { Road } from '../../classes/road';
import { ResidentialZone } from '../../classes/residential-zone';

const sidebarNavItems = [
  {
    display: 'Construction',
    menuItems: [
      { name: "pointer", icon: faArrowPointer, value: -1 },
      { name: "delete", icon: faSnowplow, value: 0 },
      { name: "road", icon: faRoad, value: 1, class: new Road(0,10,0,false) },
      { name: "residential", icon: faHome, value: 2, 
      class: new ResidentialZone(
        false,"residential",0,
        "home",20,2,false,
        [],[],[],[],0,[],0
      ) },
      { name: "factory", icon: faIndustry, value: 3}
    ]
  },
  {
    display: 'Servicios',
    menuItems: [
    ]
  },
  {
    display: 'Inventario',
    menuItems: [
    ]
  },
  
  {
    display: 'Especializaciones',
    menuItems: [
    ]
  },
]

const defineSelected = (value) => {
  switch (value) {
    case 0:
      return faSnowplow;
    case 1:
      return faRoad;
    case 2:
      return faHome;
    case 3:
      return faIndustry;
    default:
      return faArrowPointer;
  }
}

export default function Sidebar(props) {
  const { setSelectedElement } = props.events;
  const [selectedIcon, setSelectedIcon] = useState(-1);

  return <div className='sidebar'>
    <div>
      <Image className="side-bar-logo" src={logo} alt="logo"></Image>
    </div>
    <div className='text-center'>
      <FontAwesomeIcon className='menu-icon' size='2x' icon={defineSelected(selectedIcon)}></FontAwesomeIcon>
    </div>
    <div className="sidebar-menu">
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
                  onClick={() => { setSelectedElement(item); setSelectedIcon(item.value) }} />
              })}
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

