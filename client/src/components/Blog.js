import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const Blog = () => {
    const location = useLocation();
    const { pathname } = location;
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [commentList, setCommentList] = useState([]);

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
                rating: rating
            }),
        })
        const data = await res.json();
        if(data.success) {
            console.log("comment successful");
            let newCommentList = [...commentList];
            const newComment = {
                comment: comment,
                username: data.username,
            }
            newCommentList.push(newComment);
            setComment("");
            setCommentList(newCommentList);
        } else {
            console.log(data.err);
        }
    }

    useEffect(() => {
        const callComments = async () => {
            const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[2]}/comments`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'credentials': 'include'
                },
            })
                const data = await res.json();
                if(data.success) {
                    console.log("comments successful");
                    console.log(data.comments);
                    setCommentList(data.comments);
                } else {
                    console.log("comments failed");
                }
        }
        callComments();
    }, [])
  return (
    <div className="default" style={{marginTop: '20px'}}>
        <div className="card SignOrReg" style={{width: "50%", margin: '0 auto'}}>
            <div className="card-body">
                <h5 className="card-title">Subject: {location.state.state.subject}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Author: {location.state.state.user_id}</h6>
                <p className="card-text">Description: {location.state.state.description}</p>
                <p className="card-text">Tags: {location.state.state.tags}</p>
            </div>
        </div>
        <h6 style={{marginTop: '10px'}}><b>Comments</b></h6>
        <div>
            {commentList.map((comments,i) => {
                return (
                    <div className="card" style={{width: "50%", margin: '0 auto', marginBottom: '10px'}} key={i}>
                        <h6 className="card-title">username: {comments.username}</h6>
                        <p className="card-text">{comments.comment}</p>
                        <p className="card-text">Rating: {comments.rating ==1?"Positive":"Negative" }</p>
                    </div>
                )
            })}
        </div>
        <form onSubmit={postComment} style={{margin: '0'}}>
            <div style={{width: '52%', margin:'0 auto', display: 'flex',}} >
                <div>
                    <select onChange={(e) => {setRating(e.target.value)}}>
                        <option value="1">Positive</option>
                        <option value="0">Negative</option>
                    </select>
                </div>
                <input style={{padding: '10px 0'}} value={comment} onChange={(e)=> {setComment(e.target.value)}} type="text" placeholder="Comment" />
            </div>
            <button>Post Comment</button>
        </form>
    </div>

  )
}

export default Blog