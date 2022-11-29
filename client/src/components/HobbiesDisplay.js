import React, { useEffect, useState } from "react";
import HobbyOption from "./HobbyOption";
import { main_hobbies } from "../data/mainHobbies.js";

// const list = ["hobby1", "hobby2", "hobby3", "hobby4"];
const list = main_hobbies;
const selectedHobbies = new Set();

function HobbiesDisplay(props) { 

    const [colorBG, setColorBG] = useState("#D4D4D4");
    const [textColor, setTextColor] = useState("black");
    const [hover, setHover] = useState(false);
    const [selected, setSelected] = useState(false);
    // const [savePopup, setSavePopup] = useState("hidden");
    const [userHobbiesAmount, setUserHobbiesAmount] = useState(0); //must use another variable to compare the initial size vs the new size of hobbies

    const selectHobby = (hobby) => {

        let count = userHobbiesAmount;

        if(selectedHobbies.has(hobby)) {
            count--;
            selectedHobbies.delete(hobby);
            setUserHobbiesAmount(count);
         } else { 
            count++;
            selectedHobbies.add(hobby);
            setUserHobbiesAmount(count);
         }

        // console.log(selectedHobbies);
        // console.log(hobby);
        // console.log(userHobbiesAmount);
    }

    // const removeSelectedHobby = ()

    const hobbySelected = {
        backgroundColor: "red",
        color: "white"
    }

    const sectionStyle = {
        backgroundColor: hover ? "red" : "#D4D4D4", 
        color: hover ? "white" : "black"
        // backgroundColor: "red"
    }

    const showSavePopup = {
        visibility: userHobbiesAmount === 0 ? "hidden" : "visible"
    }

    return (
        <div className="column main-display">
        <div className="main-content">
            <div className="main-header">
                <h1>Hobbies</h1>
            </div>
            <div className="select-button">
                <div className="selection-button" onClick={() => props.setHobbySelection("visible")}><p>Hi {props.user.name}, would you like to add a new hobby or modify existing ones?</p></div>
            </div>
            <div className="hobby-header">
                <h4>All Hobbies</h4>
                <p>Choose as many hobbies as you'd like and then hit save</p>
            </div>
            <div className="hobby-container">
                <div className="hobby-lists">
                    {/* <div className="hobby-option" id="hobby1" style={selected ? hobbySelected : sectionStyle} onClick={()=>setSelected(selected ? false : true)} onMouseEnter={()=>setHover(true)} onMouseLeave={() => setHover(false)}><p>Hobby</p></div>
                    <div className="hobby-option" id="hobby2" style={{backgroundColor: colorBG, color: textColor}} onClick={()=>selectHobby("hobby2")}><p>Hobby</p></div>
                    <div className="hobby-option"><p>Hobby</p></div> */}
                    {list.map((hobby, id) => (
                        <HobbyOption key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                    ))}
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="save-hobbies" style={showSavePopup}>
                <p>You have unsaved changes</p>
                <div className="hobby-buttons">
                <button className="hobby-save">Save</button>
                <button className="hobby-clear">Clear</button>
                </div>
            </div>
        </div>
        </div>
    );

}

export default HobbiesDisplay;