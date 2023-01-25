import "./LoadingBar.css";
import React, { Component } from "react";

class LoadingBar extends Component {
    constructor() {
        super()
        this.state = {
            search: "",
            type: ""
        }
    }
    render() {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default LoadingBar