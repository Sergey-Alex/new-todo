import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, value: string) => void
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
}


const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todolistId)
    }
    const todolistRemoveHandler = () => {
        props.deleteTodolist(props.todolistId)
    };

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title )
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={todolistRemoveHandler}>✖️</button>
            <AddItemForm addItemForm={addTask} />
            <ul>
                {
                    props.tasks.map(task => {
                        const removeHandler = () => props.removeTask(props.todolistId, task.id)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                {task.title}
                                <button onClick={removeHandler}>✖️</button>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );

}
export default Todolist;


