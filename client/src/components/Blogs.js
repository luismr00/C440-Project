import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const Blogs = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [BlogList,setBlogList] = useState([]);

    useEffect(() => {
        const fetchpost = async () => {
            const res = await fetch("http://localhost:4000/api/blogs", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            if(data.blogs != null){
                console.log(data.blogs);
                setBlogList(data.blogs);
            }
        }
        fetchpost();

    }, []);
    
    useEffect(() => {
        const fetchcookie = async () => {
            const res = await fetch("http://localhost:4000/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            if(data.user != null){
                setAuthenticated(true);
            } else {
                console.log("user is not logged in");
                setAuthenticated(false);
                history.push("/");
            }
        }
        if(!authenticated){
            fetchcookie();
        }
    }, [authenticated]);

    return (
        <>
        {authenticated ?
        <div className="default">
            <div>
                <h1>Blogs</h1>
                {BlogList.map((blog,i) => {
                    return (
                        <div className="card" style={{width: "18rem", margin: '0 auto', marginBottom: '30px'}} key={i}>
                        <div className="card-body">
                          <h5 className="card-title">Subject: {blog.subject}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Author: {blog.user_id}</h6>
                          <p className="card-text">Description: {blog.description}</p>
                          <p className="card-text">Tags: {blog.tags}</p>
                          <button onClick={() => {history.push(`/blog/:${blog.id}`, {state: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags}})}}>Comments</button>
                        </div>
                      </div>
                    )
                })}
            </div>
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default Blogs