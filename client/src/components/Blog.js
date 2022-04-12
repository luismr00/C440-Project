import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const Blog = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [BlogList,setBlogList] = useState([]);

    useEffect(() => {
        const fetchpost = async () => {
            const res = await fetch("http://localhost:4000/api/:id/comment'", {
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
                <h1>Singular Blog Comments</h1>
                
            </div>
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default Blog