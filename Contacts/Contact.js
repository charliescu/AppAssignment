import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    this.GetContact()
  }

  async GetContact() {
    return fetch(`http://localhost:3333/api/1.0.0/contacts`, {
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
          throw 'Error message';
        } else {
          throw 'Something went wrong - our bad.';
        }
      })
      .then((data) => {
        this.setState({ contacts: data });
        // this.GetContact();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddContact')}>
            <Text style={styles.buttonText}>Add a Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BlockContact')}>
            <Text style={styles.buttonText}>Block a Contact</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View style={styles.contactContainer}>
              <View style={styles.contactInfoContainer}>
                <Text style={styles.nameText}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.emailText}>{item.email}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText} onPress={() => this.props.navigation.navigate("DeleteContact", { user_id: item.user_id })}>X</Text>
              </TouchableOpacity>
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
