import React from 'react'
import { ColumnListNone } from '../components/ColumnListNone/ColumnListNone'

export class ColumnListNoneContainer extends React.Component {
  render () {
    return (
      <ColumnListNone
        onAddNewPage={this.props.onAddNewPage}
      />
    );
  }
}