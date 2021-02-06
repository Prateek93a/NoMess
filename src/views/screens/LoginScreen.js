import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Alert, Pressable } from 'react-native';
import dimensions from '../../constants/dimensions';

export default function LoginScreen() {
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
                <TextInput placeholder='Email' style={styles.textInput}></TextInput>
                <TextInput secureTextEntry placeholder='Password' style={styles.textInput}></TextInput>
                <Pressable
                 onPress={() => Alert.alert('Simple Button pressed')}
                 style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                    <Text style={styles.buttonText}>LOGIN</Text>
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
        marginBottom: 10
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
