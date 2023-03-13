import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsNav from '../Nav/SettingsNav';
import ContactNav from '../Nav/ContactNav';
import ChatsNav from '../Nav/ChatsNav';

const Tab = createBottomTabNavigator();

export default class MainAppNav extends Component {
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        if (value == null) {
            this.props.navigation.navigate("LogInForm");
            console.log("Signed Out");
        }
    };

    render() {
        return (
                <Tab.Navigator>
                    <Tab.Screen name="Chats" component={ChatsNav} />
                    <Tab.Screen name="User" component={ContactNav} />
                    <Tab.Screen name="Settings" component={SettingsNav} />
                </Tab.Navigator>
        );
    }
}
