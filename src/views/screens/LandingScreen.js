import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import dimensions from '../../constants/dimensions';
import urls from '../../constants/imageUrls';
import strings from '../../constants/strings';

export default function LandingScreen({ navigation }) {
    const buttonHandler = (screen) => {
        navigation.navigate(screen);
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContent}>
            <Image style={{ height: 120, width: 120, resizeMode: 'contain' }} source={{ uri: urls.LOGO }} />
            <Text style={styles.text}>{strings.LANDING_PAGE_SUBTEXT}</Text>
            <Image style={{ height: 250, width: 300, resizeMode: 'contain', marginTop: 30 }} source={{ uri: urls.EAT }} />
            </View>
            <View style={styles.buttonContent}>
            <TouchableOpacity onPress={() => buttonHandler('onboarding')} style={styles.button}>
                <Text style={styles.buttonText}>Show Me How</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => buttonHandler('category')} style={styles.button2}>
                <Text style={styles.buttonText2}>Get Started</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF6D7',
        padding: 5
    },
    imageContent: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
        alignItems: 'center',
        borderRadius: 10,
        width: dimensions.WIDTH-20,
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
        alignItems: 'center',
        borderRadius: 10,
        width: dimensions.WIDTH-20,
    },
    buttonText2: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 15,
    },
})