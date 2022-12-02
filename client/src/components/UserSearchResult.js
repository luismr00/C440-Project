import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/person-circle.svg";

function UserSearchResult(props) { 

    const history = useHistory();

    return (
        <div className="user-search" onClick={() => {history.push(`/profile/${props.username}`)}}>
            <div className="user-search-body">
                <img src={UserIcon}></img>
                <div className="user-search-text">
                    <h5>{props.user.firstName} {props.user.lastName}</h5>
                    {console.log("hobbies: " + props.user.hobbies)}
                    {props.user.hobbies.map((hobby, index) => {
                        if(index === props.user.hobbies.length - 1)
                            return(<p className="user-hobby-list">{hobby}</p>)
                        else
                            return(<p className="user-hobby-list">{hobby},</p>);
                    })}
                </div>
            </div>
        </div>
    );

}

export default UserSearchResult;