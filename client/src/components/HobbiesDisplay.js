import React, { useEffect, useState } from "react";
import HobbyOption from "./HobbyOption";
import HobbyOptionSelected from "./HobbyOptionSelected";
import { main_hobbies } from "../data/mainHobbies.js";
import ManageHobbies from "./ManageHobbies";

function HobbiesDisplay(props) { 

    // const [colorBG, setColorBG] = useState("#D4D4D4");
    // const [textColor, setTextColor] = useState("black");
    const [hover, setHover] = useState(false);
    // const [selected, setSelected] = useState(false);
    // const [savePopup, setSavePopup] = useState("hidden");
    // const [hobbiesList, setHobbyList] = useState([]);
    // const [userHobbiesAmount, setUserHobbiesAmount] = useState(0); //must use another variable to compare the initial size vs the new size of hobbies
    // const [selectedHobbies, setSelectedHobbies] = useState(new Set());
    // const [tempHobbies, setTempHobbies] = useState(new Set());

    const selectHobby = (hobby) => {

        console.log("Save popup value: " + props.savePopup);

        console.log("Checking selectedHobbies and tempHobbies at the beginning");
        console.log(props.selectedHobbies);
        console.log(props.tempHobbies);

        let matches = true;

        //Add hobby but check and remove first if it exits for handling hobby selections properly
        if(props.tempHobbies.has(hobby))
            props.tempHobbies.delete(hobby);
        else
            props.tempHobbies.add(hobby);

        //Turn tempHobbies to an array and then map its values to check if they exist using selectedHobbies.has()
        //Note: verify first if tempHobbies and selectedHobbies sizes are equal to avoid traversing with the map method when its unnecessary
        if (props.tempHobbies.size !== props.selectedHobbies.size) {
            props.setSavePopup("visible");
        } else {
            Array.from(props.tempHobbies).map((hobby) => {
                if(!props.selectedHobbies.has(hobby)) {
                    matches = false;
                }
            });

            //If all hobbies matched while running the map iteration, matches variable will always remain true and hence we hide popup, else we show
            if(matches === true) 
                props.setSavePopup("hidden");
            else
                props.setSavePopup("visible");
        }

        console.log("Checking same variables at the end now");
        console.log(props.selectedHobbies);
        console.log(props.tempHobbies);


        //Stringify selectedHobbies and tempHobbies for comparison verification
        // let temp1 = JSON.stringify(Array.from(tempHobbies));
        // let temp2 = JSON.stringify(Array.from(selectedHobbies));

        // tempHobbies.add("hi");

        // if(temp1 === temp2)
            //hide savePopup
            // console.log(true);
            // setSavePopup("hidden");
        // else
            //show savePopup
            // console.log(false);
            // setSavePopup("visible");


        
        // console.log(temp1);
        // console.log(temp2);

        //replace userHobbiesAmount to display popup

        // let count = userHobbiesAmount;

        // if(selectedHobbies.has(hobby)) {
        //     count--;
        //     selectedHobbies.delete(hobby);
        //     setUserHobbiesAmount(count);
        //  } else { 
        //     count++;
        //     selectedHobbies.add(hobby);
        //     setUserHobbiesAmount(count);
        //  }

        // console.log(selectedHobbies);

        // console.log(hobby);
        // console.log(userHobbiesAmount);
    }

    // const fetchHobbyList = async () => {
    //     const res = await fetch("http://localhost:4000/api/hobbies_list", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.hobbies != null){
    //         setHobbyList(data.hobbies);
    //     }
    // }

    // const fetchHobbies = async () => {
    //     const res = await fetch("http://localhost:4000/api/getHobbies", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.hobbies != null){

    //         console.log("Showing hobbies fetched");
    //         console.log(data.hobbies);
    //         setSelectedHobbies(new Set(data.hobbies));
    //         console.log(selectedHobbies);
    //         setTempHobbies(new Set(data.hobbies));
    //     }
    // }

    //   useEffect(() => {
    //     setSavePopup("hidden");
    //     fetchHobbies();
    //   }, [props.view]);
    
    //   useEffect(() => {
    //     fetchHobbyList();
    //   }, []);

    const postHobbies = async (e) => {
        e.preventDefault();

        //convert tempHobbies to array to pass to server
        let hobbies = Array.from(props.tempHobbies);

        const res = await fetch("http://localhost:4000/api/hobbies", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                hobbies: hobbies,
            }),
        }) 
        const data = await res.json();
        if(data.success) {
            console.log("create successful");
            alert("Hobbies added successfully");
            //reset selectedHobbies and tempHobbies if necessary
            //pass a different copy of tempHobbies to avoid selectedHobbies and tempHobbies behaving like pointers after
            props.setSelectedHobbies(new Set(hobbies));
            //hide savePopup ofc
            props.setSavePopup("hidden");
        } else {
            console.log("create failed");
        }
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

    // const showSavePopup = {
    //     visibility: userHobbiesAmount === 0 ? "hidden" : "visible"
    // }

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
                <h4>Main Hobbies</h4>
                <p>Choose as many hobbies as you'd like and then hit save</p>
            </div>
            <div className="hobby-container">
                {/* {console.log("changing views here...")}
                {console.log(selectedHobbies)}
                {console.log(tempHobbies)} */}
                {props.view === 'main' ? 
                    props.selectedHobbies.size === 0 ? 
                        <div className="hobby-lists">
                            {props.hobbiesList.map((hobby, id) => (
                                <HobbyOption key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                            ))}
                        </div> 
                        :
                        <div className="hobby-lists">
                            {/* {console.log("changing views here...")}
                            {console.log(selectedHobbies)}
                            {console.log(tempHobbies)} */}
                            {props.hobbiesList.map((hobby, id) => (
                                <HobbyOptionSelected key={id} id={id} hobby={hobby} selectHobby={selectHobby} check={props.selectedHobbies.has(hobby) ? true : false}/>
                            ))}
                        </div>
                    :
                    props.selectedHobbies.size === 0 ? 
                        <div className="hobby-lists">You have no hobbies saved</div>
                        :
                        <div className="hobby-lists">
                            {console.log(Array.from(props.selectedHobbies))}
                            {Array.from(props.selectedHobbies).map((hobby, id) => (
                                <ManageHobbies key={id} id={id} hobby={hobby} selectHobby={selectHobby}/>
                            ))}
                        </div>
                }
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="save-hobbies" style={{visibility: props.savePopup}}>
                <p>You have unsaved changes</p>
                <div className="hobby-buttons">
                <button className="hobby-clear">Clear</button>
                <button className="hobby-save" onClick={(e)=>postHobbies(e)}>Save</button>
                </div>
            </div>
        </div>
        </div>
    );

}

export default HobbiesDisplay;