import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contact from '../Contacts/Contact';
import AddContact from '../Contacts/AddContact';
import DeleteContact from '../Contacts/DeleteContact';
import BlockContact from '../Contacts/BlockContact';


const Stack = createStackNavigator();


export default class ContactsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
                    <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }}/>
                    <Stack.Screen name="DeleteContact" component={DeleteContact} options={{ headerShown: false }}/>
                    <Stack.Screen name="BlockContact" component={BlockContact} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

