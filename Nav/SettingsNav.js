import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountNav from '../settings/AccountNav';
import Friends from '../settings/Friends';
import Settings from '../settings/settings';
import Contact from '../settings/Contact';


const Stack = createStackNavigator();


export default class SettingsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
                    <Stack.Screen name="Account" component={AccountNav} options={{ headerShown: false }}/>
                    <Stack.Screen name="ContactManagement" component={Contact} options={{ headerShown: false }}/>
                    <Stack.Screen name="Friends" component={Friends} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

