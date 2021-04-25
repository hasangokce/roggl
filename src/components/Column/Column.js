import React from 'react';
import PropTypes from 'prop-types'
import './Column.css';
import more from '../../assets/more.svg';

export class Column extends React.Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    // const {
    //   id,
    //   column: { title, content},
    //   onHandleTitleChange,
    //   onHandleContentChange,
    //   onHandleDeletePage
    // } = this.props

    const {
      id,
      title,
      content,
      onHandleTitleChange,
      onHandleContentChange,
      onHandleDeletePage
    } = this.props

    return (
      <div className="column">
        <div className="columnHeader">
          <div className="columnTitle"
            id={id}
            onInput={onHandleTitleChange}
            suppressContentEditableWarning
            contentEditable
            data-ph="Untitled"
            spellCheck={false}>{title}</div>
          <div className="headerMore" my-key={id} onClick={onHandleDeletePage}>
            <img src={more} className="svgImg" alt="more button" />
          </div>
        </div>
        <div className="columnContent"
          id={id}
          onInput={onHandleContentChange}
          suppressContentEditableWarning
          contentEditable
          spellCheck={false}
          data-ph="Type something"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    )
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onHandleTitleChange: PropTypes.func.isRequired,
  onHandleContentChange: PropTypes.func.isRequired,
  onHandleDeletePage: PropTypes.func.isRequired
}