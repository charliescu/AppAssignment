import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  handleFNameChange = (firstName) => {
    this.setState({ firstName });
  };

  handleLNameChange = (lastName) => {
    this.setState({ lastName });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlPasswordChange = (password) => {
    this.setState({ password });
  };


  createUser = () => {
    const { firstName, lastName, email, password } = this.state;

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password
      })
    })
      .then((response) => {
        Alert.alert('Sign Up Completed');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Sign Up failed');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={this.handleFNameChange}
          value={this.state.firstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={this.handleLNameChange}
          value={this.state.lastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={this.handlPasswordChange}
          value={this.state.pass}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={this.createUser}>
          <Text style={styles.buttonText}>Create Account</Text>
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
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
