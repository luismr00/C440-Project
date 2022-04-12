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
            <div>
                <h1>Blogs</h1>
                {BlogList.map((blog,i) => {
                    return (
                        <div key={i}>
                            <p>--------------------</p>
                            <h1>Subject: {blog.subject}</h1>
                            <p>Author: {blog.user_id}</p>
                            <p>Description: {blog.description}</p>
                            <p>Tags: {blog.tags}</p>
                        </div>
                    )
                })}
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default Blogs