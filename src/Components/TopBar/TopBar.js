import React from 'react'
import './TopBar.css';

export default class TopBar extends React.Component {
  /**
   * handles toggle operation
   */
  handleToggle() {
    const toggleEditable = () => {
      var editable_elements = document.querySelectorAll("[contenteditable=true]");
      for (var i = 0; i < editable_elements.length; i++)
        editable_elements[i].setAttribute("contenteditable", false);
      alert("Content editable locked!")
    }

    function addElement(parentId, elementTag, elementId, html) {
      // Adds an element to the document
      var p = document.getElementById(parentId);
      var newElement = document.createElement(elementTag);
      newElement.setAttribute('id', elementId);
      newElement.innerHTML = html;
      p.appendChild(newElement);
    }
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
            <input className="notranslate" disabled={true} value={this.props.active_menu.name}></input>
          </div>
          <div className="blank">
            <div onClick="this.handleToggle()" className="notion-topbar-more-button" role="button" tabindex="0">
              <svg
                viewBox="0 0 13 3" class="dots">
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

