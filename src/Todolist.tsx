import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType} from "./reducers/todolistsReducers";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, value: string) => void
    changeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValueType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


const Todolist = React.memo((props: PropsType) => {
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'all')
    }, [props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'active')
    }, [props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'completed')
    }, [props.todolistId])
    const todolistRemoveHandler = useCallback(() => {
        props.deleteTodolist(props.todolistId)
    }, [props.todolistId]);

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const changeTodolistTitle = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    },[props.todolistId])

    let taskForTodolist = props.tasks
    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeValue={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={todolistRemoveHandler}><Delete/></IconButton>
            <AddItemForm addItemForm={addTask}/>
            <ul>
                {
                    taskForTodolist.map(task => <Task
                        removeTask={props.removeTask}
                        todolistId={props.todolistId}
                        changeTaskStatus={props.changeTaskStatus}
                        task={task}
                        changeTaskTitle={props.changeTaskTitle}
                        key={task.id} />
                    )
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color='inherit'
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color="primary"

                >
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );

})
export default Todolist;

