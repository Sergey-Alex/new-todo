import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from '../Task';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const meta: Meta<typeof Task> = {
    title: 'Task',
    component: Task,
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', status: TaskStatuses.New, description: '', addedDate: '', startDate: '', completed: false, deadline: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
    },
};
