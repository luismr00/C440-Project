import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";
import FollowButton from "./FollowButton";

function UserSearchResult(props) { 

    const history = useHistory();
    let userProfile = {
        username: props.username
    }
    // let user = {
    //     username: null
    // }

    return (
        <div className="user-search" onClick={() => {history.push(`/profile/${props.username}`)}}>
            <div className="user-search-body">
                <div className="user-search-info">
                    <img src={UserIcon}></img>
                    <div className="user-search-text">
                        <h5>{props.user.first_name} {props.user.last_name}</h5>
                        {/* {console.log("hobbies: " + props.user.hobbies)} */}
                        {props.user.hobbies ? 
                            props.user.hobbies.map((hobby, index) => {
                                if(index === props.user.hobbies.length - 1)
                                    return(<p className="user-hobby-list">{hobby}</p>)
                                else
                                    return(<p className="user-hobby-list">{hobby},</p>);
                            }) : 
                            <div>
                                <p>@{props.username}</p>
                            </div>
                        }
                    </div>
                </div>
                {/* <div className="follow-button" onClick={() => followUser(userProfile.username)}>follow</div> */}
                {/* <button className="follow-button">follow</button> */}
                <FollowButton user={props.sessionUser} userProfile={userProfile} />
            </div>
        </div>
    );

}

export default UserSearchResult;