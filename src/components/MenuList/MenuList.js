import React from 'react'
import PropTypes from 'prop-types'
import './MenuList.css';
import { Menu } from '../Menu/Menu'
import { TopBarContainer } from '../../containers/TopBarContainer'

export class MenuList extends React.Component {

  render () {
    const { menus, active_item, onHandleChange, onHandleMenuClick, onAddMenu, onRemoveMenu, onStudy, activeStyle } = this.props

    return (
      <div className="MenuList">
        <TopBarContainer
          active_item={active_item}
          onHandleChange={onHandleChange}
        />
        {
          menus.map(menu => {
            return (
              <Menu
                _id={menu._id}
                key={menu._id}
                menu={menu}
                onHandleMenuClick={onHandleMenuClick}
                style={active_item._id === menu._id ? activeStyle : {}}
              />
            )
          })
        }
        <hr />
        <a href="#addMenu" onClick={onAddMenu}><div className="btnSide">Add</div></a>
        <a href="#removeMenu" onClick={onRemoveMenu}><div className="btnSide">Delete</div></a>
        <a href="#onStudy" onClick={onStudy}><div className="btnSide">Study</div></a>
      </div>
    );
  }
}

MenuList.propTypes = {
  active_item: PropTypes.object.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onHandleMenuClick: PropTypes.func.isRequired,
  onAddMenu: PropTypes.func.isRequired,
  onRemoveMenu: PropTypes.func.isRequired,
  onStudy: PropTypes.func.isRequired,
  activeStyle: PropTypes.object.isRequired
}