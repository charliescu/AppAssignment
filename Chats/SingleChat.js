import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class SingleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chat: [],
        };
    }

    componentDidMount() {
        this.getSingleChat()
    }

    async getSingleChat() {
        const { chat_id } = this.props.route.params;
        console.log(`http://localhost:3333/api/1.0.0/chat/` + chat_id)
        return fetch(`http://localhost:3333/api/1.0.0/chat/` + chat_id, {
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
                this.setState({
                    isLoading: false,
                    chat: data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { name, creator } = this.state.chat;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        }else{
        console.log(this.state.chat)
        return (
            
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{name}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SingleChatInfo', { chat_id: this.state.chat.chat_id})}>
                        <Text style={styles.buttonText}>Button</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'lightblue',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#007aff',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});