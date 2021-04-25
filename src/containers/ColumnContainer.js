import React from 'react';
import { Column } from '../components/Column/Column'

export class ColumnContainer extends React.Component {
    // handleRemove (e) {
    //     console.log(e)
    //     console.log(e.currentTarget.getAttribute('my-key'));
    //     console.log('remove()')
    // }
    render () {
        return <Column
            id={this.props.id}
            title={this.props.column.title}
            content={this.props.column.content}
            onHandleTitleChange={this.props.onHandleTitleChange}
            onHandleContentChange={this.props.onHandleContentChange}
            onHandleDeletePage={this.props.onHandleDeletePage}
        />
    }
}