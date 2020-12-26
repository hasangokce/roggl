import React from 'react'
import './Menu.css';

export class Menu extends React.Component {

  render() {
    return (
      <div className="Menu">
        <a href={"#" + this.props.menu.id}>{this.props.menu.name}</a>
      </div>
    );
  }

}