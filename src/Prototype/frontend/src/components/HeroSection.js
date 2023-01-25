import React, { Component } from "react";
import "../App.css";
import axios from 'axios';
import { Button } from "./Button";
import "./HeroSection.css";
import { auth, fstore } from '../firebase'
import firebase from 'firebase/app'
import LoadingBar from "./LoadingBar";

var uid;
auth.onAuthStateChanged(user => {
  uid = user.uid
}
)
class HeroSection extends Component {
  constructor(props) {

    super(props)
    this.state = {
      loading: true,
      like: false,
      watched: false,
      region: "Australia",
      movieId: window.location.href.replace(/.*\//, ''),
    }
    this.likehandle = this.likehandle.bind(this)
    this.watchhandle = this.watchhandle.bind(this)
  }

  likehandle() {
    this.setState({
      like: !this.state.like
    }, () => {
      if (this.state.type === "TV") {
        if (this.state.like) {
          const data = {
            [this.state.movieId]: {
              likedAt: new Date().getTime(),
              title: this.state.title,
              poster: this.state.poster
            }
          }
          fstore.collection('likedTV').doc(uid).set(data, { merge: true })
        } else {
          fstore.collection('likedTV').doc(uid).update({
            [this.state.movieId]: firebase.firestore.FieldValue.delete()
          })

        }
      } else {
        if (this.state.like) {
          const data = {
            [this.state.movieId]: {
              likedAt: new Date().getTime(),
              title: this.state.title,
              poster: this.state.poster
            }
          }
          fstore.collection('likedMovie').doc(uid).set(data, { merge: true })
        } else {
          fstore.collection('likedMovie').doc(uid).update({
            [this.state.movieId]: firebase.firestore.FieldValue.delete()
          })
        }
      }
    })

  }

  watchhandle() {
    this.setState({
      watched: !this.state.watched
    }, () => {
      if (this.state.type === "TV") {
        if (this.state.watched) {
          const data = {
            [this.state.movieId]: {
              watchedAt: new Date().getTime(),
              title: this.state.title,
              poster: this.state.poster
            }
          }
          fstore.collection('watchedTV').doc(uid).set(data, { merge: true })
        } else {
          fstore.collection('watchedTV').doc(uid).update({
            [this.state.movieId]: firebase.firestore.FieldValue.delete()
          })

        }
      } else {
        if (this.state.watched) {
          const data = {
            [this.state.movieId]: {
              watchedAt: new Date().getTime(),
              title: this.state.title,
              poster: this.state.poster
            }
          }
          fstore.collection('watchedMovie').doc(uid).set(data, { merge: true })
        } else {
          fstore.collection('watchedMovie').doc(uid).update({
            [this.state.movieId]: firebase.firestore.FieldValue.delete()
          })
        }
      }
    })
  }

  componentDidMount() {
    var uid;
    var region;
    setTimeout(() => {
      auth.onAuthStateChanged((user) => {
        uid = user.uid;
        fstore
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            const docData = doc.data();
            if (docData) {
              this.setState({ region: docData.region });
            }
          })
          .then(() => {
            axios
              .get(window.location.href, {
                params: { region1: this.state.region },
              })
              .then((res) => {
                console.log(res.data.suggested_movies);
                this.setState(
                  {
                    loading: false,
                    poster: res.data.poster_path,
                    title: res.data.title,
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
                    release: res.data.release,
                  },
                  () => {
                    if (this.state.type === "TV") {
                      fstore
                        .collection("likedTV")
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
                      fstore.collection("watchedTV").doc(uid).get().then((doc) => {
                        if (doc.get(this.state.movieId) != null) {
                          this.setState({
                            watched: true
                          })
                        } else {
                          this.setState({
                            watched: false,
                          });
                        }
                      })
                    } else {
                      fstore
                        .collection("likedMovie")
                        .doc(uid)
                        .get()
                        .then((doc) => {
                          if (doc.get(this.state.movieId)) {
                            this.setState({
                              like: true,
                            });
                          } else {
                            this.setState({
                              like: false,
                            });
                          }
                        });
                      fstore.collection("watchedMovie").doc(uid).get().then((doc) => {
                        if (doc.get(this.state.movieId) != null) {
                          this.setState({
                            watched: true
                          })
                        } else {
                          this.setState({
                            watched: false,
                          });
                        }
                      }).then(() => {
                        this.setState({
                          loading: false
                        })
                      }

                      )
                    }
                  }
                );
              }).catch((e) => {
                console.log(e)
                window.location.reload()
              }
              )
          });
      });
    }, 2000)
  }

  render() {
    return (

      <div className="hero-container">
        <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
        {this.state.loading === true ?
          <div className="loader">
            <LoadingBar />
          </div>
          :
          <>
            <img
              className="poster"
              src={this.state.poster}
            />
            <div className="content">
              <div className="top">
                <div className="title">
                  {this.state.type === "TV" ? <h1>{this.state.title} ({this.state.seasons} Seasons {this.state.episodes} Episodes )</h1> :
                    <h1>{this.state.title} ({this.state.release}) - {this.state.runtime}m</h1>}
                </div>

                <div className="ratings">
                  <h1>{this.state.rating}/10</h1>
                  <img
                    className="star"
                    src="http://pngimg.com/uploads/star/star_PNG41474.png"
                  />
                </div>
              </div>
              <div className="subtitles">
                <h1>Plot: </h1>
                <div className="likeButton" onClick={this.likehandle}>
                  <h1>Like</h1>
                  <i className={this.state.like ? "fas fa-heart" : "far fa-heart"} />
                </div>
                <h1>Watched</h1>
                <div className="watched" onClick={this.watchhandle}>
                  <i className={this.state.watched ? "fas fa-square" : "far fa-square"} />
                </div>
              </div>
              <div className="plot">
                <p>
                  {this.state.plot}
                </p>
              </div>
              {!this.state.NoResults ?
                <div className="watchnow">
                  <h1>Watch Now!</h1>
                  {this.state.netflix ?
                    <Button
                      className="btns netflix"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.netflix}
                    >
                      <img className="netflix" src="/images/netflixicon.png" />
                    </Button> : <></>}
                  {this.state.stan ?
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.stan}
                    >
                      <img className="netflix" src="/images/stanicon.png" />
                    </Button> : <></>}
                  {this.state.prime ?
                    <Button
                      className="btns netflix"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.prime}
                    >
                      <img className="netflix" src="/images/primeicon.png" />
                    </Button> : <></>}
                  {this.state.disney ?
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.disney}
                    >
                      <img className="netflix" src="/images/disneyicon.png" />
                    </Button> : <></>}
                  {this.state.foxtel ?
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.foxtel}
                    >
                      <img className="netflix" src="/images/foxtelicon.png" />
                    </Button> : <></>}
                  {this.state.binge ?
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.binge}
                    >
                      <img className="netflix" src="/images/bingeicon.png" />
                    </Button> : <></>}
                  {this.state.quickflix ?
                    <Button
                      className="btns"
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
                      link={this.state.quickflix}
                    >
                      <img className="netflix" src="/images/quickflixicon.png" />
                    </Button> : <></>}
                </div> : <h1 className="plot">Not avaliable to stream in your reigon</h1>}
            </div>

          </>
        }
      </div>
    );
  }
}


export default HeroSection;
