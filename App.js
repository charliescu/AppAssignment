import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import MainAppNav from './Components/MainAppNav';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MainAppNav" component={MainAppNav} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
