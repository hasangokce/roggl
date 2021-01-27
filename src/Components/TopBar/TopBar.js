import React from 'react'
import './TopBar.css';

export default class TopBar extends React.Component {

  handleToggle() {
    var editable_elements = document.querySelectorAll("[contenteditable=true]");
    for (var i = 0; i < editable_elements.length; i++)
      editable_elements[i].setAttribute("contenteditable", false);
    alert("Content editable locked!")
  }

  handleDoubleClick(e) {
    console.log('called')
    e.target.disabled = false;
    // alert('Double clicked!' + e.target.classList.add('click-state'))
  }

  render() {
    return (
      <div className="TopBar">
        <div className="content">
          <div>
            <input className="notranslate" value={this.props.active_menu.name} onChange={this.props.onChange}></input>
            <span onClick={this.handleToggle}> _lock</span>
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

