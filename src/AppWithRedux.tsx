import React, {useCallback, useEffect} from 'react';
import Todolist from "./Todolist";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleTC, deleteTodolistTC,
    fetchTodolistTC,
    FilterValueType,
    TodolistDomainType,
} from "./reducers/todolistsReducers";
import {
    addTaskTC,
    UpdateTaskTC,
    deleteTaskTC,
} from "./reducers/task-reducers";
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
        dispatch(deleteTaskTC({todolistId, taskId}))
    },[])

    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    },[])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    },[])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {status}))
    },[])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {title}))
    },[])

    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(ChangeTodolistTitleTC({todoListId, title}))
    },[])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    },[])

    const deleteTodolist = useCallback((todoListId: string) => {
        dispatch(deleteTodolistTC(todoListId))
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
