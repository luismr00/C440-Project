import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";

function ProfileDisplay(props) { 

    const [follower, setFollower] = useState(null);

    const followUser = async (followedUser) => {
        console.log(follower + ' will now follow ' + followedUser);

        //follower MUST NOT follow itself
        if (follower != followedUser) {
            const res = await fetch("http://localhost:4000/api/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser,
                    follower: follower
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                console.log('successfully followed the user');
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
            console.log('following oneself is not permitted');
        }

    }

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
                            {/* <button className="follow-button" onClick={() => followUser(blog.user_id)}>Follow</button> */}
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
            <Blogs BlogList={props.BlogList}/>  
        </div>
        </div>
    );

}

export default ProfileDisplay;