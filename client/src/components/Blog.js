import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

const Blog = () => {
    const location = useLocation();
    const { pathname } = location;
    const [comment, setComment] = useState("");

    const postComment = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[2]}/comment`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                comment: comment,
            }),
        })
            const data = await res.json();
            if(data.success) {
                console.log("comment successful");
                setComment("");
            } else {
                console.log("comment failed");
            }
    }

  return (
    <div>
        <div className="card" style={{width: "50%", margin: '0 auto'}}>
            <div className="card-body">
                <h5 className="card-title">Subject: {location.state.state.subject}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Author: {location.state.state.user_id}</h6>
                <p className="card-text">Description: {location.state.state.description}</p>
                <p className="card-text">Tags: {location.state.state.tags}</p>
            </div>
        </div>
        <form onSubmit={postComment} style={{margin: '0'}}>
            <input style={{width: '50%', margin:'0 auto'}} value={comment} onChange={(e)=> {setComment(e.target.value)}} type="text" placeholder="Comment" />
            <button>Post Comment</button>
        </form>
    </div>

  )
}

export default Blog