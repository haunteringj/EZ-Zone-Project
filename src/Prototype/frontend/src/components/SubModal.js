import React, { Component } from 'react'
import ReactDom from 'react-dom'
import "./SubModal.css";
import { auth, fstore } from '../firebase'

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

var uid;
auth.onAuthStateChanged(user => {
    uid = user.uid
}
)

class SubModal extends Component {
    constructor() {
        super()
        this.state = {
            subs: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(user => {
            uid = user.uid
            const userInfo = fstore.collection('users').doc(uid)
            userInfo.get().then((doc) => {
                const docData = doc.data()
                if (docData) {
                    this.setState({
                        subs: docData.subscriptions,

                    })
                }
            })
        }
        )

    }

    handleClick(e) {
        console.log(e)
        var subscriptions = this.state.subs
        if (subscriptions[e] === 1) {
            subscriptions[e] = 0
        } else {
            subscriptions[e] = 1
        }

        this.setState({
            subs: subscriptions
        })
    }

    handleSave() {
        fstore.collection('users').doc(uid).update({ subscriptions: this.state.subs })
        return (this.props.onClose)
    }

    render() {
        if (!this.props.open) return null
        return ReactDom.createPortal(
            <div className="encompass-modal">
                <div style={Overlay}></div>
                <div className="modal-div" style={Modal_Styles}>
                    <div className="sub-options">
                        <div className="layer">
                            <img className="sub-icon" src="/images/netflixicon.png" onClick={() => this.handleClick(0)} />
                            {this.state.subs[0] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/stanicon.png" onClick={() => this.handleClick(1)} />
                            {this.state.subs[1] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/primeicon.png" onClick={() => this.handleClick(2)} />
                            {this.state.subs[2] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                    </div>
                    <div className="sub-options">
                        <div className="layer">
                            <img className="sub-icon" src="/images/disneyicon.png" onClick={() => this.handleClick(3)} />
                            {this.state.subs[3] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/quickflixicon.png" onClick={() => this.handleClick(4)} />
                            {this.state.subs[4] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/foxtelicon.png" onClick={() => this.handleClick(5)} />
                            {this.state.subs[5] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                    </div>
                    <div className="sub-options">
                        <div className="layer">
                            <img className="sub-icon" src="/images/googleicon.png" onClick={() => this.handleClick(6)} />
                            {this.state.subs[6] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/bingeicon.png" onClick={() => this.handleClick(7)} />
                            {this.state.subs[7] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                        <div className="layer">
                            <img className="sub-icon" src="/images/youtubeicon.png" onClick={() => this.handleClick(8)} />
                            {this.state.subs[8] ? <img className="tick-icon" src="/images/check.png" /> : null}
                        </div>
                    </div>
                    <button onClick={this.handleSave()} className="close-button">Save Changes</button>
                </div>
            </div >,
            document.getElementById('portal')
        )
    }
}

export default SubModal