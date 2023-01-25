import React, { Component } from 'react';
import "./SearchBar.css"
import LoadingBar from './LoadingBar';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import ImageMaker from './ImageMaker';
import AlbumMaker from "./AlbumMaker";


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 800, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1600, itemsToShow: 5 }
]

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            type: "Movie",
            loading: false,
            searchedResults: [],
            searchedYet: false,
            foundResult: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount() {
        if (this.props.location.state) {
            this.state.type = this.props.location.state.type
            const data = {
                searched: this.props.location.state.search,
                type: this.props.location.state.type
            }
            this.setState({ loading: true })
            axios.post('/dashboard', { data })
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                    console.log(res.data.result)
                    this.setState({
                        searchedYet: true,
                        foundResult: res.data.result
                    })
                    if (this.state.foundResult === false) {
                        this.setState({
                            loading: false
                        })
                    } else {
                        this.setState({
                            searchedResults: res.data.search_results,
                            loading: false
                        })
                    }
                })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("hello")
        console.log(event)
        const data = {
            searched: this.state.search,
            type: this.state.type
        }
        event.preventDefault();
        this.setState({ loading: true })
        axios.post('/dashboard', { data })
            .then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.result)
                this.setState({
                    searchedYet: true,
                    foundResult: res.data.result
                })
                if (this.state.foundResult === false) {
                    this.setState({
                        loading: false
                    })
                } else {
                    this.setState({
                        searchedResults: res.data.search_results,
                        loading: false
                    })
                }
            })

    }


    render() {
        const searchBarStyle = {
            fontSize: 30,
        }


        const dropStyle = {
            fontSize: 30,
            width: "200px",
            paddingBottom: "4px",
            paddingTop: "2px",
            backgroundColor: "#323232",
            color: "white",
            border: "none"

        }

        const formStyle = {
            width: "100%",
            display: "inline-box",
        }

        const divStyle = {
            width: "100%",
            textAlign: "center",
        }


        return (
            <div>
                <div style={divStyle} className="form-container">
                    <form style={formStyle} onSubmit={this.handleSubmit} method='POST'>
                        <input style={searchBarStyle} className="search-box" name="search" type="text" placeholder="Search..." onChange={this.handleChange} required />
                        <select style={dropStyle} name="type" onChange={this.handleChange}>
                            <option value="Movie">Movie</option>
                            <option value="TV Show">TV Show</option>
                            <option value="Album">Album</option>
                        </select>
                    </form >
                </div>
                <div className="loadingBar">

                    {
                        this.state.loading
                            ?
                            <LoadingBar />
                            :
                            this.state.foundResult
                                ?
                                this.state.type === "Album" ?
                                    <Carousel breakPoints={breakPoints} >
                                        {this.state.searchedResults.map(item => <AlbumMaker key={item.result_id} imgSrc={item.poster_path} imgID={item.result_id} />)}
                                    </Carousel>
                                    :
                                    <Carousel breakPoints={breakPoints} >

                                        {this.state.searchedResults.map(item => <ImageMaker key={item.result_id} imgSrc={item.poster_path} imgID={item.result_id} imgType={this.state.type} />)}
                                    </Carousel>
                                :
                                this.state.searchedYet
                                    ?
                                    < h1 className="noResultHeader" > No Results Found </h1>
                                    :
                                    < h1></h1>
                    }
                </div>
            </div >
        )
    }
}


export default SearchBar