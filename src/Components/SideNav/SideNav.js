import React from 'react'
import './SideNav.css';
import MenuList from '../MenuList/MenuList'
// import { ReactComponent as Logo } from '../../logo.svg';
// import logo from '../../logo.svg';

export default class SideNav extends React.Component {
  render () {
    return (

        <div className="Sidenav">
          <div className="logo" style={{ height: 80 }}>
            <h3>Roggl</h3>
          </div>
        <MenuList
          menus={this.props.menus}
          active_item={this.props.active_item}
          onAddMenu={this.props.onAddMenu}
          onRemoveMenu={this.props.onRemoveMenu}
          onHandleMenuClick={this.props.onHandleMenuClick}
          onHandleChange={this.props.onHandleChange}
        ></MenuList>
        </div>
  

    );
  }
}
