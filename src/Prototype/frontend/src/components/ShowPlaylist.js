import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { auth, fstore } from "../firebase"
import "./ShowPlaylist.css"

var uid;
auth.onAuthStateChanged(user => {
    uid = user.uid
}
)

const Modal_Styles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '5px',
    zIndex: 1000
}

const Overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

class ShowPlaylist extends Component {
    constructor() {
        super()
        this.handleSave = this.handleSave.bind(this)
    }
    handleSave() {
        return (this.props.onClose)
    }


    render() {
        if (!this.props.open) return null
        return ReactDom.createPortal(
            <div className="modal-encompass">
                <div style={Overlay}></div>
                <div className="modal-div" style={Modal_Styles}>
                    <div className="playlist-cover" onClick={this.handleSave()}>
                        {this.props.playlistAlbums.map(item => <div className="album-titles"> <img src={item.poster_url} width="50px" height="50px" />{item.title} - {item.artist}</div>)}
                    </div>
                    <button onClick={this.handleSave()}>close</button>
                </div>
            </div>, document.getElementById('portal')
        )
    }
}

export default ShowPlaylist;