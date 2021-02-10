import React from 'react'
import './App.css';
import SideNav from '../SideNav/SideNav'
import ColumnList from '../ColumnList/ColumnList'
import ColumnListNone from '../ColumnListNone/ColumnListNone'
import Roggl from '../../util/Roggl';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active_item: { _id: '', name: '...' },
      menus: [
        { _id: 'null', name: 'Loading...' },
      ],
      columns: [
        // { _id: 'a1', title: 'title 1', content: 'content1' },
        // { _id: 'a2', title: 'title 2', content: 'content2' },
        // { _id: 'a3', title: 'title 3', content: 'content3' },
      ]
    }

    this.addMenu = this.addMenu.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.removeMenu = this.removeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  addMenu () {
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

  componentDidMount () {
    Roggl.getBoards().then(menus => {
      if (menus.length) {
        this.setState({ menus: menus });
        this.setState({ active_item: menus[0] });
      }
    });
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

  handleMenuClick (e) {
    // returns _id such as #342 to 342
    console.log('handleMenuClick called');
    console.log(e.target.hash)
    if (!e.target.hash) return
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

    // get board content from DB
    Roggl.getColumns(_id).then(response => {
      console.log(response);
      this.setState({ columns: response })
    })


  }


  handleChange (event) {
    const _id = this.state.active_item._id
    let name = event.target.value
    console.log("new name" + name)
    if (name === '') {
      name = "- "
    }
    // Fetch update request
    Roggl.update({ _id, name })

    // State tasks
    let menus = this.state.menus

    // const found = menus.find(element => element.id === _id) // returns elements all data
    const found = menus.findIndex(element => element._id === _id)
    console.log('found: ' + found)

    if (found >= 0) {
      // Update menu
      menus[found].name = name
      // this.setState({ menus: menus });
      // Update active item name
      let active_item = this.state.active_item
      active_item.name = name
      this.setState({ active_item: active_item, menus: menus })
    }
  }

  handleContentChange (e) {
    const id = e.target.id
    // console.log('Hello bro!')
    // console.log('Text inside div id', e.target.id)
    // console.log('Text inside div', e.currentTarget.textContent)
    // console.log('Text inside div', e.currentTarget.innerHTML)

    let columns = this.state.columns // copy
    const found = columns.findIndex(element => element._id === id) //find
    columns[found].content = e.currentTarget.innerHTML //change

    this.setState({
      columns: columns
    })

  }


  render () {
    return (
      <div className="App">
        <div className="main">
          <SideNav
            onAddMenu={this.addMenu}
            onRemoveMenu={this.removeMenu}
            onHandleMenuClick={this.handleMenuClick}
            onHandleChange={this.handleChange}
            menus={this.state.menus}
            active_item={this.state.active_item}
          ></SideNav>
          {this.state.columns.length === 0
            ? <ColumnListNone />
            : <ColumnList columns={this.state.columns} onHandleContentChange={this.handleContentChange}></ColumnList>}
        </div>
      </div>
    );
  }
}