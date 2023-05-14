import React, {useCallback} from 'react';
import Todolist from "./Todolist";

import './App.css'
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC
} from "./reducers/todolistsReducers";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC
} from "./reducers/task-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}
const App = () => {
    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    },[])

    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    },[])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(AddTaskAC(todolistId, value))
    },[])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
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
