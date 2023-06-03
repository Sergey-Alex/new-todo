import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemPropsType = {
    addItemForm: (value: string) => void
}
export const AddItemForm = React.memo((props: AddItemPropsType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
        setTitle(e.target.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (error !== null){
                setError(null)
            }
            addTaskTitle()
        }
    }
    const addTaskTitle = () => {
        if (title.trim() !== '') {
            props.addItemForm(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField
            variant='outlined'
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            error={!!error}
            label='Title'
            helperText={error}
        />
        <IconButton  onClick={addTaskTitle}><AddBox/></IconButton>
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>
})