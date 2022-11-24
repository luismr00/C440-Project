import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";
import UserSearchResult from "./UserSearchResult";

function SearchDisplay(props) { 
    return (
        <div className="column main-display">
        <div className="main-content">
            <div className="main-header">
                <h1>Search</h1>
            </div>
            <div className="select-button">
                {/* <div className="selection-button" onClick={() => props.setBlogSelection("visible")}><p>Hi {props.user.name}, what would you like to check today?</p></div> */}
                <div className="selection-button" onClick={() => props.setSearchSelection("visible")}><p>Hi {props.user.name}, what would you like to search for today?</p></div>
            </div>
            <UserSearchResult />
        </div>
        </div>
    );

}

export default SearchDisplay;