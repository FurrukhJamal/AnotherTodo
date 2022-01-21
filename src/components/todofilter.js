import React from "react";

export default function TodoFilter(props){
    return (
        <div style = {{display: "flex", flexDirection : "row"}}>
            <button 
                className ={`but ${props.filter === "all" ? "activeButton" : ""}`}
                onClick={()=>{
                    props.setFilter("all")
                }}>All</button>
            <button 
                className = {`but ${props.filter === "active" ? "activeButton" : ""}`}
                onClick = {()=>{
                    props.setFilter("active")
                }}>Active</button>
            <button 
                className = {`but ${props.filter === "completed" ? "activeButton" : ""}`}
                onClick={()=>{
                    props.setFilter("completed")
                }}>Completed</button>
        </div>
    )
    
}