import React from 'react'
import './SideNav.css';
import MenuList from '../MenuList/MenuList'
import { ReactComponent as Logo } from '../../logo.svg';


export default class SideNav extends React.Component {
  render() {
    return (
      <div className="Sidenav">
        <div className="logo">
          <Logo></Logo>
          <h3>~</h3>
        </div>
        <MenuList></MenuList>
      </div>
    );
  }
}
