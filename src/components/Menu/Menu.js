import React from 'react'
import PropTypes from 'prop-types'
import './Menu.css';

export class Menu extends React.Component {
  render () {
    const id = this.props._id
    const onHandleMenuClick = this.props.onHandleMenuClick

    return (
      <div className="Menu" onClick={onHandleMenuClick} style={this.props.style}>
        <a href={"#" + id} placeholder="aa">{this.props.menu.name}</a>
      </div>
    );
  }
}

Menu.propTypes = {
  id: PropTypes.string,
  onHandleMenuClick: PropTypes.func.isRequired
}