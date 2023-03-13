import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
    };
  }

  componentDidMount() {
    this.GetChats()
  }

  async GetChats() {
    return fetch(`http://localhost:3333/api/1.0.0/chat`, {
      method: 'GET',
      headers: {
        "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
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
        this.setState({ chat: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddChat')}>
            <Text style={styles.buttonText}>Start a Chat</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.chat}
          renderItem={({ item }) => (
            <View style={styles.contactContainer}>
              <View style={styles.contactInfoContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleChat', { chat_id: item.chat_id})}>
                <Text style={styles.nameText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    marginBottom: 10,
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
  contactInfoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    width: 350,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});