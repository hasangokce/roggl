import React from 'react'
import './SideNav.css';
import MenuList from '../MenuList/MenuList'
import logo from '../../logo.svg';

export default class SideNav extends React.Component {
  render() {
    return (
      <div className="Sidenav">
        <div className="logo">
          {logo}
          <h3>Welcome</h3>
        </div>
        <MenuList></MenuList>
      </div>
    );
  }
}
