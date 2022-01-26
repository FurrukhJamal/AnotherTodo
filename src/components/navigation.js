import React from "react";

export default function NavigationBar(){
    return (
        <div style = {{display : "flex", width : "100%",}}>
            <nav style = {{width : "100%"}}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </div>
        
    )
}