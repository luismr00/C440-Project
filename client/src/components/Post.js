import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function Post(props) {

  const [subject, setSubject] = useState('');
  // const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if(subject.length === 0 || props.tags.length === 0 || description.length === 0) {
      console.log("Fill in all the fields before submitting again");
    } else {
      // console.log(subject);
      // console.log(tags);
      // console.log(description);
      post(event);
      // props.setPostSuccess(true);
      props.closePostWindow();
      // props.fetchpost();
      // console.log("testing blogList");
      
    }
  }

  const post = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'credentials': 'include'
      },
      body: JSON.stringify({
              description: description,
              subject: subject,
              tags: props.tags,
      }),
      }) 
      const data = await res.json();
      if(data.success) {
          console.log("create successful");
          // history.push("/blogs");
          alert("Blog created successfully");
          setDescription("");
          setSubject("");
          props.setTags("");
          props.fetchpost();
      } else {
          alert(data?.err);
          console.log("create failed");
      }
  }

    // console.log("initial postWindow value: " + props.postWindow);
    return (
        <div className="post" style={{visibility: props.postWindow}}>
          <div className="post-body">
          <div className="post-header">
            <label>luismi</label>
            {/* handle showPostWindow below to change switch automatically to tags display */}
            {console.log("the tags selected are: " + props.tags)}
            <img className="close" src={Close} onClick={() => props.closePostWindow()}></img>
          </div>
          <div className="form-body">
            <form onSubmit={handleSubmit}>
              <input className="post-subject" placeholder="Subject" value={subject} onChange={(event) => setSubject(event.target.value)}></input>
              {/* <input className="post-tags" placeholder="Tags" value={tags} onChange={(event) => setTags(event.target.value)}></input> */}
              <textarea className="post-text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
              <div className="submit-post">
                <button type="submit" className="submit-button">Submit</button>
                <button className="submit-button" onClick={() => props.setSwitchDisplay(0)}>Back</button>
              </div>
            </form>
          </div>
          </div>
        </div>
    );

}

export default Post;