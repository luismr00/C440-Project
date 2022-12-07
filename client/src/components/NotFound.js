import React, { useEffect, useState } from "react";

function NotFound() {
    return(
        <div className="column main-display">
            <div className="main-content">
                <div className="empty-content">
                    <h3>Page not found</h3>
                    <p>Try searching instead</p>
                    <a href="/search" style={{marginTop: "20px"}}>
                        <button className="continue-button">Search</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

