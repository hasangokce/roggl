import React from 'react';
import { Session } from '../components/Session/Session'

export class SessionContainer extends React.Component {
    render () {
        const { handleSubmit, onCheckLogin, message, handleRegister, page } = this.props

        return (
            <Session
                handleSubmit={handleSubmit}
                onCheckLogin={onCheckLogin}
                message={message}
                handleRegister={handleRegister}
                page={page}
            />
        )
    }
}