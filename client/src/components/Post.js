import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function Post(props) {
    console.log("initial postWindow value: " + props.postWindow);
    return (
        <div className="post" style={{visibility: props.postWindow}}>
          <div className="post-body">
          <div className="post-header">
            <label>luismi</label>
            {/* <label style={{size: "18px"}}>x</label> */}
            <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img>
          </div>
          <textarea className="post-text" placeholder="What's in your mind?"></textarea>
          <div className="submit-post">
            <button className="submit-button">Submit</button>
          </div>
          </div>
        </div>
    );

}

export default Post;