import React, {useCallback, useEffect} from 'react';
import Todolist from "./Todolist";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    fetchTodolistTC,
    FilterValueType,
    RemoveTodolistAC,
    TodolistDomainType,
} from "./reducers/todolistsReducers";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./reducers/task-reducers";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./reducers/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TaskStateType = {
    [todolistId: string]: TaskType[]
}
const App = () => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    },[])

    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    },[])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(AddTaskAC(todolistId, value))
    },[])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
    },[])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, value: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, value))
    },[])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    },[])

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    },[])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    },[])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    )
        ;
};

export default App;
