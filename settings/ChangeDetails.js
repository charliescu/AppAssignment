import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ChangeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount(){
        const { orig_firstName, orig_lastName, orig_email } = this.props.route.params;
        this.setState({
            firstName: orig_firstName,
            lastName: orig_lastName,
            email: orig_email
        });
    }
    

    handleFNameChange(firstName) {
        this.setState({ firstName });
    };
    
    handleLNameChange(lastName) {
        this.setState({ lastName });
    };
    
    handleEmailChange(email) {
        this.setState({ email });
    };
    
    handlePasswordChange(password) {
        this.setState({ password });
    };
    

    async updateUser() {
        const { firstName, lastName, email, password } = this.state;
        const { orig_firstName, orig_lastName, orig_email } = this.props.route.params;


        const user_id = await AsyncStorage.getItem("whatsthat_user_id");
        const updatedFields = {};

        if (firstName !== orig_firstName) {
            updatedFields.first_name = firstName;
        }
        if (lastName !== orig_lastName) {
            updatedFields.last_name = lastName;
        }
        if (email !== orig_email) {
            updatedFields.email = email;
        }
        if (password !== '') {
            updatedFields.password = password;
        }
        

        console.log(updatedFields)
        this.props.navigation.navigate('Account');

        return fetch(`http://localhost:3333/api/1.0.0/user/` + user_id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
            "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token") 
        },
            
            body: JSON.stringify(updatedFields)
        })
            .then((response) => {
                Alert.alert('Update Completed');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Update failed');
                ;
            })
    };

    render() {
        //const { firstName, lastName, email, password } = this.props.route.params;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(fname) => this.handleFNameChange(fname)}
                    value={this.state.firstName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={(lname) => this.handleLNameChange(lname)}
                    value={this.state.lastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(email) => this.handleEmailChange(email)}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(pass) => this.handlePasswordChange(pass)}
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={this.updateUser}>
                    <Text style={styles.buttonText}>Update Account</Text>
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
