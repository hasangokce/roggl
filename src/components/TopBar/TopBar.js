import React from 'react'
import PropTypes from 'prop-types'
import './TopBar.css';

export class TopBar extends React.Component {
  render () {
    const name = this.props.name
    const onHandleChange = this.props.onHandleChange

    return (
      <div className="TopBar">
        <div className="content">
          <div>
            <input
              className="notranslate"
              value={name}
              onChange={onHandleChange}
              placeholder="Untitled"></input>
          </div>
          <div className="blank">
            <div className="notion-topbar-more-button" role="button" >
              <svg
                viewBox="0 0 13 3" className="dots">
                <g>
                  <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
                  <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
                  <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  name: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired
}