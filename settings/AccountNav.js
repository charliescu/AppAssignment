import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../settings/Account';
import ChnageDetails from '../settings/ChangeDetails';


const Stack = createStackNavigator();


export default class SettingsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
                    <Stack.Screen name="ChangeDetails" component={ChnageDetails} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

