import React from 'react';
import './Session.css';

export default class Session extends React.Component {

    pageLogin () {
        return (
            <div className="Session">
                <div className="box">
                    <h2>My Account</h2>
                    <form onSubmit={this.props.handleSubmit}>
                    <input type="email" id="email" placeholder="Mail"></input>
                    <input type="password" id="password" placeholder="Password"></input>
                    <input type="submit" onClick={ this.props.onCheckLogin}value="Login" />

                    </form>
                    <div style={{ textAlign: 'center' }}>
                    <p style={{color: 'red'}}>{ this.props.message }</p>
                        <p>
                            <div><strong>Don't have an account?</strong></div>
                            <div className="redirectButton" onClick={this.props.handleRegister}>Create an account</div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    pageRegister () {
        return (
            <div className="Session">
                <div className="box">
                    <h2>Create a new account</h2>
                    <form onSubmit={this.props.handleSubmit}>
                    <input type="email" id="email" placeholder="Mail"></input>
                    <input type="password" id="password" placeholder="Password"></input>
                    <input type="submit" onClick={ this.props.onCheckLogin}value="Register" />

                    </form>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{color: 'red'}}>{ this.props.message }</p>
                        <p>
                            <div><strong>Do already have an account?</strong></div>
                            <div className="redirectButton" onClick={this.props.handleRegister}>Turn to login page</div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    
    render () {
        var page = this.props.page
        if (page === 'login') {
           return this.pageLogin()
        } else {
            return this.pageRegister()
        }
    }
}