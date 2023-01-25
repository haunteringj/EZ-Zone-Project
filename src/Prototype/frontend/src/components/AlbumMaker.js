import React from 'react';
import { Link } from 'react-router-dom';

function AlbumMaker(props) {
    return (
        <Link to={'/listen/' + props.imgID}>
            <img width="200px" height="200px" src={props.imgSrc} id={props.imgID}></img>
        </Link >
    )
}

export default AlbumMaker