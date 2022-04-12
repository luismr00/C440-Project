import React, {useState, useEffect} from 'react'
import { Link,useHistory } from "react-router-dom";


const CreateBlog = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [description, setDescription] = useState(false);
    const [subject, setSubject] = useState(false);
    const [tags, setTags] = useState(false);
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
                    tags: tags,
            }),
            })
    }
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
                <h1>Create New Blog</h1>
                <form onSubmit={post}>
                    <input type="text" placeholder="Subject"  id="subject" onChange={(e) => {setSubject(e.target.value)}}/>
                    <input type="text" placeholder="Description"  id="description" onChange={(e) => {setDescription(e.target.value)}}/>
                    <input type="text" placeholder="Tags"  id="tags" onChange={(e) => {setTags(e.target.value)}}/>
                    <button type="submit">Submit</button>
                </form>
                <button><Link to='/blogs'>Blogs</Link></button>
                <button><Link to='/userpage'>Main Menu</Link></button>
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default CreateBlog