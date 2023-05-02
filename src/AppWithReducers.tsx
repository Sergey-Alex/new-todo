// import React, {useReducer, useState} from 'react';
// import Todolist from "./Todolist";
// import {v1} from "uuid";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import {
//     AddTodolistAC,
//     ChangeTodolistFilterAC,
//     ChangeTodolistTitleAC, RemoveTodolistAC,
//     todolistReducers
// } from "./reducers/todolistsReducers";
// import {
//     AddTaskAC,
//     ChangeTaskStatusAC,
//     ChangeTaskTitleAC,
//     REMOVE_TASK,
//     RemoveTaskAC,
//     taskReducers
// } from "./reducers/task-reducers";
//
// export type FilterValueType = 'all' | 'active' | 'completed'
//
// type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type TaskStateType = {
//     [todolistId: string]: TaskType[]
// }
//
// const todolistId1 = v1()
// const todolistId2 = v1()
//
// const App = () => {
//
//     debugger
//     const [todolists, dispatchTodolist] = useReducer(todolistReducers ,[
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'},
//     ])
//
//     const [tasks, dispatchTasks] = useReducer( taskReducers,{
//         [todolistId1]: [
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false}
//         ]
//     });
//
//     const removeTask = (todolistId: string, taskId: string) => {
//         dispatchTasks(RemoveTaskAC(todolistId, taskId))
//     }
//
//     const changeFilter = (todolistId: string, filter: FilterValueType) => {
//
//         dispatchTodolist(ChangeTodolistFilterAC(todolistId, filter))
//     }
//
//     const addTask = (todolistId: string, value: string) => {
//         dispatchTasks(AddTaskAC(todolistId, value))
//     }
//
//     const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
//         dispatchTasks(ChangeTaskStatusAC(todolistId,taskId,isDone))
//     }
//
//     const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
//         dispatchTasks(ChangeTaskTitleAC(todolistId,taskId,value))
//     }
//
//     const changeTodolistTitle = (todolistId: string, title: string) => {
//         dispatchTodolist(ChangeTodolistTitleAC(todolistId,title))
//     }
//
//     const addTodolist = (title: string) => {
//         const action = AddTodolistAC(title)
//         dispatchTodolist(action)
//         dispatchTasks(action)
//     }
//
//     const deleteTodolist = (todolistId: string) => {
//         dispatchTodolist(RemoveTodolistAC(todolistId))
//     }
//
//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style = {{padding:'20px'}}>
//                     <AddItemForm addItemForm={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3} >
//                     {todolists.map((tl) => {
//                         let taskForTodolist = tasks[tl.id]
//
//                         if (tl.filter === "active") {
//                             taskForTodolist = taskForTodolist.filter(task => !task.isDone)
//                         }
//                         if (tl.filter === "completed") {
//                             taskForTodolist = taskForTodolist.filter(task => task.isDone)
//                         }
//                         return <Grid item  key={tl.id}>
//                             <Paper style = {{padding:'10px'}}>
//                                 <Todolist title={tl.title}
//                                           todolistId={tl.id}
//                                           tasks={taskForTodolist}
//                                           removeTask={removeTask}
//                                           addTask={addTask}
//                                           changeFilter={changeFilter}
//                                           changeTaskStatus={changeTaskStatus}
//                                           deleteTodolist={deleteTodolist}
//                                           changeTaskTitle={changeTaskTitle}
//                                           changeTodolistTitle={changeTodolistTitle}
//                                           filter={tl.filter}/>
//                             </Paper>
//                         </Grid>
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     )
//         ;
// };
//
// export default App;
