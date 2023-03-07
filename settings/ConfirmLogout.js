import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class ConfirmLogout extends Component {
    constructor(props) {
        super(props);
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
                <Text style={styles.text}>Are you sure you want to log out?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.yesButton} onPress={() => this.logout()}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noButton} onPress={() => this.props.navigation.navigate("Account")}>
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