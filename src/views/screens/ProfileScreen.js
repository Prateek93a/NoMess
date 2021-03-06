import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_URL} from '../../constants/urls';

export default function ProfileScreen() {
    const [loading, setLoading] = useState(false);
    const {setAuthData, authData} = useContext(AuthContext);

    const handleLogout = async() => {
        setLoading(true);
        await fetch(LOGOUT_URL, {
            headers: {
                'Authorization': 'Bearer ' + authData.key,
            }
        });
        await AsyncStorage.removeItem('auth-data');
        setLoading(false);  
        setAuthData(null);
    }

    return (
        <View>
              <Pressable
                onPress={handleLogout}
                style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                    {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>LOGOUT</Text>}
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
})