import {useEffect, useState} from "react";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}



export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolistAll()
        .then(res => setState(res))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('Some title').then(res => setState(res))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5694b6d1-4b77-42a0-a239-89c401672685'
    useEffect(() => {
      todolistApi.deleteTodolist(todolistId)
            .then(res => setState(res))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = `c8f7954d-93bb-4005-b62a-5cfadc31e56a`
    useEffect(() => {
        todolistApi.updateTodolist(todolistId, 'SOME SOME ').then(res => setState(res))
    },[])
    return <div>{JSON.stringify(state)}</div>
}