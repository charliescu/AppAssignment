import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '../Chats/Chats';
import AddChat from '../Chats/AddChat';
const Stack = createStackNavigator();


export default class ChatsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }}/>
                    <Stack.Screen name="AddChat" component={AddChat} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

