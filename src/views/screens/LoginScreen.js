import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import dimensions from '../../constants/dimensions';
import {LOGIN_URL} from '../../constants/urls';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const stateUpdateFuntions = [setEmail, setPassword];

    const handleInputChange = (index, text) => {
        stateUpdateFuntions[index](text);
    };

    const handleLoginClick = async() => {
        if(!email.length && !password.length){
            setEmailError('Please fill this field.');
            setPasswordError('Please fill this field.');
            return;
        }

        if(!email.length){
            setEmailError('Please fill this field.');
            return;
        }

        if(!password.length){
            setPasswordError('Please fill this field.');
            return;
        }

        setLoading(true);
        // todo: handle errors better, avoid using Alert
        try{
            const res = await fetch(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({email: email.trim(), password: password.trim()}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res_json = await res.text();

            Alert.alert(res_json);
        }catch(error){
            console.log(error.message);
        } 

        setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
            <View style={styles.header}>
                <View style={{ paddingBottom: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'orange' }}>Mess</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Login</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <TextInput 
                    onChangeText={(text) => handleInputChange(0, text)}
                    placeholder='Email'
                    value={email}
                    textContentType='emailAddress'
                    style={styles.textInput}/>
                <Text style={styles.errorMessage}>{emailError}</Text>
                <TextInput
                    onChangeText={(text) => handleInputChange(1, text)}
                    secureTextEntry
                    textContentType='password'
                    value={password} 
                    placeholder='Password'
                    style={styles.textInput}/>
                <Text style={styles.errorMessage}>{passwordError}</Text>
                <Pressable
                 disabled={loading}
                 onPress={handleLoginClick}
                 style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                     {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>LOGIN</Text>}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        marginBottom: 10,
        marginTop: 10
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dimensions.WIDTH - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    errorMessage: {
        color: 'red',
        fontSize: 10
    }
})
