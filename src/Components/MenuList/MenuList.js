import React, { Children } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './MenuList.css';
import { Menu } from '../Menu/Menu'
import TopBar from '../TopBar/TopBar'
import ColumnList from '../ColumnList/ColumnList'

/**
 * A React component should use props to store information that can be changed,
 * but can only be changed by a different component.
 * A React component should use state to store information that the component
 * itself can change.
 */

export default class MenuList extends React.Component {

  render () {
    const activeStyle = {
      backgroundColor: 'rgba(25, 25, 25, 0.3)',
    };
    return (
        <div className="MenuList">
          <TopBar active_item={this.props.active_item} onHandleChange={this.props.onHandleChange}></TopBar>
          {
          this.props.menus.map(menu => {
              return <Menu menu={menu} key={menu._id} _id={menu._id} onHandleMenuClick={this.props.onHandleMenuClick} style={this.props.active_item._id === menu._id ? activeStyle : {}}  />
            })
          }
          <hr />
          <a href="#addMenu" onClick={this.props.onAddMenu}>+ Add new</a>
          <a href="#removeMenu" onClick={this.props.onRemoveMenu}>- Delete this</a>
        </div>

      
    );
  }
}