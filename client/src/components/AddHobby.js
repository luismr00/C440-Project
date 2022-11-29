import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function AddHobby(props) {

    const [hobby, setHobby] = useState("");

    const postHobby = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/api/hobby", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                hobby: hobby,
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            console.log("create successful");
            alert("Hobby added successfully");
            setHobby("");
            props.closeSelection();
        } else {
            console.log("create failed");
        }
    }

    return (
        <div className="search-select" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Add hobby</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body">
                <form>
                    <input type="text" placeholder="hobby" value={hobby} onChange={(e) => setHobby(e.target.value)}></input>
                </form>
                <div className="center-button">
                <button className="continue-button" onClick={(e) => postHobby(e)}>Next</button>
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default AddHobby;