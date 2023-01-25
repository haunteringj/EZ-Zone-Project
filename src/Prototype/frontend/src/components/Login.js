import React, { Component } from "react";
import "../App.css";
import { Button } from "./Button";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { auth } from '../firebase'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            email: "",
            pwd: "",
            failed: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        auth.signInWithEmailAndPassword(this.state.email, this.state.pwd)
            .then((u) => {
                console.log(u)
                this.setState({
                    success: true
                })
            }).catch((err) => {
                console.log(err)
                this.setState({
                    failed: true
                })
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (this.state.success) {
            return (<Redirect to={{
                pathname: '/dashboard',
            }} />)
        } else {
            return (
                <div className="login-container" >
                    <div className="LoginForm">
                        <h1>Login</h1>
                        {this.state.failed
                            ? <div className="failed-login">Invalid username or password</div>
                            : <div></div>
                        }
                        <form onSubmit={this.handleSubmit}>
                            <label for="email">Email Address:</label>
                            <input className="LoginBoxes" placeholder="Your Email Address.." name="email" onChange={this.handleChange}></input>

                            <label for="password">Password:</label>
                            <input className="LoginBoxes" placeholder="Your Password.." name="pwd" type="password" onChange={this.handleChange}></input>

                            <input type="submit" value="Login"></input>
                        </form>


                        <div className="center_div">
                            Don't have an account? Sign Up!
                        </div>
                        <div className="btn_div">
                            <Link to="/signup">
                                <input type="button" class="button" value="Sign Up"></input>
                            </Link>
                        </div>
                    </div>

                </div >

            )
        }
    }
}

export default Login;
