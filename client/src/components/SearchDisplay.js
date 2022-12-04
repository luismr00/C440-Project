import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";
import UserSearchResult from "./UserSearchResult";

let obj = {
    firstName: "john",
    lastName: "smith",
    hobbies: ["bikes, games"]
}

function SearchDisplay(props) { 
    return (
        <div className="column main-display" id="column-grow">
        <div className="main-content">
            <div className="main-header">
                <div className="logo-header"><p>B</p></div>
                <h1>Search</h1>
                <div className="user-icon-header">
                    <img src={UserIcon}></img>
                </div>
            </div>
            <div className="select-button">
                {/* <div className="selection-button" onClick={() => props.setBlogSelection("visible")}><p>Hi {props.user.name}, what would you like to check today?</p></div> */}
                <div className="selection-button" onClick={() => props.setSearchSelection("visible")}><p>Hi {props.user.name}, what would you like to search for today?</p></div>
            </div>
            {props.userInfo ? 
                // map userInfo since it can be many
                Object.keys(props.userInfo).map((user, index) => {
                    {console.log(props.userInfo[user])}
                    return(
                        <UserSearchResult user={props.userInfo[user]} username={user} key={index} />
                    );
                })
                // <UserSearchResult userInfo={props.userInfo["mango"]} />
                // <div>
                // <UserSearchResult user={obj} />
                // <UserSearchResult user={obj} />
                // </div>
                :
                <div>Search is empty</div>
            } 
        </div>
        </div>
    );

}

export default SearchDisplay;