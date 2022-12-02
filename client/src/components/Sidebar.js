import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";
//interests_FILL0_wght400_GRAD0_opsz48
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Interests from "../assets/interests.svg";
import Person from "../assets/person.svg";


function Sidebar(props) { 

    const history = useHistory();
    const [showLogout, setShowLogout] = useState(false);

    const logout = async () => {
        const res = await fetch("http://localhost:4000/logout", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json();
        if(data.success) {
          console.log("logout successful");
          props.setAuthenticated(false);
          props.setUser(null);
          history.push("/");
        } else {
          console.log("logout failed");
        }
      }

    return (
        <div className="sidebar">
            <div className="main-menu">
                <div className="main-options">
                    <h1>Blogger</h1>
                    <div className="navigations">
                        <img className="icon" src={Home}></img>
                        <a href="/userPage"><h2>Home</h2></a>
                    </div>
                    <div className="navigations">
                        <img className="icon" src={Search}></img>
                        <a href="/search"><h2>Search</h2></a>
                    </div>
                    {/* <span class="material-symbols-outlined">interests</span> */}
                    <div className="navigations">
                        <img className="icon" src={Interests}></img>
                        <a href="/hobbies"><h2>Hobbies</h2></a>
                    </div>
                    <div className="navigations">
                        <img className="icon" src={Person}></img>
                        <div onClick={() => {history.push(`/profile/${props.user.username}`)}}><h2>Profile</h2></div>
                    </div>
                    <button className="post-button" onClick={() => props.openPostWindow()}>Post</button>
                </div>
                <div className="user-options" style={showLogout ? {visibility: "visible"} : {visibility: "hidden"}}>
                    <div onClick={() => logout()}><p>Log out</p></div>
                </div>
                <div className="user-button" onClick={()=>showLogout ? setShowLogout(false) : setShowLogout(true)}>
                    <img src={UserIcon}></img>
                    <p>{props.user.firstName} {props.user.lastName}</p>
                </div>
            </div>

            {/* image next to user's name */}
            {/* <span class="material-symbols-outlined">account_circle</span> */}
            {/* <i class="bi bi-person-circle"></i> */}
        </div>
    );

}

export default Sidebar;