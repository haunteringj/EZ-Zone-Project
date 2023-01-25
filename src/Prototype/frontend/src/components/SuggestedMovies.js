import "./SuggestedMovies.css";
import React, { Component } from 'react';
import LoadingBar from "./LoadingBar";
import Carousel from 'react-elastic-carousel';
import ImageMaker from "./ImageMaker";
import axios from 'axios';
import { auth, fstore } from '../firebase'


var uid;
auth.onAuthStateChanged(user => {
    uid = user.uid
}
)

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 800, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1600, itemsToShow: 5 }
]

class SuggestedMovies extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            imagePaths: [],
        }
    }

    componentDidMount() {
        var uid;
        auth.onAuthStateChanged(user => {
            uid = user.uid
            const likedMovie = fstore.collection('likedMovie').doc(uid)
            likedMovie.get().then((doc) => {
                const docData = doc.data()

                if (docData) {
                    var mostRecent = 1
                    var recentMovie;
                    console.log(docData)
                    for (var key in docData) {
                        if (docData[key].likedAt > mostRecent) {
                            mostRecent = docData[key].likedAt
                            recentMovie = key
                        }

                    }
                    axios.get('/dashboard/suggested/specific', { params: { "movieId": recentMovie } })
                        .then(res => {
                            var suggestList = res.data.suggested_movies
                            console.log(suggestList)
                            this.setState({
                                imagePaths: suggestList,
                                loading: false
                            })
                        })
                }
                else {
                    axios.get('/dashboard/suggested', {})
                        .then(res => {
                            console.log(res.data.suggested_movies)
                            this.setState({
                                imagePaths: res.data.suggested_movies,
                                loading: false
                            })
                        })
                }
            })
        }
        )
    }

    render() {
        return (
            <div className="suggest-container">
                {this.state.loading === true ?
                    <LoadingBar /> :
                    <Carousel breakPoints={breakPoints}>
                        {this.state.imagePaths.map(item => <ImageMaker key={item.movie_id} imgSrc={item.poster_path} imgID={item.movie_id} imgType={"Movie"} />)}
                    </Carousel>
                }
            </div>
        )
    }
}

export default SuggestedMovies
