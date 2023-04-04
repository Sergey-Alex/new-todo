import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

const App = () => {
    const tasks1 = [
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]
    const [todolists, setTodolist] = useState<Array<TodoListType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState(tasks1);

    const removeTask = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }

    const changeFilter = (filter: FilterValueType, todolistId: string) => {
       setTodolist(todolists.map(tl => tl.id === todolistId ? {...tl, filter}: tl))
    }
    const addTask = (value: string) => {
        let task = {id: v1(), title: value, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, checkedStatus: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: checkedStatus} : task))
    }

    return (
        <div>
            {todolists.map((tl) => {
                let taskForTodolist = tasks
                if (tl.filter === "active") {
                    taskForTodolist = tasks.filter(task => !task.isDone)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = tasks.filter(task => task.isDone)
                }

                return <Todolist title= {tl.title}
                                 todolistId = {tl.id}
                                 key = {tl.id}
                                 tasks={taskForTodolist}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeFilter={changeFilter}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={tl.filter}/>
            })}
        </div>

    );
};

export default App;
