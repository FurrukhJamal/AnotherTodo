import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import TodoForm from "./components/todoforum";
import TodoList from "./components/todolist";
import useLocalStorage from "./hooks/localstorage"
import TodosContext from './context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  const nameInputEl = useRef(null)
  const [name, setName] = useLocalStorage("name", "") //key, intitialValue
  const [todos, setTodos] = useLocalStorage("todos", [])
  const [filter, setFilter] = useState("all") 
  const [allChecked, setAllChecked] = useState(false)
  const[idForTodo, setidForTodo] = useLocalStorage("idForTodo", 1)




  function todosFiltered()
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
                {/* {name && <p>Hello, {name}</p>} */}
                <CSSTransition in={name.length > 0} classNames = "slide-verticle" timeout = {500} unmountOnExit>
                  <p>Hello, {name}</p>
                </CSSTransition>
            </div>
            <h2>TODO app</h2>
            {/* <TodoForm addtodo = {addTodo}/> */}
            <TodoForm />
            
            {
              // todos.length > 0 ? (
              //   <TodoList todosFiltered = {todosFiltered}/>
              // ) : (
              //     <div>
              //       <p>Add a Todo</p>
              //     </div>
              // )
            }
            
            {/* <CSSTransition in={todos.length > 0} timeout = {300} classNames = "slide-horizontal" unmountOnExit>
              <TodoList todosFiltered = {todosFiltered}/>
            </CSSTransition>

            <CSSTransition in={todos.length === 0} timeout = {300} unmountOnExit classNames = "slide-horizontal">
              <div>
                <p>Add a Todo</p>
              </div>
            </CSSTransition> */}
            <SwitchTransition mode= "out-in">
              <CSSTransition key = {todos.length > 0} timeout = {400} classNames = "slide-horizontal">
              {
                todos.length > 0 ? (
                  <TodoList todosFiltered = {todosFiltered}/>
                ) : (
                    <div>
                      <p>Add a Todo</p>
                    </div>
                )
              }   
              </CSSTransition>

            </SwitchTransition>


            
            
        </div>
      
    </TodosContext.Provider>

  );;
}

export default App;
