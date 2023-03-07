import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            photo: null
        };
    }

    componentDidMount() {
        this.get_profile_image()
        this.GetUser();
    }

    async get_profile_image() {
        
        const user_id = await AsyncStorage.getItem("whatsthat_user_id");

        fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
            method: "GET",
            headers: {
                "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
            }
        })
            .then((res) => {
                return res.blob()
            })
            .then((resBlob) => {
                let data = URL.createObjectURL(resBlob);

                this.setState({
                    photo: data,
                    isLoading: false
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    async GetUser() {
        const user_id = await AsyncStorage.getItem("whatsthat_user_id");
        console.log("User ID:", user_id);

        return fetch(`http://localhost:3333/api/1.0.0/user/` + user_id, {
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
            <View style={{flex: 1}}>
                {this.state.photo && (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={{uri: this.state.photo}}
                            style={{width: 100, height: 100}}
                        />
                    </View>
                )}
    
                {this.state.user && (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>First Name: {this.state.user.first_name}</Text>
                        <Text>Last Name: {this.state.user.last_name}</Text>
                        <Text>Email: {this.state.user.email}</Text>
                    </View>
                )}
    
                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TakeProfilePicture')}>
                        <Text style={styles.buttonText}>Change Profile Picture</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ChangeDetails',
                        { orig_firstName: this.state.user.first_name, orig_lastName: this.state.user.last_name, orig_email: this.state.user.email })}>
                        <Text style={styles.buttonText}>Change Details</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ConfirmLogout')}>
                        <Text style={styles.buttonText}>Log Out</Text>
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0066CC',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 300,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
