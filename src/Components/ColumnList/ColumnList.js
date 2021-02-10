import React from 'react'
import './ColumnList.css';
import Column from '../Column/Column'



export default class App extends React.Component {
  render() {
    return (
      <div className="column_list">
        {this.props.columns.map(column => {
         return <Column column={column} key={column._id} id={column._id} onHandleContentChange={this.props.onHandleContentChange}></Column>
       })} 
        
      </div>
    );
  }
}