import React from 'react'
import { ColumnList } from '../components/ColumnList/ColumnList'

export class ColumnListContainer extends React.Component {
    render () {
        const colons = this.props.columns
        const onHandleContentChange = this.props.onHandleContentChange
        const onHandleTitleChange = this.props.onHandleTitleChange
        const onHandleDeletePage = this.props.onHandleDeletePage
        const onAddNewPage = this.props.onAddNewPage

        return (
            <ColumnList
                colons={colons}
                onHandleContentChange={onHandleContentChange}
                onHandleTitleChange={onHandleTitleChange}
                onHandleDeletePage={onHandleDeletePage}
                onAddNewPage={onAddNewPage}
            />
        )
    }
}