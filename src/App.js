import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TodoForm from "./components/todoforum";
import TodoList from "./components/todolist";

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
    // const [inputTodo, setInputTodo] = useState("")
    const[idForTodo, setidForTodo] = useState(4)

    // function handleInput(e){
    //   setInputTodo(e.target.value)
    // }

    function addTodo(todo){
      // e.preventDefault()
      // if(inputTodo.trim().length === 0){
      //   return;
      // }
      setTodos([...todos, {
        id : idForTodo,
        title: todo,
        iscompleted : false
      }])
      //setInputTodo("")
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

  function remaining(){
    return todos.filter(todo=> !todo.iscompleted).length
  }


  function clearCompleted(){
    console.log("clear completed kicked in")
    setTodos([...todos].filter(todo=> !todo.iscompleted))
  }


  function completeAllTodos(){
    console.log("completeALLTodos clicked")
    const updated = todos.map(todo => {
      todo.iscompleted = true
      return todo; 
    })
    setTodos(updated)
  }


  function todosFiltered(filter)
  {
    if (filter === "all")
    {
      return todos
    }
    else if(filter === "active")
    {
      return todos.filter(todo=> !todo.iscompleted)
    }
    else if(filter === "completed")
    {
      return todos.filter(todo => todo.iscompleted)
    }
  }


  return (
    <div className = "appContainer">
      <div className = "todo-app">
          <h2>TODO app</h2>
          <TodoForm addtodo = {addTodo}/>
          
          {
            todos.length > 0 ? (
              <TodoList 
                todos = {todos}
                completeTodo = {completeTodo}
                updateTodo = {updateTodo}
                cancelEdit = {cancelEdit}
                markAsEditing = {markAsEditing}
                deleteTodo = {deleteTodo}
                allChecked = {allChecked}
                remaining = {remaining}
                clearCompleted = {clearCompleted}
                completeAllTodos = {completeAllTodos}
                todosFiltered = {todosFiltered}
                />
            ) : (
                <div>
                  <p>Add a Todo</p>
                </div>
            )
          }
          
          
          
          
      </div>
    </div>

  );;
}

export default App;
