import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();


export default class Settings extends Component {
    render() {
        const navigation = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
                        <Text style={styles.buttonText}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactManagement')}>
                        <Text style={styles.buttonText}>Contact Management</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Friends')}>
                        <Text style={styles.buttonText}>Friends</Text>
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
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
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
