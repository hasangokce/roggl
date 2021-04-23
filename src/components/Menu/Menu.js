import React from 'react'
import './Menu.css';

export class Menu extends React.Component {

  render () {
    return (
      <div className="Menu" onClick={this.props.onHandleMenuClick} style={this.props.style}>
        <a href={"#" + this.props.menu._id} placeholder="aa">{this.props.menu.name}</a>
      </div>
    );
  }

}