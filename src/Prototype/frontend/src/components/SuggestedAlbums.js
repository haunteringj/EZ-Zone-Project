import "./SuggestedMovies.css";
import React, { Component } from 'react';
import LoadingBar from "./LoadingBar";
import Carousel from 'react-elastic-carousel';
import AlbumMaker from "./AlbumMaker";
import axios from 'axios';


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 800, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1600, itemsToShow: 5 }
]

class SuggestedAlbums extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            imagePaths: [],
        }
    }

    componentDidMount() {
        axios.get('/dashboard/albumsuggested', {})
            .then(res => {
                console.log(res.data.suggested_album)
                this.setState({
                    imagePaths: res.data.suggested_album,
                    loading: false
                })
            })
    }
    render() {
        return (
            <div className="suggest-container">
                {this.state.loading === true ?
                    <LoadingBar /> :
                    <Carousel breakPoints={breakPoints}>
                        {this.state.imagePaths.map(item => <AlbumMaker key={item.result_id} imgSrc={item.poster_path} imgID={item.result_id} />)}
                    </Carousel>
                }
            </div>
        )
    }
}

export default SuggestedAlbums