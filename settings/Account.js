import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    async GetUser() {
        const user_id = await AsyncStorage.getItem("whatsthat_user_id");
        console.log("User ID::", user_id);

        return fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
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
                this.setState({ user: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.GetUser();
    }


    async logout() {
        console.log("Logout")

        return fetch('http://localhost:3333/api/1.0.0/logout', {
            method: 'POST',
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
            }
        })
            .then(async (Response) => {
                if (Response.status === 200) {
                    await AsyncStorage.removeItem("whatsthat_session_token")
                    await AsyncStorage.removeItem("whatsthat_user_id")
                    this.props.navigation.navigate("Login")
                } else if (Response.status === 401) {
                    console.log("Unauthorised")
                    await AsyncStorage.removeItem("whatsthat_session_token")
                    await AsyncStorage.removeItem("whatsthat_user_id")
                    this.props.navigation.navigate("Login")
                } else {
                    throw "Something went wrong"
                }
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.user && (
                    <View style={styles.userContainer}>
                        <Text>User ID: {this.state.user.user_id}</Text>
                        <Text>First Name: {this.state.user.first_name}</Text>
                        <Text>Last Name: {this.state.user.last_name}</Text>
                        <Text>Email: {this.state.user.email}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeDetails')}>
                    <Text style={styles.buttonText}>Chanage Details</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0066CC',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 400,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
