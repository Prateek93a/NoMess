import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LOGOUT_URL} from '../../constants/urls';

export default function ProfileScreen({navigation}) {
    const [loading, setLoading] = useState(false);
    const {setAuthData, authData} = useContext(AuthContext);
    const {name, email, typeAccount, specialRole} = JSON.parse(authData);

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
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.headerButtons}>
                <Icon.Button onPress={navigation.goBack} name='arrow-left' size={20} backgroundColor='white' color='black'/>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
                </View>
                <View>
                    <Text>Email: {email}</Text>
                </View>
                <View>
                    <Text>Account Type: {typeAccount}</Text>
                </View>
                <View>
                    <Text>Special Role: {specialRole}</Text>
                </View>
              <Pressable
                onPress={handleLogout}
                style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                    {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>LOGOUT</Text>}
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    body: {
        alignItems: 'center'
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