import React, { Component } from 'react'
import "./Playlist.css"
import { auth, fstore } from "../firebase"

var uid;
auth.onAuthStateChanged(user => {
    uid = user.uid
}
)

class Playlist extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const data = {
            [this.props.playlistName]: {
                [this.props.id]: {
                    artist: this.props.artist,
                    poster_url: this.props.poster_url,
                    title: this.props.title
                }
            }
        }
        fstore.collection('playlist').doc(uid).set(data, { merge: true })
    }

    render() {
        return (
            <div className="playlist-encompass" onClick={this.handleClick}>
                {this.props.playlistName}
            </div>
        )
    }
}

export default Playlist