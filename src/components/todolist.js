import React, {useState} from "react";
import TodosItemsRemaining from "./todoitemsremaining";
import TodoClearCompleted from "./cleartodocompleted";
import TodoFilters from "./todofilter";

function TodoList(props){
    const [filter, setFilter] = useState("all")
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
                {/*Check all container*/}
                <div className = "checkallContainer">
                <div>
                {
                props.allChecked ? (
                    <button >Uncheck All</button>
                ):
                (
                    <button onClick = {props.completeAllTodos}>Check All</button>
                )
                }

                </div>
                <div>
                    <TodosItemsRemaining remaining = {props.remaining}/>
                </div>
                </div>

                {/*Buttons Container*/}
                <div className = "buttonsContainer">
                    <TodoFilters setFilter = {setFilter} filter = {filter}/>
                <div>
                    <TodoClearCompleted clearCompleted = {props.clearCompleted}/>
                </div>
                </div>    
            </>
    )
}


export default TodoList;