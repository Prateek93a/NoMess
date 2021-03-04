import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Alert, TouchableOpacity, Pressable , ActivityIndicator} from 'react-native';
import dimensions from '../../constants/dimensions';
import {REGISTER} from '../../constants/urls';

const passwordRules = "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;";

export default function RegisterScreen({ route, navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
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

        //if(incomplete) return;

        setLoading(true);
        // todo: handle errors better, avoid using Alert
        try{
            const res = await fetch(REGISTER, {
                method: 'POST',
                body: JSON.stringify({email: email.trim(),
                                     password1: password.trim(),
                                     password2: confirmPassword.trim(),
                                     name: name.trim(),
                                     typeAccount: "string",
                                     specialRole: "string",
                                    }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res_json = await res.json();

            console.log(res_json)
        }catch(error){
            console.log(error.message);
        } 

        setLoading(false);
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
                placeholder='Email'
                style={styles.textInput} />
                <Text style={styles.errorMessage}>{emailError}</Text>

                <TextInput 
                secureTextEntry
                passwordRules={passwordRules}
                onChangeText={(text) => handleInputChange(2, text)}
                value={password} placeholder='Password'
                style={styles.textInput} />
                <Text style={styles.errorMessage}>{passwordError}</Text>

                <TextInput
                 secureTextEntry
                 passwordRules={passwordRules}
                 onChangeText={(text) => handleInputChange(3, text)}
                 value={confirmPassword} 
                 placeholder='Confirm Password'
                 style={styles.textInput} />
                 <Text style={styles.errorMessage}>{passwordError}</Text>

                <Pressable
                 onPress={handleRegisterClick}
                 disabled={loading}
                 style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                    {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>REGISTER</Text>}
                </Pressable>
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
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dimensions.WIDTH-20,
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
