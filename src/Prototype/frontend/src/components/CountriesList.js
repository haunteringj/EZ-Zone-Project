import React from "react";
import "./CountriesList.css";

function CountriesList(props) {

    return (
        <select className="dropdown_box" id="country" name="country" defaultValue={props.region}>

            <option value="Australia">Australia</option>

            <option value="Canada">Canada</option>

            <option value="USA">USA</option>

        </select>
    );
}

export default CountriesList;
