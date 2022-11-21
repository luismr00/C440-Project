import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";
//interests_FILL0_wght400_GRAD0_opsz48
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Interests from "../assets/interests.svg";


function Sidebar(props) { 
    return (
        <div className="sidebar">
            <div className="main-menu">
                <div className="main-options">
                    <h1>Blogger</h1>
                    <div className="navigations">
                        <img className="icon" src={Home}></img>
                        <h2>Home</h2>
                    </div>
                    <div className="navigations">
                        <img className="icon" src={Search}></img>
                        <h2>Search</h2>
                    </div>
                    {/* <span class="material-symbols-outlined">interests</span> */}
                    <div className="navigations">
                        <img className="icon" src={Interests}></img>
                        <h2>Hobbies</h2>
                    </div>
                    <button className="post-button" onClick={() => props.showPostWindow("visible")}>Post</button>
                </div>
                <div className="user-options">
                    <img src={UserIcon}></img>
                    <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>{props.user.firstName} {props.user.lastName}</p>
                </div>
            </div>

            {/* image next to user's name */}
            {/* <span class="material-symbols-outlined">account_circle</span> */}
            {/* <i class="bi bi-person-circle"></i> */}
        </div>
    );

}

export default Sidebar;