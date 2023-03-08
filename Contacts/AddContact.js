import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
    }
    this.AddContact = this.AddContact.bind(this);
  }

  async AddContact() {
    const user_id = this.state.user_id.trim();

    if (user_id.length > 0) {
      return fetch('http://localhost:3333/api/1.0.0/user/' + user_id + '/contact', {
        method: 'POST',
        headers: {
          "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.text();
          } else if (response.status === 400) {
            throw 'Cant Add Yourself';
          } else if (response.status === 401) {
            throw 'Unorthorized';
          } else if (response.status === 404) {
            throw 'Not Found';
          } else {
            throw 'Something went wrong - our bad.';
          }
        })
        .then((data) => {
          console.log(data);
          this.props.navigation.navigate('Contact');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please enter a valid user id");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(user_id) => this.setState({ user_id })}
          value={this.state.user_id}
          placeholder="Enter User ID"
        />
        <TouchableOpacity style={styles.button} onPress={this.AddContact}>
          <Text style={styles.buttonText}>Add Contact</Text>
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
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
