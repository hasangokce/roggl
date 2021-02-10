import React from 'react';
import './Column.css';

class Column extends React.Component {
  handleTitleChange (e) {
    console.log('handleTitleChange()')
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
  render() {
    return (
      <div className="column">
        <h2
          id={this.props.id}
          onInput={this.handleTitleChange(this.props.column.title)}
          suppressContentEditableWarning
          contentEditable
          spellCheck={false}>{this.props.column.title}</h2>
        <div
          id={this.props.id}
          onInput={ this.props.onHandleContentChange}
          suppressContentEditableWarning
          contentEditable spellCheck={false}>{this.props.column.content}</div>
      </div>
    )
  }
}

export default Column;