import React, {useContext, useState} from "react";
import TodosContext from "../context/TodosContext";
//import PropTypes from "react-propTypes";

function TodoForm(props){
    const [inputTodo, setInputTodo] = useState("")
    const {todos, setTodos, idForTodo, setidForTodo} = useContext(TodosContext)

    function handleSubmit(e){
        e.preventDefault()
        if(inputTodo.trim().length === 0){
          return;
        }
        setInputTodo("")
        //props.addtodo(inputTodo)
        //added the addtodo functionality via Context
        setTodos([...todos, {
            id : idForTodo,
            title: inputTodo,
            iscompleted : false
          }])
          //setInputTodo("")
          setidForTodo(previous=>previous + 1)        
    }

    
    function handleInput(e){
        setInputTodo(e.target.value)
    }


    return (
        <>
        <form action = "#" onSubmit={handleSubmit}>
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              value = {inputTodo}
              onChange={handleInput} 
              />
            
        </form>
        {/* <span>{msg}</span> */}
        </>
    )
}

// TodoForm.propTypes = {
//     addtodo : PropTypes.func.isRequired,
// }


export default TodoForm;