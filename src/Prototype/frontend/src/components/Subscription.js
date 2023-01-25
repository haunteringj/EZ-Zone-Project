import React from 'react'
import "./Subscription.css"

function Subscription(props) {
    var subed = props.subscribed
    var index = props.service_index
    if (subed === 0) {
        return null
    }
    var path = ""
    switch (index) {
        case 0:
            path = "./images/netflixicon.png"
            break;
        case 1:
            path = "./images/stanicon.png"
            break;
        case 2:
            path = "./images/primeicon.png"
            break;
        case 3:
            path = "./images/disneyicon.png"
            break;
        case 4:
            path = "./images/quickflixicon.png"
            break;
        case 5:
            path = "./images/foxtelicon.png"
            break;
        case 6:
            path = "./images/googleicon.png"
            break;
        case 7:
            path = "./images/bingeicon.png"
            break;
        case 8:
            path = "./images/youtubeicon.png"
            break;
    }

    return (

        < div className="subscription_row" >
            <img className="subscription_icon" src={path} />
        </div >
    )
}

export default Subscription