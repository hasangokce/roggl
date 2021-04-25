import React from 'react'
import PropTypes from 'prop-types'
import './ColumnListNone.css';
import hey from '../../assets/EmptyBoard.png';

export class ColumnListNone extends React.Component {
  render () {
    const onAddNewPage = this.props.onAddNewPage

    return (
      <div className="ColumnListNone">
        <div>
          <p><img src={hey} height="200" alt="empty state" /></p>
          <h2>You have no pages yet</h2>
          <p onClick={onAddNewPage}>Add One</p>
        </div>
      </div>
    );
  }
}

ColumnListNone.propTypes = {
  onAddNewPage: PropTypes.func.isRequired,
}