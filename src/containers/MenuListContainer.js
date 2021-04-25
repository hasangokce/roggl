import React from 'react'
import { MenuList } from '../components/MenuList/MenuList'

export class MenuListContainer extends React.Component {
    render () {
        const activeStyle = {
            backgroundColor: 'rgba(25, 25, 25, 0.3)',
        };

        return (
            <MenuList
                activeStyle={activeStyle}
                menus={this.props.menus}
                _id={this.props._id}
                active_item={this.props.active_item}
                onHandleChange={this.props.onHandleChange}
                onHandleMenuClick={this.props.onHandleMenuClick}
                onAddMenu={this.props.onAddMenu}
                onRemoveMenu={this.props.onRemoveMenu}
                onStudy={this.props.onStudy}
            />
        );
    }
}