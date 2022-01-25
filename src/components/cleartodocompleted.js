import React, { useContext } from "react";
import TodosContext from "../context/TodosContext";

export default function TodoClearCompleted(){
    const {todos, setTodos} = useContext(TodosContext) 
    
    function clearCompleted(){
        console.log("clear completed kicked in")
        setTodos([...todos].filter(todo=> !todo.iscompleted))
    }
    
    return(
        <button onClick = {clearCompleted} className = "but">Clear Completed</button>
    )
}