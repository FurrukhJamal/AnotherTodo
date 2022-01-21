import React, {useState} from "react";
//import PropTypes from "react-propTypes";

function TodoForm(props){
    const [inputTodo, setInputTodo] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(inputTodo.trim().length === 0){
          return;
        }
        setInputTodo("")
        props.addtodo(inputTodo)        
    }

    
    function handleInput(e){
        setInputTodo(e.target.value)
    }


    return (
        <form action = "#" onSubmit={handleSubmit}>
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              value = {inputTodo}
              onChange={handleInput} 
              />
        </form>
    )
}

// TodoForm.propTypes = {
//     addtodo : PropTypes.func.isRequired,
// }


export default TodoForm;