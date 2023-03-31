import { useRef, useState } from 'react';
import { Image } from 'react-bootstrap';

import logo from '../../assets/ui/logo.png';

const sidebarNavItems = [
  {
    display: 'Construction',
    icon: <i className='bx bx-home'></i>,
  },
  {
    display: 'Orders',
    icon: <i className='bx bx-receipt'></i>,
    to: '/order',
    section: 'order'
  },
]

export default function Sidebar () {
  const sidebarRef = useRef();

  return <div className='sidebar'>
    <div>
    <Image className="side-bar-logo" src={logo} alt="logo"></Image>
    </div>
    <div ref={sidebarRef} className="sidebar-menu">
      {
        sidebarNavItems.map((item, index) => (
          <div>
            <div className="sidebar-menu-item-icon">
              {item.icon}
            </div>
            <div className="sidebar-menu-item-text">
              {item.display}
            </div>
          </div>

        ))
      }
    </div>
  </div>;
};

