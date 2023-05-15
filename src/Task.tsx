import {TaskType} from "./AppWithRedux";
import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type PropsTaskType = {
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    task: TaskType
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}
export const Task = React.memo((props: PropsTaskType) => {
    const removeHandler = () => props.removeTask(props.todolistId, props.task.id)
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }, [props.todolistId, props.task.id])
    const changeTaskTitle = useCallback((value: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, value)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    return (
        <span key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
                                <EditableSpan title={props.task.title} onChangeValue={changeTaskTitle}/>
                                <IconButton onClick={removeHandler}><Delete/>️</IconButton>
                                <Checkbox
                                    color='primary'
                                    checked={props.task.isDone}
                                    onChange={changeTaskStatus}/>
                            </span>
    )
})