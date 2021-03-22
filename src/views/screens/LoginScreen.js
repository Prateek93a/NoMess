import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dimensions from '../../constants/dimensions';
import {LOGIN_URL, USER} from '../../constants/urls';
import MainButton from '../components/MainButton';

export default function LoginScreen() {
    const {setAuthData} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);
    const stateUpdateFuntions = [setEmail, setPassword];

    const handleInputChange = (index, text) => {
        stateUpdateFuntions[index](text);
    };

    const handleLoginClick = async() => {
        setAuthError('');

        let incomplete = false;

        if(!email.length){
            incomplete = true;
            setEmailError('Please fill this field.');
        }

        if(!password.length){
            incomplete = true;
            setPasswordError('Please fill this field.');
        }

        if(incomplete) return;

        setLoading(true);

        try{
            const res = await fetch(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({email: email.trim(), password: password.trim()}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(res.status == 401){
                setAuthError('Invalid credentials. Please try another combination.');
                setLoading(false);  
                return;
            }else if(res.status == 500){
                setAuthError('Some error occured, please retry.');
                setLoading(false);
                return;
            }

            const res_json = await res.json();
            
            const user_raw = await fetch(USER, {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + res_json.key,
                }
            });

            const user = await user_raw.json();
            const data = {
                key: res_json.key,
                name: user.name,
                email: user.email,
                typeAccount: user.typeAccount,
                specialRole: user.specialRole
            };
            await AsyncStorage.setItem('auth-data', JSON.stringify(data));
            setLoading(false);
            setAuthData(data);

        }catch(error){
            console.log(error.message);
            setAuthError('Some error occured, please retry.');
            setLoading(false);
        } 
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
                    autoCapitalize='none'
                    onChangeText={(text) => handleInputChange(0, text)}
                    placeholder='Email'
                    value={email}
                    textContentType='emailAddress'
                    style={styles.textInput}/>
                <Text style={styles.errorMessage}>{emailError}</Text>
                <TextInput
                    onChangeText={(text) => handleInputChange(1, text)}
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password} 
                    placeholder='Password'
                    style={styles.textInput}/>
                <Text style={styles.errorMessage}>{passwordError}</Text>
                <MainButton
                    loading={loading}
                    onPress={handleLoginClick}
                    title='LOGIN'
                />
                {/*<Pressable
                 disabled={loading}
                 onPress={}
                 style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                     {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>LOGIN</Text>}
                </Pressable>*/}
                <Text style={styles.errorMessage}>{authError}</Text>
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
    //button: {
    //    backgroundColor: '#222',
    //    paddingVertical: 20,
    //    alignItems: 'center',
    //    borderRadius: 10,
    //    marginTop: 10,
    //    width: dimensions.WIDTH - 20,
    //},
    //buttonText: {
    //    color: 'white',
    //    fontWeight: 'bold',
    //    fontSize: 15,
    //},
    errorMessage: {
        color: 'red',
        fontSize: 10
    }
})
