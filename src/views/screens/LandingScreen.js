import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
const { width: dWidth } = Dimensions.get('screen');
export default function LandingScreen({ navigation }) {
    const buttonHandler = (screen) => {
        navigation.navigate(screen);
    }
    return (
        <View style={styles.container}>
            <Image style={{ height: 120, width: 120, resizeMode: 'contain' }} source={{ uri: 'https://i.ibb.co/P15btbH/logo.png' }} />
            <Text style={styles.text}>Your assistant to effective mess management</Text>
            <Image style={{ height: 250, width: 300, resizeMode: 'contain', marginTop: 30 }} source={{ uri: 'https://i.ibb.co/jh52DPT/eat.png' }} />

            <TouchableOpacity onPress={() => buttonHandler('onboarding')} style={styles.button}>
                <Text style={styles.buttonText}>Show Me How</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => buttonHandler('category')} style={styles.button2}>
                <Text style={styles.buttonText2}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FCF6D7',
        padding: 5,
        paddingTop: 20
    },
    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333'
    },
    text: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: dWidth - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    button2: {
        backgroundColor: 'transparent',
        borderWidth: 5,
        paddingVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dWidth - 20,
    },
    buttonText2: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 15,
    },
})