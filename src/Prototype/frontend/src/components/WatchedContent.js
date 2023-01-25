import React from 'react'
import { Link } from 'react-router-dom'

function WatchedContent(props) {
    return (
        <div className="subscription_row">
            {props.content_type === "movie" ?
                <Link to={"/watch/Movie/" + props.content_id}>
                    <img className="subscription_icon" src={props.content_poster_url} />
                </Link> : <></>}

            {props.content_type === "tvshow" ?
                <Link to={"/watch/TV Show/" + props.content_id}>
                    <img className="subscription_icon" src={props.content_poster_url} />
                </Link> : <></>}

            {props.content_type === "album" ?
                <Link to={"/listen" + props.content_id}>
                    <img className="subscription_icon" src={props.content_poster_url} />
                </Link> : <></>}

            <div className="subscription_title">
                {props.content_name}
            </div>
        </div>
    )
}

export default WatchedContent
