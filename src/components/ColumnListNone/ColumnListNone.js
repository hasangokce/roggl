import React from 'react'
import './ColumnListNone.css';
import hey from '../../EmptyBoard.png';



export default class ColumnListNone extends React.Component {
  render () {
    return (
      <div className="ColumnListNone">

        <div>
          <p><img src={hey} height="200" alt="empty state" /></p>
          <h2>You have no pages yet</h2>
          <p onClick={this.props.onAddNewPage}>Add One</p>
        </div>
      </div>
    );
  }
}