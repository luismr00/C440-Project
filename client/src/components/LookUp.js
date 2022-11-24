import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function LookUp(props) {
    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Search</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body">
                <form>
                    <input type="text" placeholder="Search users"></input>
                </form>
                <div className="center-button">
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default LookUp;