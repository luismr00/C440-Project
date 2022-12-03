import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg"

function Homeblogs(props) { 
    return (
        <div className="column main-display" id="column-grow">
        <div className="main-content">
            <div className="main-header">
                <div className="logo-header"><p>B</p></div>
                <h1>Home</h1>
                <div className="user-icon-header">
                    <img src={UserIcon}></img>
                </div>
            </div>
            <div className="select-button">
                <div className="selection-button" onClick={() => props.setBlogSelection("visible")}><p>Hi {props.user.name}, what would you like to check today?</p></div>
            </div>
            <Blogs BlogList={props.BlogList}/>
        </div>
        </div>
    );

}

export default Homeblogs;