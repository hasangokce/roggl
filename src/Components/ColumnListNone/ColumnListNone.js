import React from 'react'
import './ColumnListNone.css';
import { ReactComponent as Logo } from '../../logo.svg';
import hey from '../../EmptyBoard.png';



export default class ColumnListNone extends React.Component {
  render () {
    return (
      <div className="ColumnListNone">

        <div>
          <p><img src={hey} height="200" /></p>
          <h2>You have no pages yet</h2>
          <p>Add One</p>
        </div>
      </div>
    );
  }
}