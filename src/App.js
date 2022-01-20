import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id : 1,
      title : "Go to groceries",
      iscompleted : false,
      isEditing : false,

    },
    {
      id : 2,
      title : "Finish work",
      iscompleted : true,
      isEditing : false,

    },
    {
      id : 3,
      title : "Go to die",
      iscompleted : false,
      isEditing : false,

    },])

    const [allChecked, setAllChecked] = useState(false)
    const [inputTodo, setInputTodo] = useState("")
    const[idForTodo, setidForTodo] = useState(4)

    function handleInput(e){
      setInputTodo(e.target.value)
    }

    function addTodo(e){
      e.preventDefault()
      if(inputTodo.trim().length === 0){
        return;
      }
      setTodos([...todos, {
        id : idForTodo,
        title: inputTodo,
        iscompleted : false
      }])
      setInputTodo("")
      setidForTodo(previous=>previous + 1)
    }

    function deleteTodo(id){
      setTodos([...todos].filter(item=> item.id !== id))
    }

    function completeTodo(id){
      const updatedTodos = todos.map(todo=> { 
        if(todo.id === id)
        {
          todo.iscompleted = !todo.iscompleted
        }
        return todo
      })
      setTodos(updatedTodos)
    }


    function markAsEditing(id){
      const updatedTodos = todos.map(todo=> { 
        if(todo.id === id)
        {
          todo.isEditing = !todo.isEditing
        }
        return todo
      })
      setTodos(updatedTodos)
    }

    function updateTodo(event, id)
    {
      const updatedTodos = todos.map(todo=> { 
        if(todo.id === id)
        {
          if(event.target.value.trim().length === 0){
            todo.isEditing = false
            return todo;
          }
          todo.title = event.target.value
          todo.isEditing = false 
        }
        return todo
      })
      setTodos(updatedTodos)
    }


    function cancelEdit(id){
      const updatedTodos = todos.map(todo=> { 
        if(todo.id === id)
        {
          todo.isEditing = false
        }
        return todo
      })
      setTodos(updatedTodos)
    }


  return (
    <div className = "appContainer">
      <div className = "todo-app">
          <h2>TODO app</h2>
          <form action = "#" onSubmit={addTodo}>
            <input
              type = "text"
              placeholder = "What do you want to do?"
              className = "todo-input"
              value = {inputTodo}
              onChange={handleInput} 
              />
          </form>
          <div className = "todoListContainer">

            {
              todos.map(todo=>(
                <div key = {todo.id}  className = "todoListRow">
                  <div>
                    <input onChange = {()=>completeTodo(todo.id)} type = "checkbox"   checked = {todo.checked}/>
                  </div>
                  <div className = "todoText">
                    {
                      todo.isEditing ? (
                        <input 
                          defaultValue = {todo.title}
                          type = "text"
                          className = "todo-input"
                          autoFocus
                          onBlur = {(event)=> updateTodo(event , todo.id)}
                          onKeyDown={(event)=> {
                            if(event.key == "Enter")
                            {
                              updateTodo(event, todo.id)
                            }
                            else if(event.key == "Escape")
                            {
                              cancelEdit(todo.id)
                            }
                          }}/>
                      ) : (
                        <h5 onDoubleClick = {()=>markAsEditing(todo.id)} style = {todo.iscompleted ? ({textDecoration : "line-through"}) : null}>{todo.title}</h5>
                      )
                    }
                    
                    
                    
                    
                  </div>
                  <div className = "crossButton">
                    <button
                      className = "deleteButton"
                      onClick={()=> deleteTodo(todo.id)}
                      >
                        X
                    </button>
                  </div>
                </div>
              ))
            }


          </div>
          {/*Check all container*/}
          <div className = "checkallContainer">
            <div>
              {
                allChecked ? (
                  <button >Uncheck All</button>
                ):
                (
                  <button >Check All</button>
                )
              }

            </div>
            <div>
              <p>todos remaining</p>
            </div>
          </div>

          {/*Buttons Container*/}
          <div className = "buttonsContainer">
            <div style = {{display: "flex", flexDirection : "row"}}>
              <button 
                 className ="but">Delete All</button>
              <button className = "but">Active</button>
              <button className = "but">Completed</button>
            </div>
            <div>
              <button className = "but">Clear Completed</button>
            </div>
          </div>
      </div>
    </div>

  );;
}

export default App;
