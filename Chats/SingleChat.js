import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class SingleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                this.setState({ chat: data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { name, creator } = this.state.chat;
        return (
          <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{creator.first_name} {creator.last_name}</Text>
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
