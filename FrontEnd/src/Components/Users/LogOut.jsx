import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

class LogOut extends Component {
    constructor() {
        super()
        this.state = {
            loggedOut: false
        }
    }

    handleLogout = () => {
        axios
            .get('/users/logout')
            .then(res => {
                console.log("logout response", res)
                // this.props.logOutUser()
                this.setState({
                loggedOut: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { loggedOut } = this.state

        if (loggedOut) {
            // return <Redirect to='/users/login' />
            <div>you are logged out.</div>
        }
        return (
            <div>
                <p>Are you sure you want to log out?</p>
                <button onClick={this.handleLogout}>Yes, log out</button>
            </div>
        )
    }
}

export default LogOut; 
