import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";

function ProfileDisplay(props) { 
    return (
        <div className="column main-display">
        <div className="main-content">
            <div className="main-header">
                <h1>{props.user.firstName} {props.user.lastName}</h1>
            </div>
            <div className="profile-header">
                <div className="profile-header-body">
                    <div className="profile-header-image">
                        {/* <p>image here</p> */}
                        <img src={UserIcon}></img>
                    </div>
                    <div className="profile-header-text">
                        <div className="profile-header-top">
                            <h4>{props.user.firstName} {props.user.lastName}</h4>
                            {/* <p>follow button</p> */}
                            <button className="follow-button">Follow</button>
                        </div>
                        <div><p>Hobbies: video games, hiking, travel, drinking, shooting, dancing</p></div>
                        <div className="profile-header-follows">
                            <p>10k Followers</p>
                            <p>52 Following</p>
                            {/* <p>0 Mutual Followers</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <Blogs />   
        </div>
        </div>
    );

}

export default ProfileDisplay;