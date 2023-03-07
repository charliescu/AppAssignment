import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'charlie@test4.com',
      password: 'Test123!!',
    };
  }

  handleEmailInput = (email) => {
    this.setState({ email: email });
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password });
  };

  login = () => {
    const { email, password } = this.state;
  
    // validation
    // return on failure
  
    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Bad email or password'
        } else {
          throw 'Something went wrong - our bad.'
        }
      })
      .then(async (rJson) => {
        console.log(rJson);
        try {
          await AsyncStorage.setItem("whatsthat_user_id", rJson.id);
          await AsyncStorage.setItem("whatsthat_session_token", rJson.token);
  
          this.setState({ "submitted": false });
  
          this.props.navigation.navigate("MainAppNav");
        } catch (error) {
          console.error(error);
          //Alert.alert('Log In Failed');
        }
      });
  };
  

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
