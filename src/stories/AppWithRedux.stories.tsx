import type {Meta, StoryObj} from '@storybook/react';

import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import App from "../app/App";

const meta: Meta<typeof App> = {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;
export const AppStory: Story = {}
