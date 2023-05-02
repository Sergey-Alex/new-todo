//@ts-ignore
// import React, {useState} from 'react';
// import Todolist from "./Todolist";
// import {v1} from "uuid";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import Box from '@mui/material/Box';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
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
//     const [todolists, setTodolist] = useState<TodoListType[]>([
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'},
//     ])
//
//     const [tasks, setTasks] = useState<TaskStateType>({
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
//         setTasks({...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== taskId)]})
//     }
//
//     const changeFilter = (todolistId: string,filter: FilterValueType) => {
//         setTodolist(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
//     }
//
//     const addTask = (todolistId: string, value: string) => {
//         let task = {id: v1(), title: value, isDone: false}
//         setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
//     }
//
//     const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
//         setTasks({...tasks, [todolistId]: [...tasks[todolistId]].map(t => t.id === taskId ? {...t, isDone} : t)})
//     }
//
//     const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
//         setTasks({...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? {...t, title: value} : t)]})
//     }
//
//     const changeTodolistTitle = (todolistId: string, title: string) => {
//         setTodolist(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
//     }
//
//     const addTodolist = (title: string) => {
//         let todolist: TodoListType = {id: v1(), title, filter: 'all'}
//         setTodolist([todolist, ...todolists])
//         setTasks({
//             ...tasks,
//             [todolist.id]: []
//         })
//     }
//
//     const deleteTodolist = (todolistId: string) => {
//         setTodolist(todolists.filter(tl => tl.id !== todolistId))
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
