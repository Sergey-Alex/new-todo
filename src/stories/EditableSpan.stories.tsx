import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../components/EditableSpan";

const meta: Meta<typeof EditableSpan> = {
    title: 'EditableSpan',
    component: EditableSpan
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
    args: {
        onChangeValue: action('Value EditableSpan changed')
    }
}
