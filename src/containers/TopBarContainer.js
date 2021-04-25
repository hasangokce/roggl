import React from 'react'
import { TopBar } from '../components/TopBar/TopBar'

export class TopBarContainer extends React.Component {

    handleToggle () {
        var editable_elements = document.querySelectorAll("[contenteditable=true]");
        for (var i = 0; i < editable_elements.length; i++)
            editable_elements[i].setAttribute("contenteditable", false);
        alert("Content editable locked!")
    }

    handleDoubleClick (e) {
        console.log('called')
        e.target.disabled = false;
        // alert('Double clicked!' + e.target.classList.add('click-state'))
    }

    render () {
        const name = this.props.active_item.name
        const onHandleChange = this.props.onHandleChange

        return (
            <TopBar
                name={name}
                onHandleChange={onHandleChange}
            />
        )
    }
}

