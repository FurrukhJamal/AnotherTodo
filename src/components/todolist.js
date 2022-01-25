import React, {useContext, useState} from "react";
import TodosItemsRemaining from "./todoitemsremaining";
import TodoClearCompleted from "./cleartodocompleted";
import TodoFilters from "./todofilter";
import useToggle from "../hooks/toggle";
import TodosContext from "../context/TodosContext";


function TodoList(props){
    //const [filter, setFilter] = useState("all")
    //const [visibilityOne, setVisibilityOne] = useState(true)
    const [visibilityFeatureOne, setVisibilityFeatureOne] = useToggle()
    const [visibilityFeatureTwo, setVisibilityFeatureTwo] = useToggle()
    const {todos, setTodos, filter, setFilter} = useContext(TodosContext)
    const [allChecked, setAllChecked] = useState(false)
    
    
    // function CompleteAllTodos(){
    //     console.log("completeALLTodos clicked")
    //     const updated = todos.map(todo => {
    //       todo.iscompleted = true
    //       return todo; 
    //     })
    //     setTodos(updated)
    // }


    function setUnsetCompleteAllTodos(value){
        console.log("completeALLTodos clicked")
        const updated = todos.map(todo => {
          todo.iscompleted = value
          return todo; 
        })
        setTodos(updated)
        setAllChecked(prev=> !prev)
    }


    
    
    return(
        <>
            <div className = "todoListContainer">

                {
                props.todosFiltered(filter).map(todo=>(
                <div key = {todo.id}  className = "todoListRow">
                    <div>
                    <input onChange = {()=>props.completeTodo(todo.id)} type = "checkbox"   checked = {todo.iscompleted}/>
                    </div>
                    <div className = "todoText">
                    {
                        todo.isEditing ? (
                        <input 
                            defaultValue = {todo.title}
                            type = "text"
                            className = "todo-input"
                            autoFocus
                            onBlur = {(event)=> props.updateTodo(event , todo.id)}
                            onKeyDown={(event)=> {
                            if(event.key == "Enter")
                            {
                                props.updateTodo(event, todo.id)
                            }
                            else if(event.key == "Escape")
                            {
                                props.cancelEdit(todo.id)
                            }
                            }}/>
                        ) : (
                        <h5 onDoubleClick = {()=>props.markAsEditing(todo.id)} style = {todo.iscompleted ? ({textDecoration : "line-through"}) : null}>{todo.title}</h5>
                        )
                    }
                    
                    
                    
                    
                    </div>
                    <div className = "crossButton">
                    <button
                        className = "deleteButton"
                        onClick={()=> props.deleteTodo(todo.id)}
                        >
                        X
                    </button>
                    </div>
                </div>
                ))
                }


                </div>
                {/* Toggle features container*/}
                <div style = {{padding : 10,}}>
                    <button style = {{marginRight : 10}} onClick = {setVisibilityFeatureOne}>Toggle Feature One</button>
                    <button onClick = {setVisibilityFeatureTwo}>Toggle Feature Two</button>
                </div>
                
                {/*Check all container*/}
                { visibilityFeatureOne && 
                    <div className = "checkallContainer">
                    <div>
                    {
                    allChecked ? (
                        <button onClick = {()=>setUnsetCompleteAllTodos(false) } >Uncheck All</button>
                    ):
                    (
                        // <button onClick = {props.completeAllTodos}>Check All</button>
                        <button onClick = {()=>setUnsetCompleteAllTodos(true)}>Check All</button>
                    )
                    }

                    </div>
                    <div>
                        {/* <TodosItemsRemaining remaining = {props.remaining}/> */}
                        <TodosItemsRemaining/>
                    </div>
                    </div>
                }       
                
                {/*Buttons Container*/}
                {visibilityFeatureTwo && 
                    <div className = "buttonsContainer">
                        <TodoFilters setFilter = {setFilter} filter = {filter}/>
                    <div>
                        {/* <TodoClearCompleted clearCompleted = {props.clearCompleted}/> */}
                        <TodoClearCompleted/>
                    </div>
                    </div>
                }        
            </>
    )
}


export default TodoList;