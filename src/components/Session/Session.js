import React from 'react';
import PropTypes from 'prop-types'
import './Session.css';

export class Session extends React.Component {
    pageLogin (handleSubmit, onCheckLogin, message, handleRegister) {
        return (
            <div className="Session">
                <div className="box">
                    <h2>My Account</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" id="email" placeholder="Mail"></input>
                        <input type="password" id="password" placeholder="Password"></input>
                        <input type="submit" onClick={onCheckLogin} value="Login" />
                    </form>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'red' }}>{message}</p>
                        <div>
                            <div><strong>Don't have an account?</strong></div>
                            <div className="redirectButton" onClick={handleRegister}>Create an account</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    pageRegister (handleSubmit, onCheckLogin, message, handleRegister) {
        return (
            <div className="Session">
                <div className="box">
                    <h2>Create a new account</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" id="email" placeholder="Mail"></input>
                        <input type="password" id="password" placeholder="Password"></input>
                        <input type="submit" onClick={onCheckLogin} value="Register" />
                    </form>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'red' }}>{message}</p>
                        <div>
                            <div><strong>Do already have an account?</strong></div>
                            <div className="redirectButton" onClick={handleRegister}>Turn to login page</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render () {
        const { handleSubmit, onCheckLogin, message, handleRegister } = this.props

        let page
        const pageTitle = this.props.page
        console.log(pageTitle)
        if (pageTitle === 'login') {
            page = this.pageLogin(handleSubmit, onCheckLogin, message, handleRegister)
        } else {
            page = this.pageRegister(handleSubmit, onCheckLogin, message, handleRegister)
        }
        return page
    }
}

Session.propTypes = {
    message: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    onCheckLogin: PropTypes.func,
    handleRegister: PropTypes.func.isRequired,
}