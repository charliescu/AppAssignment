import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contact from '../Contacts/Contact';
import AddContact from '../Contacts/AddContact';

const Stack = createStackNavigator();


export default class ContactsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
                    <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

