import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistTC,
    FilterValueType,
    TodolistDomainType
} from "./Todolist/todolistsReducers";
import {addTaskTC, deleteTaskTC, UpdateTaskTC} from "./Todolist/Tasks/task-reducers";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm";
import Todolist from "./Todolist/Todolist";

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}
export const TodolistsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC({todolistId, taskId}))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {status}))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {title}))
    }, [])

    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(ChangeTodolistTitleTC({todoListId, title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const deleteTodolist = useCallback((todoListId: string) => {
        dispatch(deleteTodolistTC(todoListId))
    }, [])

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItemForm={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((tl) => {
                let taskForTodolist = tasks[tl.id]
                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist title={tl.title}
                                  todolistId={tl.id}
                                  tasks={taskForTodolist}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeFilter={changeFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                                  filter={tl.filter}/>
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}
