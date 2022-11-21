import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function BlogSelection(props) {
    return (
        <div className="blog-switch" style={{visibility: props.blogSelection}}>
            {/* <img className="close" src={Close} onClick={() => props.showPostWindow("hidden")}></img> */}
            <div className="close-selection">
                <img className="close" src={Close} onClick={() => props.setBlogSelection("hidden")}></img>
            </div>
            <div className="blog-switch-body">
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">Show all blogs</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">Show blogs with no comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"></input>
                <label class="form-check-label" for="flexSwitchCheckChecked">Show blogs with more positive than negative comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckDisabled">Show blogs with more negative than positive comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Show blogs with ONLY positive comments</label>
                </div>
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled"></input>
                <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Show blogs that share similar hobbies</label>
                </div>
                <div className="center-button">
                <button className="save-button">Save</button>
                </div>
            </div>
        </div>
    );

}

export default BlogSelection;