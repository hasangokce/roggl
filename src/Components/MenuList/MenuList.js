import React, { Children } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './MenuList.css';
import { Menu } from '../Menu/Menu'
import TopBar from '../TopBar/TopBar'

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
      active_item: { id: "2", name: 'Artificial' },
      menus: [
        { id: "100", name: 'Academic English' },
        { id: "110", name: 'Artificial Intelligence' },
        { id: "120", name: 'Clean code' },
        { id: "130", name: 'Design patterns' },
        { id: "140", name: 'Learn Guitar' },
        { id: "150", name: 'Learn React' },
        { id: "160", name: 'Learn Regular Expressions' },
        { id: "170", name: 'Learn JavaScript ın 30 days' },
        { id: "180", name: 'Software Engineering Topics' },
        { id: "190", name: 'Speaking English' },
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
    const newState = {
      ...this.state,
      menus: [
        ...this.state.menus,
        { id: uuidv4(), name: 'New collection' }
      ],
    };
    this.setState(newState);
  }

  deleteMenu() {
    alert('delete menu called')
  }

  removeMenu() {
    // get current menu items
    let menus = this.state.menus;
    menus = menus.filter(currentMenu => currentMenu.id !== this.state.active_item.id);
    this.setState({ menus: menus });
    // no operation if there is no menu item
    if (menus[0]) {
      const firstMenu = menus[0]
      this.setState({ active_item: firstMenu })
    }
  }

  handleMenuClick(e) {
    // returns id such as #342 to 342
    console.log(e.target.hash)
    let id = e.target.hash.replace('#', '');

    const name = e.target.text
    console.log(name)
    const newState = {
      ...this.state,
      active_item: { id: id, name: name },
    };
    this.setState(newState);
  }

  handleChange(event) {
    console.log('handleChange()')
    const id = this.state.active_item.id
    console.log(id)
    const name = event.target.value
    console.log(name)
    // Update menu state
    let menus = this.state.menus
    // const found = menus.find(element => element.id === id) // returns elements all data
    const found = menus.findIndex(element => element.id === id)
    console.log('found: ' + found)

    if (found) {
      menus[found].name = name

      this.setState({
        active_item: { id: id, name: name },
        menus: menus
      });
    }
  }

  render() {
    return (
      <div className="MenuList">
        <TopBar active_menu={this.state.active_item} onChange={this.handleChange}></TopBar>
        {
          this.state.menus.map(menu => {
            return <Menu menu={menu} key={menu.id} id={menu.id} handleMenuClick={this.handleMenuClick}  />
          })
        }
        <hr />
        <a href="#addMenu" onClick={this.addMenu}>+ Add new</a>
        <a href="#removeMenu" onClick={this.removeMenu}>- Delete this</a>
      </div>
    );
  }

  // render_0() {
  //   return (
  //     <div>
  //       <a href="#ai">Artificial Intelligence</a>
  //       <a href="#ai">Clean code</a>
  //       <a href="#ai">Design patterns</a>
  //       <a href="#ai">English</a>
  //       <a href="#ai">Learn Guitar</a>
  //       <a href="#ai">Learn Guitar</a>
  //       <a href="#ai">Learn React</a>
  //       <a href="#ai">Learn Regular Expressions</a>
  //       <a href="#services">Learn JavaScript In 30 days.</a>
  //       <a href="#clients">Learn Design Patterns</a>
  //       <a href="#ai">Software Engineering Topics</a>
  //       <a href="#contact">+ Add new</a>
  //     </div>
  //   );
  // }
}