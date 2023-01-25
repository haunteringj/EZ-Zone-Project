import React from 'react';
import { Link } from 'react-router-dom';


function ImageMaker(props) {
    const imagePath = "https://image.tmdb.org/t/p/original/"
    return (
        <Link to={'/watch/' + props.imgType + '/' + props.imgID}>
            <img width="200px" height="300px" src={imagePath + props.imgSrc} id={props.imgID}></img>
        </Link >
    )
}


export default ImageMaker