import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import TodoForm from "./components/todoforum";
import TodoList from "./components/todolist";
import useLocalStorage from "./hooks/localstorage"
import TodosContext from './context/TodosContext';

function App() {
  const nameInputEl = useRef(null)
  //const[name, setName] = useState("")
  const [name, setName] = useLocalStorage("name", "") //key, intitialValue
  const [todos, setTodos] = useLocalStorage("todos", [])
  const [filter, setFilter] = useState("all") 
  // const [todos, setTodos] = useState([
  //   {
  //     id : 1,
  //     title : "Go to groceries",
  //     iscompleted : false,
  //     isEditing : false,

  //   },
  //   {
  //     id : 2,
  //     title : "Finish work",
  //     iscompleted : true,
  //     isEditing : false,

  //   },
  //   {
  //     id : 3,
  //     title : "Go to die",
  //     iscompleted : false,
  //     isEditing : false,

  //   },])

    const [allChecked, setAllChecked] = useState(false)
    // const [inputTodo, setInputTodo] = useState("")
    const[idForTodo, setidForTodo] = useState(4)
    

    // function handleInput(e){
    //   setInputTodo(e.target.value)
    // }

    // function addTodo(todo){
    //   // e.preventDefault()
    //   // if(inputTodo.trim().length === 0){
    //   //   return;
    //   // }
    //   setTodos([...todos, {
    //     id : idForTodo,
    //     title: todo,
    //     iscompleted : false
    //   }])
    //   //setInputTodo("")
    //   setidForTodo(previous=>previous + 1)
    // }

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

  // function remaining(){
  //   return todos.filter(todo=> !todo.iscompleted).length
  // }


  // function remainingTest(){
  //   //to display usage of useMemo
  //   for(let i = 0; i < 2000000000; i++){}
  //   return todos.filter(todo=> !todo.iscompleted).length
  // }


  // function clearCompleted(){
  //   console.log("clear completed kicked in")
  //   setTodos([...todos].filter(todo=> !todo.iscompleted))
  // }


  // function completeAllTodos(){
  //   console.log("completeALLTodos clicked")
  //   const updated = todos.map(todo => {
  //     todo.iscompleted = true
  //     return todo; 
  //   })
  //   setTodos(updated)
  // }


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

  //const remainingTodos = useMemo(remainingTest, [todos])

  useEffect(()=>{
    nameInputEl.current.focus()
    //get the name from local storage
    setName(JSON.parse(localStorage.getItem("name")) ?? "")
  }, [])


  function handleNameInput(event){
    setName(event.target.value)
    //localStorage.setItem("name", JSON.stringify(event.target.value))
    
  }

  return (
    <TodosContext.Provider value = {{todosFiltered,filter, setFilter, todos, setTodos, idForTodo, setidForTodo}}>
      <div className = "appContainer">
        <div className = "todo-app">
          <div>
                
                <h1>Enter Name</h1>
                <form action = "#">
                    <input 
                        ref = {nameInputEl}
                        className = "todo-input"
                        type = "text"
                        placeholder = "ENter Your Name"
                        value = {name}
                        onChange = {handleNameInput}/>

                </form>
                {name && <p>Hello, {name}</p>}
            </div>
            <h2>TODO app</h2>
            {/* <TodoForm addtodo = {addTodo}/> */}
            <TodoForm />
            
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
                  // remaining = {remaining} 
                  //clearCompleted = {clearCompleted}
                  //completeAllTodos = {completeAllTodos}
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
    </TodosContext.Provider>

  );;
}

export default App;
