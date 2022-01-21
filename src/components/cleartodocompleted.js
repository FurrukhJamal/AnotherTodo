import React from "react";

export default function TodoClearCompleted(props){
    return(
        <button onClick = {props.clearCompleted} className = "but">Clear Completed</button>
    )
}