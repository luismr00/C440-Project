import React  from 'react'
import { useLocation } from 'react-router-dom'

const Blog = () => {
    const location = useLocation();
    const { pathname } = location;
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
    </div>

  )
}

export default Blog