import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        let loggedIn = false
        this.state = {
            username: '',
            password: '',
            loggedIn
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault()
        const { username, password } = this.state

        if (username === "atom" && password === "1150") {
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/home"/>
        }
        return (
            <div className="wrapper">
                <br/><br/><br/><br/><br/><br/>
                <div className="form-wrapper">
                    <h1>Login</h1>
                    <form onSubmit={this.submitForm}>
                    <div className="firstName">
                    <label htmlFor="firstName">username</label>
                        <input type="text" placeholder="username" name="username" autoFocus required value={this.state.username} onChange={this.onChange} />
                    </div>
                        
                    <div className="firstName">
                    <label htmlFor="firstName">password</label>
                        <input type="password" placeholder="password" name="password" required value={this.state.password} onChange={this.onChange} />
                    </div>
                        <br />
                    <div className="firstName">
                        <input type="submit" />
                        <br />
                    </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login;