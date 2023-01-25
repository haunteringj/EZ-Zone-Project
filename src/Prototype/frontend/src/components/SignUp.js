
import React, { Component } from "react";
import "../App.css";
import { Button } from "./Button";
import "./SignUp.css";
import { Redirect } from "react-router-dom";
import { auth, fstore } from '../firebase'


class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            success: false,
            email: "",
            pwd: "",
            region: "Australia",
            username: "",
            subscriptions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            failedemail: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(this.state.email, this.state.pwd)
            .then((u) => {
                const uid = u.user.uid
                fstore.collection('users').doc(uid).set({
                    email: this.state.email,
                    username: this.state.username,
                    region: this.state.region,
                    subscriptions: this.state.subscriptions,
                    avatar: "../../public/images/default_pfp.jpg"
                })
                this.setState({
                    success: true
                })
            })
            .catch((err) => {
                console.log(err.code)
                if (err.code == "auth/email-already-in-use") {
                    this.setState({
                        failedemail: true
                    })
                } else {
                    this.setState({
                        failedemail: true
                    })
                }
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
                    <div className="centerbtn2"></div>


                    <div className="centerbtn2"></div>

                    <div className="loginfields">

                        <form className="LoginForm" onSubmit={this.handleSubmit}>
                            <h1>Sign Up</h1>
                            {this.state.failedemail
                                ? <div className="failed-email">Email invalid or already in use</div>
                                : <div></div>
                            }
                            <label for="username">Username:</label>
                            <input className="LoginBoxes" placeholder="Username..." name="username" onChange={this.handleChange} required></input>

                            <label for="email">Email Address:</label>
                            <input className="LoginBoxes" placeholder="Your Email Address.." name="email" onChange={this.handleChange} required></input>

                            <label for="password">Password:</label>
                            <input className="LoginBoxes" placeholder="Your Password.." name="pwd" type="password" minLength="6" onChange={this.handleChange} required></input>
                            <label for="password">Region: </label>
                            <select className="LoginBoxes" id="country" name="region" onChange={this.handleChange}>
                                <option value="Australia">Australia</option>
                                <option value="Canada">Canada</option>
                                <option value="USA">USA</option>
                            </select>

                            <input type="submit" value="Sign Up"></input>

                        </form>

                    </div>

                    <div className="centerbtn">
                    </div>
                    <div className="centerbtn2"></div>

                </div>
            )
        }
    }
}

export default SignUp;
