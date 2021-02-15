import React, { Children } from 'react'
import './App.css';
import SideNav from '../SideNav/SideNav'
import ColumnList from '../ColumnList/ColumnList'
import ColumnListNone from '../ColumnListNone/ColumnListNone'
import Session from '../Session/Session'
import Roggl from '../../util/Roggl';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active_item: { _id: '', name: '...' },
      menus: [
      ],
      columns: [
      ],
      isLogin: false,
      page: 'login'
    }

    this.addMenu = this.addMenu.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.removeMenu = this.removeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.addNewPage = this.addNewPage.bind(this);
    this.handleDeletePage = this.handleDeletePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onStudy = this.onStudy.bind(this);
  }

  addMenu () {
    // this.setState({ menus: [...this.state.menus, {id:12, name: 'New collection'}] })
    let user = JSON.parse(localStorage.getItem('user'));
    Roggl.saveBoard({ name: 'New board', owner_id: user.user_id }).then(returnedId => {
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
    console.log('first time componentDidMount');
    if (localStorage.getItem('user')) {
      this.getBoards()
    }
  }

  getBoards () {
    const user_id = JSON.parse(localStorage.getItem('user')).user_id;
    console.log('get boards for user_id: ' + user_id);

    Roggl.getBoards(user_id).then(menus => {
      if (menus.length) {
        this.setState({ menus: menus, active_item: menus[0], page: 'home' });
        // Handle Get Columns
        this.handleGetColumns(menus[0]._id)
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
    console.log('|->called getColumns');
    console.log('|--> id: ' + _id);

    // Handle Get Columns
    this.handleGetColumns(_id)
  }

  handleGetColumns (_id) {
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

  handleTitleChange (e) {
    const id = e.target.id
    let columns = this.state.columns // copy
    const found = columns.findIndex(element => element._id === id) //find
    if (columns) {
      columns[found].content = e.currentTarget.textContent //change or .textContent
    } else {
      console.log('error has been prevented');
      return
    }
    this.setState({
      columns: columns
    })
    // debug
    console.log(id, e.currentTarget.textContent);
    // Send api post request to update column content
    Roggl.columnUpdateTitle({ _id: id, title: e.currentTarget.textContent })
  }

  handleContentChange (e) {
    const id = e.target.id
    let columns = this.state.columns // copy
    const found = columns.findIndex(element => element._id === id) //find
    columns[found].content = e.currentTarget.innerHTML //change or .textContent

    this.setState({
      columns: columns
    })

    // debug
    console.log(id, e.currentTarget.innerHTML);

    // Send api post request to update column content
    Roggl.columnUpdate({ _id: id, content: e.currentTarget.innerHTML })

  }

  addNewPage (e) {
    // copy columns state
    let columns = this.state.columns

    // database operations
    let user = JSON.parse(localStorage.getItem('user'));
    const owner_id = user.user_id // delete after authorization feature
    const board_id = this.state.active_item._id
    let title = ""
    let content = ""
    Roggl.addNewPage({ owner_id: owner_id, board_id: board_id, title: title, content: content }).then(returnedId => {
      columns.push({ _id: returnedId, board_id: board_id, title: '', content: '' })
      this.setState({
        columns: columns
      })
    })

  }

  handleDeletePage (e) {
    console.log('|-> delete page')
    const myKey = e.currentTarget.getAttribute('my-key')
    // get current menu items
    let columns = this.state.columns;
    columns = columns.filter(column => column._id !== myKey);
    this.setState({ columns: columns });
    Roggl.pageDelete(myKey)
  }

  pageSession () {
    return <Session handleSubmit={this.handleSubmit} handleRegister={this.handleRegister} page={this.state.page} message={this.state.message} />
  }
  pageHome () {
    return (
      <div className="main">
        <SideNav
          onAddMenu={this.addMenu}
          onRemoveMenu={this.removeMenu}
          onHandleMenuClick={this.handleMenuClick}
          onHandleChange={this.handleChange}
          onStudy={this.onStudy}
          menus={this.state.menus}
          active_item={this.state.active_item}
        ></SideNav>
        {this.state.columns.length === 0
          ? <ColumnListNone onAddNewPage={this.addNewPage} />
          : <ColumnList columns={this.state.columns} onHandleContentChange={this.handleContentChange} onHandleTitleChange={this.handleTitleChange} onAddNewPage={this.addNewPage} onHandleDeletePage={this.handleDeletePage}>></ColumnList>}
      </div>
    )
  }

  handleSubmit (e) {
    console.log('checkLogin');
    e.preventDefault()
    const { email, password } = e.target.elements
    if (typeof email.value !== 'string' || typeof password.value !== 'string' || email.value === '' || password.value === '') {
      return false
    }
    console.log({ email: email.value, password: password.value })

    if (this.state.page === 'login') {
      Roggl.lookCredentials({ email: email.value, password: password.value }).then(response => {
        console.log(response);
        if (response.ok === 0) {
          console.log('Geçersiz giriş bilgisi');
          this.setState({ message: 'Incorrect e-mail address or password.' });
        } else {
          // change local storage and state
          localStorage.setItem('user', JSON.stringify({ 'isLogin': true, 'user_id': response }));
          this.setState({ page: 'home' });

          // Load boards and pages
          this.getBoards()
        }
      })
    }

    if (this.state.page === 'register') {
      console.log('lets register');
      Roggl.userRegister({ email: email.value, password: password.value }).then(response => {
        console.log(response);
        if (response.ok === 0) {
          console.log('This e-mail address is not available.');
          this.setState({ message: 'This e-mail address is not available.' });
        } else {
          // change local storage and state
          console.log('response user_id' + response);
          localStorage.setItem('user', JSON.stringify({ 'isLogin': true, 'user_id': response }));
          this.setState({ page: 'home' });

          // Create first page
          this.addMenu()

        }
      })
    }

  }

  handleRegister () {
    console.log('handle register');
    let page = this.state.page
    if (page === 'login') {
      this.setState({ page: 'register', message: '' });
    } else {
      this.setState({ page: 'login', message: '' });
    }
  }

  onStudy () {
    console.log('on study state');
    this.setState({ page: 'study' })
  }

  pageStudy () {
    console.log('page study');

    return <h1>Hello</h1>
  }

  render () {
    console.log('router called');
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      var isLogin = user.isLogin
    } else {
      var isLogin = false
    }

    let component
    let page = this.state.page
    if (page === 'home') {
      component = this.pageHome()
    } else if (page === 'study') {
      component = this.pageStudy()
    } else {
      component = this.pageSession()
    }

    return (
      <div className="App">
        {component}
      </div>
    );
  }
}