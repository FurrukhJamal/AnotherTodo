import React, { useContext } from "react";
import TodosContext from "../context/TodosContext";

export default function TodoItemsRemaining()
{
    const {todos} = useContext(TodosContext)
    function remaining(){
        return todos.filter(todo=> !todo.iscompleted).length
    }
    
    return (
        <p>{remaining()} items remaining</p>
    )
}