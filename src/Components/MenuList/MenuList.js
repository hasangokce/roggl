import React from 'react'
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
      active_menu: 2,
      menus: [
        { id: 1, name: 'Academic English' },
        { id: 2, name: 'Artificial Intelligence' },
        { id: 3, name: 'Clean code' },
        { id: 4, name: 'Design patterns' },
        { id: 5, name: 'Learn Guitar' },
        { id: 6, name: 'Learn React' },
        { id: 7, name: 'Learn Regular Expressions' },
        { id: 8, name: 'Learn JavaScript ın 30 days' },
        { id: 9, name: 'Software Engineering Topics' },
        { id: 10, name: 'Speaking English' },
      ]
    }

    this.addMenu = this.addMenu.bind(this)
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

  handleActive() {

  }

  render() {
    return (
      <div className="TrackList">
        <TopBar active_menu={this.state.menus.find(x => x.id === this.state.active_menu)}></TopBar>
        {
          this.state.menus.map(menu => {
            return <Menu menu={menu} key={menu.id} />
          })
        }
        <a href="#addMenu" onClick={this.addMenu}>+ Add new</a>
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