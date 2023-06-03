import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm'
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof AddItemForm> ={
    title: 'AddItemForm',
    component: AddItemForm
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
    args: {
        addItemForm: action('Button clicked inside form')
    }
}