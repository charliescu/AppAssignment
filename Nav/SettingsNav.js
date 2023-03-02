import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../settings/Account';
import ContactManagement from '../settings/ContactManagement';
import Friends from '../settings/Friends';
import Settings from '../settings/settings';


const Stack = createStackNavigator();


export default class SettingsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
                    <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
                    <Stack.Screen name="ContactManagement" component={ContactManagement} options={{ headerShown: false }}/>
                    <Stack.Screen name="Friends" component={Friends} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

