import React from "react";
import { FixedSizeList } from "react-window";
function TrackMaker(props) {
    const items = props.tracks;
    const durations = props.durations;
    const trackLinks = props.trackLinks;
    const Row = ({ index, style }) => (
        <a target="_blank" href={trackLinks[index]}>
            <div className="list-group-item" style={style}>
                <div className="trackname">
                    <h1>
                        {index + 1}. {items[index]}
                    </h1>
                </div>
                <div className="time">
                    <h1>{durations[index]}</h1>
                </div>
            </div>
        </a>
    );
    return (
        <FixedSizeList
            height={480}
            itemSize={80}
            itemCount={items.length}
            className="list-container"
        >
            {Row}
        </FixedSizeList>
    );
}

export default TrackMaker;
