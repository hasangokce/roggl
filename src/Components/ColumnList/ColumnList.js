import React from 'react'
import './ColumnList.css';
import Column from '../Column/Column'

export default class App extends React.Component {
  render() {
    return (
      <div className="column_list">
        <Column></Column>
        <Column></Column>
        <Column></Column>
      </div>
    );
  }
}