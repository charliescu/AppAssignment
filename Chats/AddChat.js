import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class AddChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
    this.AddChat = this.AddChat.bind(this);
  }

  async AddChat() {
    const { name } = this.state;
      return fetch('http://localhost:3333/api/1.0.0/chat', {
        method: 'POST',
        headers: {
          "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
        })

      })
      .then((response) => {
        if (response.status === 201) {
          this.props.navigation.navigate('Chats');
          return response.json();
        } else if (response.status === 400) {
          throw 'Cant Add Yourself';
        } else if (response.status === 401) {
          throw 'Unauthorized';
        } else if (response.status === 404) {
          throw 'Not Found';
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Chat Name"
        />
        <TouchableOpacity style={styles.button} onPress={this.AddChat}>
          <Text style={styles.buttonText}>New Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '85%',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});
