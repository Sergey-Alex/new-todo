import {useEffect, useState} from "react";
import {TaskPriorities, TaskStatuses, todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolistAll()
            .then(res => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistApi.createTodolist(title).then(res => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder='title' value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistApi.deleteTodolist(todolistId)
            .then(res => setState(res))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const changeTodolistTitle = () => {
        todolistApi.updateTodolist(todolistId, title).then(res => setState(res))
    }


    return <div>{JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder='todolistId' value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={changeTodolistTitle}>change title </button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState<string>('')
    const getTask = () => {
        todolistApi.getTasks(todolistId).then(res => setState(res))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTask}>get task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId).then(res => setState(res))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder='taskId' value={taskId}
                   onChange={event => setTaskId(event.currentTarget.value)}/>
            <button onClick={deleteTask}>DeleteTask</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

  const createTask = () => {
      todolistApi.createTask(todolistId, title).then(res => setState(res))
  }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const changeTaskTitle = () => {

        todolistApi.updateTask(todolistId, taskId, {title: 'fdgdfg', status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Hi, description: '', deadline: '',completed: false}).then(res => setState(res))
    }
    return <div>{JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={changeTaskTitle}>change task</button>
    </div>
}