import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

const App = () => {
    const tasks1 = [
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]


    const [tasks, setTasks] = useState(tasks1);
    const [filter, setFilter] = useState<FilterValueType>("all");

    let taskForTodolist = tasks
    if (filter === "active") {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(task => task.isDone)
    }
    const removeTask = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }

    const changeFilter = (filter: FilterValueType) =>{
        setFilter(filter)
    }
    const addTask = (value: string) => {
        let task = {id:v1(), title:value, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

     const  changeTaskStatus = (taskId:string, checkedStatus: boolean) => {
            setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: checkedStatus} : task))
     }

    return (
        <div>
            <Todolist title='What learn'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus = {changeTaskStatus}
            />
        </div>
    );
};

export default App;
