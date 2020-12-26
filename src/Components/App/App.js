import React from 'react'
import './App.css';
import SideNav from '../SideNav/SideNav'
import ColumnList from '../ColumnList/ColumnList'


export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="main">
          <SideNav></SideNav>

          <ColumnList></ColumnList>
        </div>
      </div>
    );
  }
}