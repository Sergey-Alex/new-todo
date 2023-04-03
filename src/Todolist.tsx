import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (value: string) => void
    changeFilter: (filter: FilterValueType) => void
    changeTaskStatus: (id: string,checkedStatus: boolean ) => void
    filter: FilterValueType
}
type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}


const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTaskTitle = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.target.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskTitle()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskTitle}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeHandler = () => props.removeTask(task.id)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
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
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );

}
export default Todolist;