import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";
import UserSearchResult from "./UserSearchResult";
import NotFound from "../components/NotFound";
import NotAvailable from "./NotAvailable";

let obj = {
    firstName: "john",
    lastName: "smith",
    hobbies: ["bikes, games"]
}

function SearchDisplay(props) { 
    // console.log("checking userinfo");
    // console.log(props.userInfo);
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
            {console.log(props.userInfo)}
            {props.userInfo ? 
                JSON.stringify(props.userInfo) === '{}' ?
                    <NotAvailable title={"No matching users"} message={"Either select more hobbies or follow more users to view results."} button={"none"} margin={"270px 100px 0"} />
                    // <div>
                    //     {console.log("returning nothing")}
                    //     <h1>Nothing</h1>
                    // </div>
                    :
                    Object.keys(props.userInfo).map((user, index) => {
                        return(
                            <UserSearchResult user={props.userInfo[user]} username={user} key={index} />
                        );
                    }) 
                :
                <NotAvailable title={"Search users"} message={"Click on the button above to view search options. Please note to make friends both users must follow each other first."} button={"none"} margin={"250px 100px 0"} />
            } 
        </div>
        </div>
    );

}

export default SearchDisplay;