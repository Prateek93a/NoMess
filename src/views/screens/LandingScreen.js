import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
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
            <Pressable
                android_ripple
                onPress={() => buttonHandler('onboarding')} 
                style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                    <Text style={styles.buttonText}>Show Me How</Text>
            </Pressable>
            <Pressable
                android_ripple
                onPress={() => buttonHandler('category')}
                style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button2]}>
                    <Text style={styles.buttonText2}>Get Started</Text>
            </Pressable>
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