import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function AddHobby(props) {

    const [hobby, setHobby] = useState("");
    // const [showSearch, setShowSearch] = useState(false);
    let showSearch = false; 

    // combination between main hobbies list and user hobbies list from the DB for searching purposes
    let list = props.hobbiesList.concat(props.otherHobbies);

    const validateHobby = (e) => {

        //change hobby state to lowercase
        let hobbyCopy = hobby.toLowerCase();

        let userHobbies = Array.from(props.selectedHobbies);
        let temp = [];

        userHobbies.map((val) => {
            temp.push(val.toLowerCase());
        });

        let newSet = new Set(temp);

        if(newSet.has(hobbyCopy)) 
            // console.log(true);
            return true
        else
            // console.log(false);
            return false;        
    } 

    const postHobby = async (e) => {

        let hobbyExists = validateHobby();

        if(hobbyExists === true) {
            console.log("Cannot add existing saved hobby");
        } else {
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
    }

    const display = {
        visibility: showSearch ? "visible" : "hidden"
    }

    return (
        <div className="search-select" id="hobby-search" style={{visibility: props.searchSelection}}>
            <div className="header-selection">
                <h3>Add hobby</h3>
                <img className="close" src={Close} onClick={() => props.closeSelection()}></img>
            </div>
            <div className="search-selection-body" id="hobby-search-body">
                <p className="hobby-search-header">Can't find your hobby? Don't worry. We'll check hobbies from other users as well and still try to match your search with a similar hobby.</p>
                <form className="hobby-search-input">
                    <input 
                        // className="hobby-search-input"
                        type="text" 
                        placeholder="Search" 
                        value={hobby} 
                        onChange={(e) => setHobby(e.target.value)}>
                    </input>
                </form>

                <div className="search-results">
                {list.filter((value, key) => {
                    if(hobby === "") {
                        showSearch = false;
                        return value;
                    } else if (value.toLowerCase().substring(0, hobby.length).includes(hobby.toLowerCase())) {
                        showSearch = true;
                        return value;
                    }}).map((value, key) => {
                        return (
                            <div 
                                className="search-hobby" 
                                key={key} 
                                onClick={() => setHobby(value)}
                                style={showSearch === true ? {display: "flex", visibility: "visible"} : {display: "none", visibility: "hidden"}}>
                                    <p>{value}</p>
                            </div>
                    );
                })}
                </div>
                <div className="center-button">
                <button className="continue-button" onClick={(e) => postHobby(e)}>Next</button> 
                <button className="continue-button" onClick={() => props.setSearchPage(0)}>Back</button>
                </div>
            </div>
        </div>
    );

}

export default AddHobby;