import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';

const { width: dWidth } = Dimensions.get('screen');

export default function RegisterScreen({ route, navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const stateUpdateFuntions = [setEmail, setPassword, setConfirmPassword]

    const handleInputChange = (index, text) => {
        stateUpdateFuntions[index](text);
    }

    const handleLoginClick = () => {
        navigation.navigate('login');
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'orange' }}>{route.params.category}</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Registration</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <TextInput onChangeText={(text) => handleInputChange(0, text)} value={email} placeholder='Email' style={style.textInput}></TextInput>
                <TextInput secureTextEntry passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;" onChangeText={(text) => handleInputChange(1, text)} value={password} placeholder='Password' style={style.textInput}></TextInput>
                <TextInput secureTextEntry passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;" onChangeText={(text) => handleInputChange(2, text)} value={confirmPassword} placeholder='Confirm Password' style={style.textInput}></TextInput>
                <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')} style={style.button}>
                    <Text style={style.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={style.logintextview}>
                <Text style={{ color: '#555' }}>Already have an account? </Text>
                <TouchableOpacity onPress={handleLoginClick}>
                    <Text style={style.logintext}>Login here.</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    textInput: {
        backgroundColor: '#efefef',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    logintextview: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logintext: {
        color: 'orange',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dWidth - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
})
