import React, { useContext } from "react";
import TodosContext from "../context/TodosContext";

export default function TodoFilter(){
    const {filter, setFilter} = useContext(TodosContext)
    
    return (
        <div style = {{display: "flex", flexDirection : "row"}}>
            <button 
                className ={`but ${filter === "all" ? "activeButton" : ""}`}
                onClick={()=>{
                    setFilter("all")
                }}>All</button>
            <button 
                className = {`but ${filter === "active" ? "activeButton" : ""}`}
                onClick = {()=>{
                    setFilter("active")
                }}>Active</button>
            <button 
                className = {`but ${filter === "completed" ? "activeButton" : ""}`}
                onClick={()=>{
                    setFilter("completed")
                }}>Completed</button>
        </div>
    )
    
}