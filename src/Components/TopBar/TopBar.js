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

  render() {
    return (
      <div class="topbar">
        <div class="content">
          <span class="notranslate">Learning Guitar with caution. I say dacce or me dace for me</span>
          <div style={{
            display: 'flex',
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'stretch'
          }}>

            <div onClick="this.handleToggle()" class="notion-topbar-more-button" role="button" tabindex="0" style=""><svg
              viewBox="0 0 13 3" class="dots"
              style="width: 18px; height: 18px; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;">
              <g>
                <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
                <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
                <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
              </g>
            </svg></div>
          </div>
        </div>
      </  }
}

