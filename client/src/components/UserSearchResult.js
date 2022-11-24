import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";

function UserSearchResult(props) { 
    return (
        <div className="user-search">
            <div className="user-search-body">
                <img src={UserIcon}></img>
                <div className="user-search-text">
                    <h5>Joseph Marquez</h5>
                    <p>Hobbies</p>
                </div>
            </div>
        </div>
    );

}

export default UserSearchResult;