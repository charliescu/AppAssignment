import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountNav from '../Settings/AccountNav';
import Friends from '../Settings/Friends';
import Settings from '../Settings/settings';
import BlockedContacts from '../Settings/BlockedContacts';
import UnblockContact from '../Settings/UnblockContact';


const Stack = createStackNavigator();


export default class SettingsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
                    <Stack.Screen name="Account" component={AccountNav} options={{ headerShown: false }}/>
                    <Stack.Screen name="BlockedContacts" component={BlockedContacts} options={{ headerShown: false }}/>
                    <Stack.Screen name="Friends" component={Friends} options={{ headerShown: false }}/>
                    <Stack.Screen name="UnblockContact" component={UnblockContact} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

