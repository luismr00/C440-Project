import React, { useEffect, useState } from "react";
import UserIcon from "../assets/person-circle.svg";

function Followings(props) { 

    

    return (
        <div className="column">

        <div className="following">
            <div className="following-header">
            <h1>Following</h1>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
            <div className="user-bar">
                <img src={UserIcon}></img>
                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
            </div>
        </div>
        </div>
    );

}

export default Followings;