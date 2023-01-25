import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import "./ListenSpecific.css";
import { auth, fstore } from "../firebase";
import firebase from "firebase/app";
import { FixedSizeList } from "react-window";
import TrackMaker from "./TrackMaker";
import LoadingBar from "./LoadingBar";
import PlaylistModal from "./PlaylistModal";

var uid;
auth.onAuthStateChanged((user) => {
    uid = user.uid;
});
class ListenSpecific extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            like: false,
            heard: false,
            playModal: false,
            movieId: window.location.href.replace(/.*\//, ""),
        };

        this.likehandle = this.likehandle.bind(this);
        this.listenhandle = this.listenhandle.bind(this);
        this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
        this.playlistModalHandle = this.playlistModalHandle.bind(this);
    }

    likehandle() {
        this.setState(
            {
                like: !this.state.like,
            },
            () => {
                if (this.state.like) {
                    const data = {
                        [this.state.movieId]: {
                            likedAt: new Date().getTime(),
                            title: this.state.title,
                            poster: this.state.poster,
                        },
                    };
                    fstore.collection("likedAlbum").doc(uid).set(data, { merge: true });
                } else {
                    fstore
                        .collection("likedAlbum")
                        .doc(uid)
                        .update({
                            [this.state.movieId]: firebase.firestore.FieldValue.delete(),
                        });
                }

            }
        );
    }

    listenhandle() {
        this.setState(
            {
                heard: !this.state.heard,
            },
            () => {
                if (this.state.heard) {
                    const data = {
                        [this.state.movieId]: {
                            likedAt: new Date().getTime(),
                            title: this.state.title,
                            poster: this.state.poster,
                        },
                    };
                    fstore.collection("watchedAlbum").doc(uid).set(data, { merge: true });
                } else {
                    fstore
                        .collection("watchedAlbum")
                        .doc(uid)
                        .update({
                            [this.state.movieId]: firebase.firestore.FieldValue.delete(),
                        });
                }

            }
        );
    }
    componentDidMount() {
        axios.get(window.location.href, {}).then((res) => {
            console.log(res.data.suggested_movies);
            this.setState(
                {
                    loading: false,
                    poster: res.data.poster_path,
                    tracks: res.data.tracks,
                    durations: res.data.durations,
                    artist: res.data.artist,
                    title: res.data.name,
                    trackLinks: res.data.trackLinks,
                    rating: res.data.rating,
                    plot: res.data.overview,
                    netflix: res.data.Netflix,
                    binge: res.data.BINGE,
                    disney: res.data.DisneyPlus,
                    foxtel: res.data.FoxtelNow,
                    prime: res.data.AmazonPrimeVideo,
                    quickflix: res.data.Quickflix,
                    stan: res.data.stan,
                    NoResults: res.data.NoResults,
                    type: res.data.type,
                    runtime: res.data.runtime,
                    episodes: res.data.episodes,
                    seasons: res.data.seasons,
                    release: res.data.year,
                },
                () => {
                    fstore
                        .collection("likedAlbum")
                        .doc(uid)
                        .get()
                        .then((doc) => {
                            if (doc.get(this.state.movieId) != null) {
                                this.setState({
                                    like: true,
                                });
                            } else {
                                this.setState({
                                    like: false,
                                });
                            }
                        });
                    fstore.collection("watchedAlbum").doc(uid).get().then((doc) => {
                        if (doc.get(this.state.movieId) != null) {
                            this.setState({
                                heard: true
                            })
                        } else {
                            this.setState({
                                heard: false,
                            });
                        }
                    })
                }
            );
        });
    }

    handlePlaylistClick() {
        console.log("oh bugger")
        this.playlistModalHandle()
    }

    playlistModalHandle() {
        this.setState({
            playModal: !this.state.playModal
        })

    }

    render() {
        if (this.state.loading)
            return (
                <div className="loader">
                    <LoadingBar />
                </div>
            )
        return (
            <div className="hero-container1">

                {this.state.loading === true ? (
                    <div className="loader">
                        <LoadingBar />
                    </div>
                ) : (
                    <>
                        <PlaylistModal artist={this.state.artist} poster_url={this.state.poster} title={this.state.title} id={this.state.movieId} open={this.state.playModal} onClose={() => {
                            this.playlistModalHandle()
                        }
                        } />
                        <img className="poster1" src={this.state.poster} />
                        <div className="content1">
                            <div className="top1">
                                <div className="title1">
                                    <h1>
                                        {this.state.title} ({this.state.release}) -{" "}
                                        {this.state.runtime}
                                    </h1>
                                </div>

                                <div className="ratings1">
                                    <h1>{this.state.artist}</h1>
                                </div>
                            </div>
                            <div className="subtitles1">
                                <h1 className="h1title">Tracks: </h1>
                                <div className="right">
                                    <h1>Like</h1>
                                    <div className="likeButton1" onClick={this.likehandle}>
                                        <i
                                            className={
                                                this.state.like ? "fas fa-heart" : "far fa-heart"
                                            }
                                        />
                                    </div>
                                    <h1>Heard</h1>
                                    <div className="watched1" onClick={this.listenhandle}>
                                        <i
                                            className={
                                                this.state.heard ? "fas fa-square" : "far fa-square"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="plot">
                                <TrackMaker
                                    tracks={this.state.tracks}
                                    durations={this.state.durations}
                                    trackLinks={this.state.trackLinks}
                                />

                                <button className="playlist-add" onClick={this.handlePlaylistClick}>Add to playlist</button>

                            </div>

                        </div>

                    </>
                )}
            </div>
        );
    }
}

export default ListenSpecific;
