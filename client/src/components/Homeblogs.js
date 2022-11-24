import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";

function Homeblogs(props) { 
    return (
        <div className="column main-display">
        <div className="main-content">
            <div className="main-header">
                <h1>Home</h1>
            </div>
            <div className="select-button">
                <div className="selection-button" onClick={() => props.setBlogSelection("visible")}><p>Hi {props.user.name}, what would you like to check today?</p></div>
            </div>
            <Blogs />   
        </div>
        </div>
    );

}

export default Homeblogs;