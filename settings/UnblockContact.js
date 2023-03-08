import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class UnblockContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_id: "",
        }
        this.delete = this.delete.bind(this);
      }

    async delete() {
        const { user_id } = this.props.route.params;
        return fetch('http://localhost:3333/api/1.0.0/user/' + user_id + '/block', {
            method: 'DELETE',
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token"),
                'Content-Type': 'application/json'
            }
        })
    .then((response) => {
      if (response.status === 200) {
        this.props.navigation.navigate('BlockedContacts');
        return response.text();
      } else if (response.status === 400) {
        throw 'You cant block yourself';
       }else if (response.status === 401) {
        throw 'Unauthorised';
      } else if (response.status === 404) {
        throw 'Not Found';
      } else {
        throw 'Something went wrong - our bad.';
      }
    })
    .then((response) => {
        console.log("Contact Deleted")
    })
    .catch((error) =>{
      console.log(error);
    });
}

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Are you sure you want to unblock this contact?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.yesButton} onPress={() => this.delete()}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noButton} onPress={() => this.props.navigation.navigate("BlockedContacts", { user_id: item.user_id })}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    yesButton: {
        backgroundColor: '#0066CC',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 120,
        alignItems: 'center',
    },
    noButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});