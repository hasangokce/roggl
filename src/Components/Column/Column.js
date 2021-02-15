import React from 'react';
import './Column.css';
import more from '../../more.svg';

class Column extends React.Component {
  handleRemove (e) {
    console.log(e)
    console.log(e.currentTarget.getAttribute('my-key') );
    console.log('remove()')
  }
  handleContentChange (e) {
    console.log("inner content change");
  }
  componentDidMount () {
    console.log("Column -> componentDidMount");
  }
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }
  render () {
    return (
      <div className="column">
        <div className="columnHeader">
            <div className="columnTitle"
              id={this.props.id}
              onInput={this.props.onHandleTitleChange}
              suppressContentEditableWarning
              contentEditable
              data-ph="Untitled"
              spellCheck={false}>{this.props.column.title}</div>
          <div className="headerMore" my-key={this.props.id} onClick={this.props.onHandleDeletePage}><img src={more} className="svgImg" alt="more button"></img></div>
        </div>
        <div className="columnContent"
          id={this.props.id}
          onInput={this.props.onHandleContentChange}
          suppressContentEditableWarning
          contentEditable
          spellCheck={false}
          data-ph="Type something"
          dangerouslySetInnerHTML={{ __html: this.props.column.content }}
        ></div>
      </div>
    )
  }
}
export default Column;
// {this.props.column.content}