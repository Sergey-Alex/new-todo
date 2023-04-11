import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addItemForm: (value: string) => void
}
export const AddItemForm = (props: AddItemPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.target.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTaskTitle}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}