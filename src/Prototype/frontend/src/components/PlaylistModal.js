import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { auth, fstore } from '../firebase'
import "./PlaylistModal.css"
import Playlist from "./Playlist"

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

class PlaylistModal extends Component {
    constructor() {
        super()
        this.state = {
            playlists: [],
            noPlaylist: false,
            newName: ""
        }
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleNewPlaylist = this.handleNewPlaylist.bind(this)
    }

    handleSave() {
        return (this.props.onClose)
    }

    handleNewPlaylist() {
        const data = {
            [this.state.newName]: {
                [this.props.id]: {
                    artist: this.props.artist,
                    poster_url: this.props.poster_url,
                    title: this.props.title
                }
            }
        }
        console.log(data)
        fstore.collection('playlist').doc(uid).set(data, { merge: true })

        this.props.onClose()
        window.location.reload()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            uid = user.uid
            const userInfo = fstore.collection('playlist').doc(uid)
            userInfo.get().then((doc) => {
                const docData = doc.data()
                var playlistArr = []
                if (docData) {
                    console.log(docData)
                    for (var key in docData) {
                        console.log(key)
                        playlistArr.push({
                            id: key
                        });
                    }
                    this.setState({
                        playlists: playlistArr,
                    })
                } else {
                    this.setState({
                        noPlaylist: true,
                    })
                }
            })
        }
        )
    }
    render() {
        if (!this.props.open) return null
        if (this.state.noPlaylist) return ReactDom.createPortal(
            <div className="modal-encompass">
                <div style={Overlay}></div>
                <div className="modal-div" style={Modal_Styles}>
                    <button className="noplaylist-button" onClick={this.handleSave()}>No playlists made yet (close)</button>
                    <div>
                        <input className="playlist_input" placeholder="Playlist Name" name="newName" onChange={this.handleChange}></input>
                        <button className="new-playlist" onClick={this.handleNewPlaylist}>New</button>
                    </div>
                </div>
            </div>, document.getElementById('portal')
        )
        return ReactDom.createPortal(
            <div className="modal-encompass">
                <div style={Overlay} onClick={this.handleSave()}></div>
                <div className="modal-div" style={Modal_Styles}>
                    <div className="playlist-cover" onClick={this.handleSave()}>
                        {this.state.playlists.map(item => <Playlist playlistName={item.id} artist={this.props.artist} id={this.props.id} title={this.props.title} poster_url={this.props.poster_url} />)}
                    </div>
                    <div>
                        <input className="playlist_input" placeholder="Playlist Name" name="newName" onChange={this.handleChange}></input>
                        <button className="new-playlist" onClick={this.handleNewPlaylist}>New</button>
                    </div>
                </div>
            </div>, document.getElementById('portal')
        )
    }
}

export default PlaylistModal
