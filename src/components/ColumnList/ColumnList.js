import React from 'react'
import PropTypes from 'prop-types'
import './ColumnList.css';
import { ColumnContainer } from '../../containers/ColumnContainer'

export class ColumnList extends React.Component {
  render () {
    const colons = this.props.colons
    const onHandleContentChange = this.props.onHandleContentChange
    const onHandleTitleChange = this.props.onHandleTitleChange
    const onHandleDeletePage = this.props.onHandleDeletePage
    const onAddNewPage = this.props.onAddNewPage

    return (
      <div className="column_list">
        {colons.map(column => {
          return (
            <ColumnContainer
              column={column}
              key={column._id}
              id={column._id}
              onHandleContentChange={onHandleContentChange}
              onHandleTitleChange={onHandleTitleChange}
              onHandleDeletePage={onHandleDeletePage} />
          )
        })}
        <div className="btnAddPage" onClick={onAddNewPage}> + Add another page</div>
      </div>
    );
  }
}

ColumnList.propTypes = {
  colons: PropTypes.array.isRequired,
  onHandleContentChange: PropTypes.func.isRequired,
  onHandleTitleChange: PropTypes.func.isRequired,
  onHandleDeletePage: PropTypes.func.isRequired,
  onAddNewPage: PropTypes.func.isRequired,
}