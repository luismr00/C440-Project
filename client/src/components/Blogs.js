import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const Blogs = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [description, setDescription] = useState(false);
    const [subject, setSubject] = useState(false);
    const [tags, setTags] = useState(false);
    
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
                
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default Blogs