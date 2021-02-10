import React, { Children } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './MenuList.css';
import { Menu } from '../Menu/Menu'
import TopBar from '../TopBar/TopBar'
import Roggl from '../../util/Roggl';
import ColumnList from '../ColumnList/ColumnList'

/**
 * A React component should use props to store information that can be changed,
 * but can only be changed by a different component.
 * A React component should use state to store information that the component
 * itself can change.
 */

export default class MenuList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active_item: { _id: '', name: '...'},
      menus: [
        { _id: 'null', name: 'Loading...' },
      ]
    }

    this.addMenu = this.addMenu.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.removeMenu = this.removeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.removeTrack = this.removeTrack.bind(this);
  }

  addMenu() {
    // this.setState({ menus: [...this.state.menus, {id:12, name: 'New collection'}] })
    Roggl.saveBoard({ name: 'New board' }).then(returnedId => {
      // set state
      const newState = {
        ...this.state,
        menus: [
          ...this.state.menus,
          { _id: returnedId, name: 'New board' }
        ],
      };
      this.setState(newState);
    })
  }


  componentDidMount() {
    Roggl.getBoards().then(menus => {
      if (menus.length) {
        this.setState({menus: menus});
        this.setState({active_item: menus[0]});
      }
    });
    
  }

  deleteMenu() {
    alert('delete menu called')
  }

  removeMenu () {
    console.log('remove menu called');
    // get current menu items
    let menus = this.state.menus;
    menus = menus.filter(currentMenu => currentMenu._id !== this.state.active_item._id);
    this.setState({ menus: menus });
    // no operation if there is no menu item
    if (menus[0]) {
      const firstMenu = menus[0]
      this.setState({ active_item: firstMenu })
    }
    // db operation
    Roggl.delete(this.state.active_item._id)
  }

  handleMenuClick(e) {
    // returns _id such as #342 to 342
    console.log(e.target.hash)
    let _id = e.target.hash.replace('#', '');

    const name = e.target.text
    console.log(name)
    console.log(e.target);
    const newState = {
      ...this.state,
      active_item: { _id: _id, name: name },
    };
    this.setState(newState);

    // active menu item stuff
    this.setState({ active: _id });
  }

  handleChange(event) {
    const _id = this.state.active_item._id
    let name = event.target.value
    console.log(name)
    if (name === '') {
      name = " "
    }
    // Fetch update request
    Roggl.update({ _id, name })
    // Update menu state
    let menus = this.state.menus
    // const found = menus.find(element => element.id === _id) // returns elements all data
    const found = menus.findIndex(element => element._id === _id)
    console.log('found: ' + found)

    if (found) {
      menus[found].name = name

      this.setState({
        active_item: { _id: _id, name: name },
        menus: menus
      });
    }
  }

  render () {
    const activeStyle = {
      backgroundColor: 'rgba(25, 25, 25, 0.3)',
    };
    return (
        <div className="MenuList">
          <TopBar active_menu={this.state.active_item} onChange={this.handleChange}></TopBar>
          {
            this.state.menus.map(menu => {
              return <Menu menu={menu} key={menu._id} _id={menu._id} handleMenuClick={this.handleMenuClick} style={this.state.active === menu._id ? activeStyle : {}}  />
            })
          }
          <hr />
          <a href="#addMenu" onClick={this.addMenu}>+ Add new</a>
          <a href="#removeMenu" onClick={this.removeMenu}>- Delete this</a>
        </div>

      
    );
  }
}