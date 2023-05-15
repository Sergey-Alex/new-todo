import type {Meta, StoryObj}   from  '@storybook/react';
import  AppWithRedux  from  "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

const  meta: Meta<  typeof  AppWithRedux> = {
    title:   'AppWithRedux',
    component:   AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
};

export default  meta;
type Story = StoryObj<  typeof  AppWithRedux>;
export const  AppWithReduxStory: Story = {}
