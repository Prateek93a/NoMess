import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Pressable , ActivityIndicator} from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dimensions from '../../constants/dimensions';
import {REGISTER} from '../../constants/urls';
import MainButton from '../components/MainButton';

const passwordRules = "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;";

export default function RegisterScreen({ route, navigation }) {
    const {setAuthData} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [authError, setAuthError] = useState('');
    const stateUpdateFuntions = [setName, setEmail, setPassword, setConfirmPassword];

    const handleInputChange = (index, text) => {
        stateUpdateFuntions[index](text);
    }

    const handleRegisterClick = async() => {
        setNameError('');
        setEmailError('');
        setPasswordError('');

        let incomplete = false;

        if(!name.length){
            incomplete = true;
            setNameError('Please fill this field.');
        }

        if(!email.length){
            incomplete = true;
            setEmailError('Please fill this field.');
        }

        if(!password.length){
            incomplete = true;
            setPasswordError('Please fill this field.');
        }

        if(!confirmPassword.length){
            incomplete = true;
            setPasswordError('Please fill this field.');
        }

        if(confirmPassword.trim() !== password.trim()){
            incomplete = true;
            setPasswordError('Passwords do not match.');
        }

        if(incomplete) return;

        setLoading(true);
        try{
            const res = await fetch(REGISTER, {
                method: 'POST',
                body: JSON.stringify({email: email.trim(),
                                     password1: password.trim(),
                                     password2: confirmPassword.trim(),
                                     name: name.trim(),
                                     typeAccount: route.params.category,
                                    }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(res.status >= 200 && res.status < 300){
                const res_json = await res.json();
                const data = {
                    key: res_json.key,
                    name: name,
                    email: email,
                    typeAccount: route.params.category,
                };
                await AsyncStorage.setItem('auth-data', JSON.stringify(data));
                setLoading(false);
                setAuthData(data);
            } else if(res.status == 400) {
                const res_json = await res.json();
                if(res_json['password1']){
                    setPasswordError('Password too weak! Fill a stronger password.');
                    setLoading(false);
                    return;
                } else {
                    setAuthError('Some internal error occured, please retry.');
                    setLoading(false);
                    return;
                }
            } else {
                setAuthError('Some internal error occured, please retry.');
                setLoading(false);
                return;
            }
       
        }catch(error){
            setAuthError('Some internal error occured, please retry.');
            console.log(error.message);
            setLoading(false);
        } 
    }

    const handleLoginClick = () => {
        navigation.navigate('login');
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
            <View style={styles.header}>
                <View style={{ paddingBottom: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'orange' }}>{route.params.category}</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Registration</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <TextInput 
                onChangeText={(text) => handleInputChange(0, text)}
                value={name}
                placeholder='Name'
                style={styles.textInput} />
                <Text style={styles.errorMessage}>{nameError}</Text>

                <TextInput 
                onChangeText={(text) => handleInputChange(1, text)}
                value={email}
                autoCapitalize='none'
                placeholder='Email'
                style={styles.textInput} />
                <Text style={styles.errorMessage}>{emailError}</Text>

                <TextInput 
                secureTextEntry
                autoCapitalize='none'
                passwordRules={passwordRules}
                onChangeText={(text) => handleInputChange(2, text)}
                value={password} placeholder='Password'
                style={styles.textInput} />
                <Text style={styles.errorMessage}>{passwordError}</Text>

                <TextInput
                 secureTextEntry
                 autoCapitalize='none'
                 passwordRules={passwordRules}
                 onChangeText={(text) => handleInputChange(3, text)}
                 value={confirmPassword} 
                 placeholder='Confirm Password'
                 style={styles.textInput} />
                 <Text style={styles.errorMessage}>{passwordError}</Text>

                 <MainButton
                    loading={loading}
                    onPress={handleRegisterClick}
                    title='REGISTER'
                />
                <Text style={styles.errorMessage}>{authError}</Text>
            </View>
            <View style={styles.logintextview}>
                <Text style={{ color: '#555' }}>Already have an account? </Text>
                <TouchableOpacity onPress={handleLoginClick}>
                    <Text style={styles.logintext}>Login here.</Text>
                </TouchableOpacity>
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
    errorMessage: {
        color: 'red',
        fontSize: 10
    }
})
