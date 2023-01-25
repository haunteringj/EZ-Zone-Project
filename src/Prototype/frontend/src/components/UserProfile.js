import React, { Component } from "react";
import "../App.css";
import LoadingBar from "./LoadingBar";
import { auth, fstore } from '../firebase'
import "./UserProfile.css";
import SubModal from "./SubModal";
import CountriesList from "./CountriesList";
import Subscription from "./Subscription";
import WatchedContent from "./WatchedContent";
import ShowPlaylist from "./ShowPlaylist";

var uid;
auth.onAuthStateChanged(user => {
    uid = user.uid
}
)



class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            handle: "",
            email: "",
            region: "",
            subs: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            likedMovie: [],
            watchedMovie: [],
            watchedTV: [],
            likedTV: [],
            loading: false,
            subModal: false,
            playlistModal: false,
            playlistAlbums: []
        }
        this.handleUnameEdit = this.handleUnameEdit.bind(this)
        this.handleSubEdit = this.handleSubEdit.bind(this)
        this.subModalHandle = this.subModalHandle.bind(this)
        this.reloadSubs = this.reloadSubs.bind(this)
        this.showPlaylistHandle = this.showPlaylistHandle.bind(this);
        this.playlistHandle = this.playlistHandle.bind(this)
        this.handlePlaylistClick = this.handlePlaylistClick.bind(this)
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(user => {
            uid = user.uid
            const userInfo = fstore.collection('users').doc(uid)
            const watchedMovie = fstore.collection('watchedMovie').doc(uid)
            const likedMovie = fstore.collection('likedMovie').doc(uid)
            const likedTV = fstore.collection('likedTV').doc(uid)
            const watchedTV = fstore.collection('watchedTV').doc(uid)
            const playlists = fstore.collection('playlist').doc(uid)
            userInfo.get().then((doc) => {
                const docData = doc.data()
                if (docData) {
                    this.setState({
                        handle: docData.username,
                        email: docData.email,
                        region: docData.region,
                        subs: docData.subscriptions,
                    })
                }
            }).then(() => {
                watchedMovie.get().then((doc) => {
                    const docData = doc.data()
                    var movArr = []
                    for (var key in docData) {
                        movArr.push({
                            id: key,
                            poster: docData[key].poster,
                            content_name: docData[key].poster.title,
                            content_type: "movie"
                        });
                    }
                    this.setState({
                        watchedMovie: movArr,
                    })
                })
            }).then(() => {
                likedMovie.get().then((doc) => {
                    const docData = doc.data()
                    var movArr = []
                    for (var key in docData) {
                        movArr.push({
                            id: key,
                            poster: docData[key].poster,
                            content_name: docData[key].poster.title,
                            content_type: "movie"
                        });
                    }
                    this.setState({
                        likedMovie: movArr,
                    })
                })
            }).then(() => {
                likedTV.get().then((doc) => {
                    const docData = doc.data()
                    var tvArr = []
                    for (var key in docData) {
                        tvArr.push({
                            id: key,
                            poster: docData[key].poster,
                            content_name: docData[key].poster.title,
                            content_type: "tvshow"
                        });
                    }
                    this.setState({
                        likedTV: tvArr,
                    })
                })
            }).then(() => {
                watchedTV.get().then((doc) => {
                    const docData = doc.data()
                    var tvArr = []
                    for (var key in docData) {
                        tvArr.push({
                            id: key,
                            poster: docData[key].poster,
                            content_name: docData[key].poster.title,
                            content_type: "tvshow"
                        });
                    }
                    this.setState({
                        watchedTV: tvArr
                    })
                })
            }).then(() => {
                playlists.get().then((doc) => {
                    const docData = doc.data()
                    var playlistArr = []
                    for (var key in docData) {
                        var albums = []
                        for (var album in docData[key]) {
                            albums.push({
                                id: album,
                                title: docData[key][album].title,
                                poster_url: docData[key][album].poster_url,
                                artist: docData[key][album].artist
                            })
                        }
                        playlistArr.push({
                            title: key,
                            playlist_albums: albums,
                        });
                    }
                    this.setState({
                        playlist: playlistArr,
                        loading: true
                    })
                })
            })
        }
        )

    }

    handleSubEdit() {
        this.subModalHandle()
    }

    subModalHandle() {
        this.setState({
            subModal: !this.state.subModal
        })
    }

    playlistHandle(props) {

        return (
            <div className="list_box">
                <div className="feature_name" onClick={() => this.handlePlaylistClick(props)}>{props.title} </div>
            </div >
        )
    }

    reloadSubs() {
        if (this.state.subModal === false) {
            return
        } else {
            auth.onAuthStateChanged(user => {
                uid = user.uid
                const userInfo = fstore.collection('users').doc(uid)
                userInfo.get().then((doc) => {
                    const docData = doc.data()
                    if (docData) {
                        this.setState({
                            subs: docData.subscriptions
                        })
                    }
                })
            }
            )
        }
    }

    handleUnameEdit() {

    }

    handlePlaylistClick(props) {
        this.setState({
            playlistAlbums: props.playlist_albums
        })
        this.showPlaylistHandle()
    }

    showPlaylistHandle() {

        this.setState({
            playlistModal: !this.state.playlistModal
        })
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className="loader">
                    <LoadingBar />
                </div>
            )
        } else {
            return (

                <div className="hero-container" >
                    <SubModal open={this.state.subModal} onClose={() => {
                        this.reloadSubs()
                        this.subModalHandle()
                    }
                    } />
                    <ShowPlaylist playlistAlbums={this.state.playlistAlbums} open={this.state.playlistModal} onClose={() => {
                        this.showPlaylistHandle()
                    }
                    } />
                    <div className="user_details">

                        <div className="parent">
                            <img className="profile_pic" src="/images/default_pfp.jpg" />
                            <img className="inner" src="/images/editpencil.png" />
                        </div>

                        <div className="user_details_field">
                            <div className="detail_title"> User Handle:</div>
                            <div className="user_details_data">
                                <p>{this.state.handle}</p>
                                <img className="edit_button" src="/images/editpencil.png" onClick={this.handleUnameEdit} />
                            </div>
                        </div>

                        <div className="user_details_field">
                            <div className="detail_title"> Email:</div>
                            <div className="user_details_data">
                                <p>{this.state.email}</p>
                                <img className="edit_button" src="/images/editpencil.png" />
                            </div>
                        </div>

                        <div className="user_details_field">
                            <div className="detail_title"> Region:</div>
                            <div className="user_details_data">
                                <CountriesList region={this.state.region} />
                                <img className="edit_button" src="/images/check.png" />
                            </div>
                        </div>

                        <div className="user_details_field">
                            <div className="change_password">Change Password</div>
                        </div>

                    </div>

                    <div className="content">
                        <div className="top">
                            <div className="title">
                                <h1>User Control Panel</h1>
                            </div>
                        </div>

                        <div className="title"><h1>Saved Playlists</h1></div>

                        <div className="scroll_box">
                            <div onClick={this.showPlaylistHandle}>
                                {this.state.playlist.map(item => this.playlistHandle(item))}
                            </div>
                        </div>


                        <div className="history_subscription_wrapper">
                            <div className="scroll_box">
                                <h1>Subscriptions <img className="edit_button" src="/images/editpencil.png" onClick={this.handleSubEdit} /></h1>
                                <div className="sub-images">
                                    {this.state.subs.map((value, index) => <Subscription service_index={index} subscribed={value} />)}
                                </div>
                            </div>
                        </div>
                        <div className="history_subscription_wrapper">
                            <div className="scroll_box">
                                <h1>Watched</h1>
                                {this.state.watchedMovie.map(item => <WatchedContent content_name={item.content_name} content_id={item.id} content_poster_url={item.poster} content_type={item.content_type} />)}
                                {this.state.watchedTV.map(item => <WatchedContent content_name={item.content_name} content_id={item.id} content_poster_url={item.poster} content_type={item.content_type} />)}
                            </div>

                            <div className="scroll_box">
                                <h1>Liked Shows</h1>
                                {this.state.likedMovie.map(item => <WatchedContent content_name={item.content_name} content_id={item.id} content_poster_url={item.poster} content_type={item.content_type} />)}
                                {this.state.likedTV.map(item => <WatchedContent content_name={item.content_name} content_id={item.id} content_poster_url={item.poster} content_type={item.content_type} />)}
                            </div>
                        </div>
                    </div>
                </div >

            );
        }
    }
}

export default UserProfile;
