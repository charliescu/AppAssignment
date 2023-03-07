import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../settings/Account';
import ChangeDetails from '../settings/ChangeDetails';
import ProfilePicture from './ProfilePicture'

const Stack = createStackNavigator();


export default class SettingsNav extends Component {
    render() {
        return (
                <Stack.Navigator>
                    <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
                    <Stack.Screen name="TakeProfilePicture" component={ProfilePicture} options={{ headerShown: false }}/>
                    <Stack.Screen name="ChangeDetails" component={ChangeDetails} options={{ headerShown: false }}/>
                </Stack.Navigator>
        );
    }
}

