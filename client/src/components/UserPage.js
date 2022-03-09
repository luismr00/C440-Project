import React from "react";
import { useEffect, useState } from "react";


function UserPage() {

  const Initialize = async () => {
    const res = await fetch("http://localhost:4000/api/initialize", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json();
    if(data.success) {
      console.log("initialize successful");
    } else {
      console.log("initialize failed");
    }
  }

    return (
      <div className="App">
          <h1>Welcome to the user's page</h1>
          <button>Initialize Database</button>
      </div>
    );
}
  
export default UserPage;