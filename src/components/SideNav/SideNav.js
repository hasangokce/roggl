import React from 'react'
import propTypes from 'prop-types'
import './SideNav.css';
import { MenuListContainer } from '../../containers/MenuListContainer'
// import { ReactComponent as Logo } from '../../logo.svg';
// import logo from '../../logo.svg';

export class SideNav extends React.Component {
  render () {
    const { menus, active_item, onAddMenu, onRemoveMenu, onHandleMenuClick, onHandleChange, onStudy } = this.props

    return (
      <div className="Sidenav">
        <div className="logo" style={{ height: 80 }}>
          <h3>Roggl</h3>
        </div>
        <MenuListContainer
          menus={menus}
          active_item={active_item}
          onAddMenu={onAddMenu}
          onRemoveMenu={onRemoveMenu}
          onHandleMenuClick={onHandleMenuClick}
          onHandleChange={onHandleChange}
          onStudy={onStudy}
        />
      </div>
    );
  }
}

SideNav.propTypes = {
  menus: propTypes.array.isRequired,
  active_item: propTypes.object.isRequired,
  onAddMenu: propTypes.func.isRequired,
  onRemoveMenu: propTypes.func.isRequired,
  onHandleMenuClick: propTypes.func.isRequired,
  onHandleChange: propTypes.func.isRequired,
  onStudy: propTypes.func.isRequired,
}